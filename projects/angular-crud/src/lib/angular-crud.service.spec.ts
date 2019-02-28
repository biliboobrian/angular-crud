import { TestBed } from '@angular/core/testing';

import { AngularCrudService } from './angular-crud.service';

describe('AngularCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularCrudService = TestBed.get(AngularCrudService);
    expect(service).toBeTruthy();
  });
});
