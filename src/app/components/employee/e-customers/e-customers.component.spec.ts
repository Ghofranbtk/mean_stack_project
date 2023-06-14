import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECustomersComponent } from './e-customers.component';

describe('ECustomersComponent', () => {
  let component: ECustomersComponent;
  let fixture: ComponentFixture<ECustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
