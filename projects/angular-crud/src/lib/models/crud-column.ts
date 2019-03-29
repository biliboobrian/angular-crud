export class CrudColumn {
    static STRING = 'string';
    static NUMBER = 'number';
    static DATE = 'date';
    static BOOL = 'bool';
    static OBJECT = 'object';

    public name: string;
    public type: string;
    public nullable: boolean;
    public maxLength: number;

    constructor(name: string, type: string = 'string', maxLength: number = 0, nullable = true) {
        this.name = name;
        this.type = type;
        this.nullable = nullable;
        this.maxLength = maxLength;
    }
}
