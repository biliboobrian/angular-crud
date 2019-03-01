export class Filter {
    column: string;
    value: string;
    type: string;
    field: boolean;

    constructor(column: string = null, value: string = null, type: string = null, field: boolean = false) {
        this.column = column;
        this.value = value;
        this.type = type;
        this.field = field;
    }
}
