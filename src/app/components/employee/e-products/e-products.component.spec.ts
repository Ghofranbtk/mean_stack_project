import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EProductsComponent } from './e-products.component';

describe('EProductsComponent', () => {
  let component: EProductsComponent;
  let fixture: ComponentFixture<EProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
