import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authProfileGuard } from './auth-profile.guard';

describe('authProfileGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authProfileGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
