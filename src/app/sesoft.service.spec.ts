import { TestBed } from '@angular/core/testing';

import { SesoftService } from './sesoft.service';

describe('SesoftService', () => {
  let service: SesoftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesoftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
