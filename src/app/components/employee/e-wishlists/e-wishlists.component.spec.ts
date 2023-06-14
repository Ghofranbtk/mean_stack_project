import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EWishlistsComponent } from './e-wishlists.component';

describe('EWishlistsComponent', () => {
  let component: EWishlistsComponent;
  let fixture: ComponentFixture<EWishlistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EWishlistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EWishlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
