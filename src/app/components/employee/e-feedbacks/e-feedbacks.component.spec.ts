import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EFeedbacksComponent } from './e-feedbacks.component';

describe('EFeedbacksComponent', () => {
  let component: EFeedbacksComponent;
  let fixture: ComponentFixture<EFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EFeedbacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
