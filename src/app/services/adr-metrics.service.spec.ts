import { TestBed } from '@angular/core/testing';

import { AdrMetricsService } from './adr-metrics.service';

describe('AdrMetricsService', () => {
  let service: AdrMetricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdrMetricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
