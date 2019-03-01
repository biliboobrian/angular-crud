import { Injectable, Inject } from '@angular/core';
import { CrudConfig } from '../models/crud-config';

@Injectable({
  providedIn: 'root'
})
export class CrudModelsService {

  crudModels: object;
  apiUrl: string;
  cacheTable: Array<string>;

  constructor(@Inject('config') private config: CrudConfig) {
    this.crudModels = config.crudModels;
    this.apiUrl = config.apiUrl;
    this.cacheTable = config.cacheTable;
  }
}
