import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllPage } from './list-all.page';

describe('ListAllPage', () => {
  let component: ListAllPage;
  let fixture: ComponentFixture<ListAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAllPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
