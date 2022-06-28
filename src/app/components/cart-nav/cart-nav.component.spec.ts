/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CartNavComponent } from './cart-nav.component';

describe('CartNavComponent', () => {
  let component: CartNavComponent;
  let fixture: ComponentFixture<CartNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
