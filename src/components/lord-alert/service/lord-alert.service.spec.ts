import { TestBed } from '@angular/core/testing';

import { LordAlertService } from './lord-alert.service';

describe('LordAlertService', () => {
  let service: LordAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LordAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
