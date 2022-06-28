/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlashSaleproductComponent } from './flash-saleproduct.component';

describe('FlashSaleproductComponent', () => {
  let component: FlashSaleproductComponent;
  let fixture: ComponentFixture<FlashSaleproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashSaleproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashSaleproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
