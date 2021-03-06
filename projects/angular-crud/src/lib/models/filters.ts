import { Filter } from './filter';

export class Filters {
    members: Array<Filter> = Array<Filter>();
    childrens: Array<Filters> = Array<Filters>();
    andLink = true;
    relationName: string = null;


    constructor(filters?: object) {
        this.members = [];
        this.childrens = [];

        if (filters) {
            if (filters['members']) {
                filters['members'].forEach(filter => {
                    const f: Filter = new Filter();
                    f.column = filter['column'];
                    f.operation = filter['operation'];
                    f.value = filter['value'];
                    f.field = filter['field'];
                    f.type = filter['type'];
                    this.members.push(f);
                });
            }

            if (filters['childrens']) {
                filters['childrens'].forEach(children => {
                    this.childrens.push(new Filters(children));
                });
            }

            this.andLink = filters['andLink'];
            this.relationName = filters['relationName'];
        }



    }
}
