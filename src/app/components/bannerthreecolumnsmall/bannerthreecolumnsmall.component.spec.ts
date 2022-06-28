/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BannerthreecolumnsmallComponent } from './bannerthreecolumnsmall.component';

describe('BannerthreecolumnsmallComponent', () => {
  let component: BannerthreecolumnsmallComponent;
  let fixture: ComponentFixture<BannerthreecolumnsmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerthreecolumnsmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerthreecolumnsmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
