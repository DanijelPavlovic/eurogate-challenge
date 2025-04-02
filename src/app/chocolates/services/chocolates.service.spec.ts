import { TestBed } from '@angular/core/testing';

import { ChocolatesService } from './chocolates.service';

describe('ChocolatesService', () => {
  let service: ChocolatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChocolatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
