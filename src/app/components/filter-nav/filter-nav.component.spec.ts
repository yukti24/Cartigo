/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterNavComponent } from './filter-nav.component';

describe('FilterNavComponent', () => {
  let component: FilterNavComponent;
  let fixture: ComponentFixture<FilterNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
