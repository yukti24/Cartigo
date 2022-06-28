/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Login_phoneComponent } from './login_phone.component';

describe('Login_phoneComponent', () => {
  let component: Login_phoneComponent;
  let fixture: ComponentFixture<Login_phoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Login_phoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login_phoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
