export class Relation {
    table: string;
    sortColumn: string;
    sortDirection: string;
    relations: Array<Relation>;

    constructor(table: string, relations?: Array<Relation>, sortColumn: string = null, sortDirection: string = null) {
        this.table = table;
        this.relations = relations;
        this.sortColumn = sortColumn;
        this.sortDirection = sortDirection;
    }

    getUrlString(): string {
        let str = '{"table":"' + this.table + '","relations":[';

        if (this.relations) {
            const relArray: Array<string> = [];
            this.relations.forEach(relation => {
                relArray.push(relation.getUrlString());
            });
            str += relArray.join(',');
        }

        str += ']';

        if (this.sortColumn) {
            str += ',"sortColumn":"' + this.sortColumn + '"';

            if (this.sortDirection) {
                str += ',"sortDirection":"' + this.sortDirection + '"';
            }
        }


        str += '}';


        return str;
    }
}
