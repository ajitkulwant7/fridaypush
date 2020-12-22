import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from './loginservice.service';

describe('LoginserviceService', () => {
  let service: AuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
