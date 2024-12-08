import { TestBed } from '@angular/core/testing';

import { PrecioAtencionService } from './precio-atencion.service';

describe('PrecioAtencionService', () => {
  let service: PrecioAtencionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecioAtencionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
