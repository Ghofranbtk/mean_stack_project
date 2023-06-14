import { TestBed } from '@angular/core/testing';

import { AvisProduitService } from './avis-produit.service';

describe('AvisProduitService', () => {
  let service: AvisProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvisProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
