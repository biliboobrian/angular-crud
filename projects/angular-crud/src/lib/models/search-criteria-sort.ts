export class SearchCriteriaSort {
    sortColumn: string;
    sortDirection: string;
    tableKey: string;
    joinTable: string;
    joinKey: string;

    constructor(val?: object) {
        if (val) {
            this.sortColumn = val['sortColumn'];
            this.sortDirection = val['sortDirection'];
            this.tableKey = val['tableKey'];
            this.joinTable = val['joinTable'];
            this.joinKey = val['joinKey'];
        }
    }
}
