import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalProductComponent } from './vertical-product.component';

describe('VerticalProductComponent', () => {
  let component: VerticalProductComponent;
  let fixture: ComponentFixture<VerticalProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
