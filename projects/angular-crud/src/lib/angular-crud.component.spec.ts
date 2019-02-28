import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCrudComponent } from './angular-crud.component';

describe('AngularCrudComponent', () => {
  let component: AngularCrudComponent;
  let fixture: ComponentFixture<AngularCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
