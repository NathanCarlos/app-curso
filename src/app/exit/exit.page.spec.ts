import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitPage } from './exit.page';

describe('ExitPage', () => {
  let component: ExitPage;
  let fixture: ComponentFixture<ExitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
