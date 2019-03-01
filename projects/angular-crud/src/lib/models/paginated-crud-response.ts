import { Pagination } from './pagination';
import { CrudResponse } from './crud-response';
import { CrudService } from '../services/crud.service';

export class PaginatedCrudResponse extends CrudResponse {
    pagination: Pagination;

    constructor(obj: object, crudService: CrudService) {
        super(obj, crudService);
        this.pagination = new Pagination(obj['pagination']);
    }
}
