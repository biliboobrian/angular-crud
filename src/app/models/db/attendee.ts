
import * as moment from 'moment';
import { Declaration } from './declaration';
import { BaseModel, CrudService, CrudColumn } from 'projects/angular-crud/src/public_api';

export class Attendee extends BaseModel {

    public static TABLE = 'attendees';
    private _id: number;
    private _sap_number: string;
    private _national_number: string;
    private _sap_sifin: string;
    private _firstname: string;
    private _lastname: string;
    private _grade: string;
    private _affectation: string;
    private _postal_code: string;
    private _city: string;
    private _number: string;
    private _street: string;
    private _residence: string;
    private _ccpl: string;
    private _created_at: any;
    private _updated_at: any;
    private _declarations: Array<Declaration>;

    public constructor(obj?: object, crudService?: CrudService) {
        super(obj, crudService);
        this.table = 'attendees';
        this.primaryKey = 'id';
        this.exportProperties = [
            new CrudColumn('id', CrudColumn.NUMBER, 0, false),
            new CrudColumn('sap_number', CrudColumn.STRING, 0, false),
            new CrudColumn('national_number', CrudColumn.STRING, 0, false),
            new CrudColumn('sap_sifin', CrudColumn.STRING, 0, false),
            new CrudColumn('firstname', CrudColumn.STRING, 0, false),
            new CrudColumn('lastname', CrudColumn.STRING, 0, false),
            new CrudColumn('grade', CrudColumn.STRING, 0, false),
            new CrudColumn('affectation', CrudColumn.STRING, 0, false),
            new CrudColumn('postal_code', CrudColumn.STRING, 0, false),
            new CrudColumn('city', CrudColumn.STRING, 0, false),
            new CrudColumn('number', CrudColumn.STRING, 0, false),
            new CrudColumn('street', CrudColumn.STRING, 0, false),
            new CrudColumn('residence', CrudColumn.STRING, 0, false),
            new CrudColumn('ccpl', CrudColumn.STRING, 0, false),
            new CrudColumn('created_at', CrudColumn.DATE, 0, false),
            new CrudColumn('updated_at', CrudColumn.DATE, 0, false)
        ];

        this.relations = [
            'declarations'
        ];

        this.datePropeties = [
            'created_at',
            'updated_at'
        ];

        if (obj) {
            this.importData(obj);
        }


    }

    public get id() {
        return this._id;
    }

    public set id(val: number) {
        if (val !== this._id) {
            this.sync = false;
            this._id = val;
        }
    }

    public get sap_number() {
        return this._sap_number;
    }

    public set sap_number(val: string) {
        if (val !== this._sap_number) {
            this.sync = false;
            this._sap_number = val;
        }
    }

    public get national_number() {
        return this._national_number;
    }

    public set national_number(val: string) {
        if (val !== this._national_number) {
            this.sync = false;
            this._national_number = val;
        }
    }

    public get sap_sifin() {
        return this._sap_sifin;
    }

    public set sap_sifin(val: string) {
        if (val !== this._sap_sifin) {
            this.sync = false;
            this._sap_sifin = val;
        }
    }

    public get firstname() {
        return this._firstname;
    }

    public set firstname(val: string) {
        if (val !== this._firstname) {
            this.sync = false;
            this._firstname = val;
        }
    }

    public get lastname() {
        return this._lastname;
    }

    public set lastname(val: string) {
        if (val !== this._lastname) {
            this.sync = false;
            this._lastname = val;
        }
    }

    public get grade() {
        return this._grade;
    }

    public set grade(val: string) {
        if (val !== this._grade) {
            this.sync = false;
            this._grade = val;
        }
    }

    public get affectation() {
        return this._affectation;
    }

    public set affectation(val: string) {
        if (val !== this._affectation) {
            this.sync = false;
            this._affectation = val;
        }
    }

    public get postal_code() {
        return this._postal_code;
    }

    public set postal_code(val: string) {
        if (val !== this._postal_code) {
            this.sync = false;
            this._postal_code = val;
        }
    }

    public get city() {
        return this._city;
    }

    public set city(val: string) {
        if (val !== this._city) {
            this.sync = false;
            this._city = val;
        }
    }

    public get number() {
        return this._number;
    }

    public set number(val: string) {
        if (val !== this._number) {
            this.sync = false;
            this._number = val;
        }
    }

    public get street() {
        return this._street;
    }

    public set street(val: string) {
        if (val !== this._street) {
            this.sync = false;
            this._street = val;
        }
    }

    public get residence() {
        return this._residence;
    }

    public set residence(val: string) {
        if (val !== this._residence) {
            this.sync = false;
            this._residence = val;
        }
    }

    public get ccpl() {
        return this._ccpl;
    }

    public set ccpl(val: string) {
        if (val !== this._ccpl) {
            this.sync = false;
            this._ccpl = val;
        }
    }

    public get created_at() {
        return this._created_at;
    }

    public set created_at(val: any) {
        if (val !== this._created_at) {
            this.sync = false;
            this._created_at = moment(val);
        }
    }

    public get updated_at() {
        return this._updated_at;
    }

    public set updated_at(val: any) {
        if (val !== this._updated_at) {
            this.sync = false;
            this._updated_at = moment(val);
        }
    }

    public get declarations() {
        return this._declarations;
    }

    public set declarations(val: Array<Declaration>) {
        if (val !== this._declarations) {
            this.sync = false;
            this._declarations = val;
        }
    }
}
