import { TestBed } from '@angular/core/testing';

import { CustomvalidationsService } from './customvalidations.service';

describe('CustomvalidationsService', () => {
  let service: CustomvalidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomvalidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
