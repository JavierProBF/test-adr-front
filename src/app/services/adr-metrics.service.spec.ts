import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { AdrMetricsService } from './adr-metrics.service';

describe('AdrMetricsService', () => {
  let service: AdrMetricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(AdrMetricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
