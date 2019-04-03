import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchCriteria } from './search-criteria';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudService } from '../services/crud.service';
import { PaginatedCrudResponse } from './paginated-crud-response';
import { CrudColumn } from './crud-column';
import * as moment_ from 'moment'; const moment = moment_;

export class BaseModel {

    primaryKey = 'id';
    fetched = false; // data has been fetched from database
    sync = false; // data is in the same state as when it has been created
    addedRelation = false; // when model is added to a relation
    deletedRelation = false; // when model is deleted from a relation
    table = '';

    protected exportProperties: Array<CrudColumn> = [];
    protected datePropeties: Array<string> = [];
    protected boolPropeties: Array<string> = [];
    protected relations: Array<string> = [];

    private crudService: CrudService;
    private fb: FormBuilder;

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

    getReactiveForm(): FormGroup {
        const group = {};

        this.exportProperties.forEach(crudColumn => {
            group[crudColumn.name] = ['', this.getValidatorsFrom(crudColumn)];
        });

        return this.fb.group(group);
    }

    getValidatorsFrom(column: CrudColumn) {
        const vals: Array<Validators> = [];

        switch (column.type) {
            case CrudColumn.NUMBER:
                vals.push(Validators.pattern('^[0-9]+$'));
                break;
        }

        if (!column.nullable) {
            vals.push(Validators.required);
        }

        if (column.maxLength > 0) {
            vals.push(Validators.maxLength(column.maxLength));
        }


        return vals;
    }

    clone() {
        const obj = new (this.constructor as any)(this.exportData(), this.crudService);

        this.relations.forEach(relation => {
            if (this['_' + relation]) {
                if (Array.isArray(this['_' + relation])) {
                    obj['_' + relation] = new Array<object>();

                    this['_' + relation].forEach((element: BaseModel) => {
                        obj['_' + relation].push(element.clone());
                    });
                } else {
                    obj['_' + relation] = this['_' + relation].clone();
                }
            }
        });

        return obj;
    }

    duplicateAsNew(withRelationsAsNew: boolean = false) {
        const obj = new (this.constructor as any)(this.exportData(), this.crudService);
        obj.fetched = false;
        obj.sync = false;
        obj[this.primaryKey] = null;

        this.relations.forEach(relation => {
            if (this['_' + relation]) {
                if (Array.isArray(this['_' + relation])) {
                    obj['_' + relation] = new Array<object>();

                    this['_' + relation].forEach((element: BaseModel) => {
                        const elemRel = element.clone();
                        if (withRelationsAsNew) {
                            elemRel.fetched = false;
                            elemRel.sync = false;
                            elemRel[elemRel.primaryKey] = null;
                        }

                        obj['_' + relation].push(elemRel);
                    });
                } else {
                    const rel = this['_' + relation].clone();
                    if (withRelationsAsNew) {
                        rel.fetched = false;
                        rel.sync = false;
                        rel[rel.primaryKey] = null;
                    }
                    obj['_' + relation] = rel;
                }
            }
        });

        return obj;
    }

    getPatchValue(): object {
        const res = {};

        this.exportProperties.forEach(crudColumn => {
            res[crudColumn.name] = this[crudColumn.name];
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
                    if (this['_' + relation]) {
                        if (Array.isArray(this['_' + relation])) {
                            this['_' + relation].forEach((element: BaseModel) => {
                                element.save(this.getRelPath(relationPath, op, primaryKey));
                            });
                        } else {
                            this['_' + relation].save(this.getRelPath(relationPath, op, primaryKey), relation);
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
                    if (this['_' + relation]) {
                        if (Array.isArray(this['_' + relation])) {
                            this['_' + relation].forEach((element: BaseModel) => {
                                element.save(this.getRelPath(relationPath, op, primaryKey));
                            });
                        } else {
                            this['_' + relation].save(this.getRelPath(relationPath, op, primaryKey), relation);
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
        if (this['_' + relation]) {
            obj.addedRelation = true;
            this['_' + relation].push(obj);
        }
    }

    deleteRelation(obj: BaseModel, relation: string) {
        if (this['_' + relation]) {
            const relObj = this['_' + relation].find(elem => {
                return elem[obj.primaryKey] === obj[obj.primaryKey];
            });
            relObj.deletedRelation = true;
        }
    }

    emptyRelation(relation: string) {
        if (this['_' + relation] && this['_' + relation].length > 0) {
            this.crudService.emptyRelation(this, relation);
            this['_' + relation] = [];
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
                    if (obj[property]) {
                        this['_' + property] = moment(obj[property], 'YYYY-MM-DD hh:mm:ss');
                    }
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

    exportData(withRelations?: object): object {
        const obj: object = {};
        this.exportProperties.forEach(crudColumn => {
            if (this.datePropeties.includes(crudColumn.name)
                && this.hasOwnProperty('_' + crudColumn.name)
                && this['_' + crudColumn.name]) {
                obj[crudColumn.name] = this['_' + crudColumn.name]['valueOf']();
            } else {
                obj[crudColumn.name] = this['_' + crudColumn.name];

            }
        });

        if (withRelations) {
            for (const key in withRelations) {
                if (withRelations.hasOwnProperty(key)) {
                    const relation = withRelations[key];

                    if (this[key]) {
                        if (Array.isArray(this[key])) {
                            obj[key] = new Array<object>();

                            this[key].forEach((element: BaseModel) => {
                                obj[key].push(element.exportData(relation));
                            });
                        } else {
                            obj[key] = this[key].exportData(relation);
                        }
                    }
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
