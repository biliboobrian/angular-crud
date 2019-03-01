import { SearchCriteriaSort } from './search-criteria-sort';
import { Filters } from './filters';

export class SearchCriteria {

    filters: Filters = new Filters();
    sort: SearchCriteriaSort = new SearchCriteriaSort();
    sortColumn: string;
    sortDirection = 'asc';
    perPage = 10;
    currentPage = 1;

    public getJson(): string {
        return JSON.stringify({
            filters: this.filters,
            sort: this.sort,
            perPage: this.perPage,
            currentPage: this.currentPage
        });
    }

    public setJson(val: Object) {
        this.sort = new SearchCriteriaSort(val['sort']);
        this.perPage = val['perPage'];
        this.currentPage = val['currentPage'];
        this.filters = new Filters(val['filters']);
    }

    public getUrlString(): string {
        let str = 'per-page=' + this.perPage + '&current-page=' + this.currentPage;

        if (this.sort) {
            str += '&sort=' + JSON.stringify(this.sort);
        }

        if (this.filters) {
            str += '&filters=' + JSON.stringify(this.filters);
        }

        return str;
    }

    public getFilterValue(name: string, type: string, optionLabel?: string, filters?: Filters): string {
        if (!filters) {
            filters = this.filters;
        }
        const f = filters.members.find(member => {
            return (optionLabel) ? (member.column === optionLabel && filters.relationName === name && member.type === type) : member.column === name;
        });

        if (f) {
            return f.value;
        } else {
            let returnStr: string;
            filters.childrens.forEach(child => {
                const tmp = this.getFilterValue(name, type, optionLabel, child);

                if (tmp) {
                    returnStr = tmp;
                }
            });
            return returnStr;
        }
    }
}
