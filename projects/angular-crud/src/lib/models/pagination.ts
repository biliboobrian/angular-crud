export class Pagination {
    current_page: number;
    last_page: number;
    next_page: number;
    per_page: number;
    prev_page: number;
    total: number;

    constructor(obj: object) {
        this.current_page = obj['current_page'];
        this.last_page = obj['last_page'];
        this.next_page = obj['next_page'];
        this.per_page = obj['per_page'];
        this.prev_page = obj['prev_page'];
        this.total = obj['total'];
    }
}
