import { FormGroup } from '@angular/forms';
import { SearchCriteria } from './search-criteria';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudService } from '../services/crud.service';
import { PaginatedCrudResponse } from './paginated-crud-response';
import * as moment_ from 'moment'; const moment = moment_;

export class BaseModel {

    primaryKey = 'id';
    fetched = false; // data has been fetched from database
    sync = false; // data is in the same state as when it has been created
    addedRelation = false; // when model is added to a relation
    deletedRelation = false; // when model is deleted from a relation
    table = '';

    protected exportProperties: Array<string> = [];
    protected datePropeties: Array<string> = [];
    protected boolPropeties: Array<string> = [];
    protected relations: Array<string> = [];

    private crudService: CrudService;

    get(searchCriteria?: SearchCriteria): Observable<PaginatedCrudResponse> {
        return this.crudService.get(searchCriteria, this.table);
    }

    setAsNew() {
        this[this.primaryKey] = null;
        this.fetched = false;
        this.sync = false;
    }

    retrieve(id: string): Observable<boolean> {
        if (this.crudService.transactionStarted()) {
            this.crudService.getById(id, this.table);
            return null;
        } else {
            return this.crudService.getById(id, this.table).pipe(
                map(crudResponse => {
                    this.importData(crudResponse.data);
                    this.fetched = true;
                    return true;
                })
            );
        }
    }

    getPatchValue(): object {
        const res = {};

        this.exportProperties.forEach(prop => {
            res[prop] = this[prop];
        });

        return res;
    }

    setPatchValue(form: FormGroup): void {
        for (const field in form.controls) {
            if (form.controls.hasOwnProperty(field)) {
                const control = form.get(field);
                if (this[field] !== control.value) {
                    this[field] = control.value;
                }
            }
        }
    }

    save(relationPath?: Array<string>, relatedTable?: string): Observable<boolean> {

        const op: number = this.crudService.operationCount();
        const primaryKey: string = this.primaryKey;
        const usedTable: string = (relatedTable) ? relatedTable.replace('_', '-') : this.table;

        if (this.fetched) {
            if (this.crudService.transactionStarted()) {
                if (relationPath) {
                    if (this.addedRelation) {
                        this.crudService.createRelation(
                            relationPath.concat([
                                usedTable,
                                this[this.primaryKey]
                            ]
                            ));
                    } else if (this.deletedRelation) {
                        this.crudService.deleteRelation(this, relationPath, usedTable);
                    }
                }
                if (!this.sync) {
                    this.crudService.put(this, this.table);
                }

                this.relations.forEach(relation => {
                    if (this[relation]) {
                        if (Array.isArray(this[relation])) {
                            this[relation].forEach((element: BaseModel) => {
                                element.save(this.getRelPath(relationPath, op, primaryKey));
                            });
                        } else {
                            this[relation].save(this.getRelPath(relationPath, op, primaryKey), relation);
                        }
                    }

                });

                return null;
            } else {
                if (!this.sync) {
                    return this.crudService.put(this, this.table).pipe(
                        map(crudResponse => {
                            this.importData(crudResponse.data);
                            return true;
                        })
                    );
                }
            }

        } else {
            if (this.crudService.transactionStarted()) {
                if (!this.sync) {
                    if (relationPath) {
                        this.crudService.postRelation(this, relationPath, usedTable);
                    } else {
                        this.crudService.post(this, this.table);
                    }
                }
                this.relations.forEach(relation => {
                    if (this[relation]) {
                        if (Array.isArray(this[relation])) {
                            this[relation].forEach((element: BaseModel) => {
                                element.save(this.getRelPath(relationPath, op, primaryKey));
                            });
                        } else {
                            this[relation].save(this.getRelPath(relationPath, op, primaryKey), relation);
                        }
                    }
                });

                return null;
            } else {
                if (!this.sync) {
                    if (relationPath) {
                        return this.crudService.postRelation(this, relationPath).pipe(
                            map(crudResponse => {
                                this.importData(crudResponse.data);
                                return true;
                            })
                        );
                    } else {
                        return this.crudService.post(this, this.table).pipe(
                            map(crudResponse => {
                                this.importData(crudResponse.data);
                                return true;
                            })
                        );
                    }
                }
            }
        }
    }

    addRelation(obj: BaseModel, relation: string) {
        if (this[relation]) {
            obj.addedRelation = true;
            this[relation].push(obj);
        }
    }

    deleteRelation(obj: BaseModel, relation: string) {
        if (this[relation]) {
            obj.deletedRelation = true;
            this[relation].push(obj);
        }
    }

    remove(): Observable<boolean> {
        if (this.crudService.transactionStarted()) {
            this.crudService.delete(this, this.table);
            return null;
        } else {
            return this.crudService.delete(this, this.table).pipe(
                map(crudResponse => {
                    this.importData(crudResponse.data);
                    return true;
                })
            );
        }
    }

    constructor(obj?: object, crudService?: CrudService) {

        this.crudService = crudService;
        if (obj) {
            this.importData(obj);
        }
    }

    importData(obj: object) {
        for (const property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (this.datePropeties.includes(property)) {
                    this['_' + property] = moment(obj[property]);
                } else if (this.boolPropeties.includes(property)) {
                    if (obj[property] && obj[property] === 1) {
                        this['_' + property] = true;
                    } else {
                        this['_' + property] = false;
                    }
                } else {
                    this['_' + property] = obj[property];
                }
            }
        }
    }


    exportData(): object {
        const obj: object = {};
        for (const property in this) {
            if (this.exportProperties.includes(property)) {
                if (this.datePropeties.includes(property) && this.hasOwnProperty('_' + property) && this['_' + property]) {
                    obj[property.toString()] = this['_' + property]['valueOf']();
                } else {
                    obj[property.toString()] = this['_' + property];

                }
            }
        }
        return obj;
    }

    getRelPath(relationPath: Array<string>, rootOperation?: number, primaryKey?: string): Array<string> {
        let relPath: Array<string>;
        let key: string = this[this.primaryKey];

        if (!key) {
            key = '{"id":"' + rootOperation.toString() + '","field":"' + primaryKey + '"}';
        }

        if (relationPath) {
            relPath = relationPath.concat(this.table, key);
        } else {
            relPath = [this.table, key];
        }
        return relPath;
    }
}
