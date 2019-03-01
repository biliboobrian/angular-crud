import { CrudService } from './../services/crud.service';

export class CrudResponse {
    code: number;
    message: string;
    status: string;
    data: any;

    constructor(
        obj: object,
        crudService: CrudService
    ) {
        this.code = obj['code'];
        this.message = obj['message'];
        this.status = obj['status'];
        this.data = [];

        for (const property in obj['data']) {
            if (obj['data'].hasOwnProperty(property)) {
                if (obj['data'][property] instanceof Array) {
                    obj['data'][property].forEach(element => {
                        const responseObj = this.elementCreation(element, property, crudService);
                        this.data.push(responseObj);
                    });
                } else {
                    const responseObj = this.elementCreation(obj['data'][property], property, crudService);
                    this.data = responseObj;
                }

            }
        }
    }


    elementCreation(element: object, table: string, crudService: CrudService): any {

        for (const prop in element) {
            if (element.hasOwnProperty(prop)) {
                if (Array.isArray(element[prop])) {
                    const subElement: Array<any> = new Array<any>();

                    element[prop].forEach(el => {
                        subElement.push(this.elementCreation(el, prop.substring(0, prop.length - 1), crudService));
                    });

                    element[prop] = subElement;
                } else if (element[prop] instanceof Object) {
                    element[prop] = this.elementCreation(element[prop], prop, crudService);
                }

            }
        }

        try {
            const obj = new crudService.crudModelService.crudModels[table](element, crudService);
            obj.sync = true;
            obj.fetched = true;

            return obj;
        } catch (e) {
            console.log('!! SERIALIZATION ERROR !!! object ' + table + ' not found.');
        }
        return null;
    }
}
