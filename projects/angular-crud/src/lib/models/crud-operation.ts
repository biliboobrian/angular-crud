
export class CrudOperation {
    type: string;
    path: string;
    data: object;
    table: string;

    constructor(type?: string, path?: string, data?: object, table?: string) {
        this.type = type;
        this.path = path;
        this.data = data;
        this.table = table;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}
