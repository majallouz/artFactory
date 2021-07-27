import { AccountService } from './account.service';
import { TestBed } from '@angular/core/testing';


describe('AccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service).toBeTruthy();
  });
});
