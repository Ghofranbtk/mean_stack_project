import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EBlogsComponent } from './e-blogs.component';

describe('EBlogsComponent', () => {
  let component: EBlogsComponent;
  let fixture: ComponentFixture<EBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
