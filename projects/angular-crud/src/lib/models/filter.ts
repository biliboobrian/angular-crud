export class Filter {
    column: string;
    value: string;
    operation: string;
    field: boolean;
    type = 'string';

    constructor(column: string = null, value: string = null, operation: string = null, field: boolean = false) {
        this.column = column;
        this.value = value;
        this.operation = operation;
        this.field = field;
    }
}
