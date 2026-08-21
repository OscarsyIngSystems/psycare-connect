import { TestBed } from '@angular/core/testing';

import { LordStorageService } from './lord-storage.service';

describe('LordStorageService', () => {
  let service: LordStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LordStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
