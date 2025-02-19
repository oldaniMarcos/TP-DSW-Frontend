import { TestBed } from '@angular/core/testing';

import { PrecioInsumoService } from './precio-insumo.service';

describe('PrecioInsumoService', () => {
  let service: PrecioInsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecioInsumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
