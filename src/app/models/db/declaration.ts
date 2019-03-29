import * as moment from 'moment';
import { Attendee } from './attendee';
import { CrudService, BaseModel, CrudColumn } from 'projects/angular-crud/src/public_api';

export class Declaration extends BaseModel {

    public static TABLE = 'declarations';
    private _id: number;
    private _id_attendee: number;
    private _engagement: string;
    private _advance: number;
    private _piece: number;
    private _reference: string;
    private _surplus: number;
    private _free_meal: number;
    private _day_allowance: number;
    private _night_allowance: number;
    private _first_day: number;
    private _last_day: number;
    private _entire_day: number;
    private _nuity: number;
    private _created_at: any;
    private _updated_at: any;
    private _attendee: Attendee;
    

    public constructor(obj?: Object, crudService?: CrudService) {
        super(obj, crudService);
        this.table = 'declarations';
        this.primaryKey = 'id';
        this.exportProperties = [
            new CrudColumn('id', CrudColumn.NUMBER, 0, false),
            new CrudColumn('id_attendee', CrudColumn.NUMBER),
            new CrudColumn('engagement', CrudColumn.STRING, 0, false),
            new CrudColumn('advance', CrudColumn.NUMBER),
            new CrudColumn('piece', CrudColumn.NUMBER),
            new CrudColumn('reference', CrudColumn.STRING, 0, false),
            new CrudColumn('surplus', CrudColumn.NUMBER, 0, false),
            new CrudColumn('free_meal', CrudColumn.NUMBER, 0, false),
            new CrudColumn('day_allowance', CrudColumn.NUMBER, 0, false),
            new CrudColumn('night_allowance', CrudColumn.NUMBER, 0, false),
            new CrudColumn('first_day', CrudColumn.NUMBER, 0, false),
            new CrudColumn('last_day', CrudColumn.NUMBER, 0, false),
            new CrudColumn('entire_day', CrudColumn.NUMBER, 0, false),
            new CrudColumn('nuity', CrudColumn.NUMBER, 0, false),
            new CrudColumn('created_at', CrudColumn.DATE, 0, false),
            new CrudColumn('updated_at', CrudColumn.DATE, 0, false)
        ];

        this.relations = [
            'attendee',
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

    public get id_attendee() {
        return this._id_attendee;
    }

    public set id_attendee(val: number) {
        if (val !== this._id_attendee) {
            this.sync = false;
            this._id_attendee = val;
        }
    }

    public get engagement() {
        return this._engagement;
    }

    public set engagement(val: string) {
        if (val !== this._engagement) {
            this.sync = false;
            this._engagement = val;
        }
    }

    public get advance() {
        return this._advance;
    }

    public set advance(val: number) {
        if (val !== this._advance) {
            this.sync = false;
            this._advance = val;
        }
    }

    public get piece() {
        return this._piece;
    }

    public set piece(val: number) {
        if (val !== this._piece) {
            this.sync = false;
            this._piece = val;
        }
    }

    public get reference() {
        return this._reference;
    }

    public set reference(val: string) {
        if (val !== this._reference) {
            this.sync = false;
            this._reference = val;
        }
    }

    public get surplus() {
        return this._surplus;
    }

    public set surplus(val: number) {
        if (val !== this._surplus) {
            this.sync = false;
            this._surplus = val;
        }
    }

    public get free_meal() {
        return this._free_meal;
    }

    public set free_meal(val: number) {
        if (val !== this._free_meal) {
            this.sync = false;
            this._free_meal = val;
        }
    }

    public get day_allowance() {
        return this._day_allowance;
    }

    public set day_allowance(val: number) {
        if (val !== this._day_allowance) {
            this.sync = false;
            this._day_allowance = val;
        }
    }

    public get night_allowance() {
        return this._night_allowance;
    }

    public set night_allowance(val: number) {
        if (val !== this._night_allowance) {
            this.sync = false;
            this._night_allowance = val;
        }
    }

    public get first_day() {
        return this._first_day;
    }

    public set first_day(val: number) {
        if (val !== this._first_day) {
            this.sync = false;
            this._first_day = val;
        }
    }

    public get last_day() {
        return this._last_day;
    }

    public set last_day(val: number) {
        if (val !== this._last_day) {
            this.sync = false;
            this._last_day = val;
        }
    }

    public get entire_day() {
        return this._entire_day;
    }

    public set entire_day(val: number) {
        if (val !== this._entire_day) {
            this.sync = false;
            this._entire_day = val;
        }
    }

    public get nuity() {
        return this._nuity;
    }

    public set nuity(val: number) {
        if (val !== this._nuity) {
            this.sync = false;
            this._nuity = val;
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

    public get attendee() {
        return this._attendee;
    }

    public set attendee(val: Attendee) {
        if (val !== this._attendee) {
            this.sync = false;
            this._id_attendee = (val) ? val.id : null;
            this._attendee = val;
        }
    }
}
