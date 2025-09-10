import { TestBed } from '@angular/core/testing';

import { Eleccion } from './eleccion';

describe('Eleccion', () => {
  let service: Eleccion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Eleccion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
