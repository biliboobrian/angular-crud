
export class CrudOperation {
    type: string;
    path: string;
    data: object;
    table: string;
    clearCache: boolean;

    constructor(type?: string, path?: string, data?: object, table?: string, clearCache?: boolean) {
        this.type = type;
        this.path = path;
        this.data = data;
        this.table = table;
        this.clearCache = clearCache;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}
