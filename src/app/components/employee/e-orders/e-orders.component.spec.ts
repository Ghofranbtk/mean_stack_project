import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EOrdersComponent } from './e-orders.component';

describe('EOrdersComponent', () => {
  let component: EOrdersComponent;
  let fixture: ComponentFixture<EOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
