import { TestBed } from '@angular/core/testing';

import { AuthLoaderGuardService } from './auth-loader-guard.service';

describe('AuthLoaderGuardService', () => {
  let service: AuthLoaderGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLoaderGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
