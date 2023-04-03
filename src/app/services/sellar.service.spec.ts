import { TestBed } from '@angular/core/testing';

import { SellarService } from './sellar.service';

describe('SellarService', () => {
  let service: SellarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
