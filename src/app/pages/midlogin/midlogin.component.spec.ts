/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MidloginComponent } from './midlogin.component';

describe('MidloginComponent', () => {
  let component: MidloginComponent;
  let fixture: ComponentFixture<MidloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
