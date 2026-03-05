import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdrConsultPage } from './adr-consult-page';
import { AdrMetricsService } from '../../services/adr-metrics.service';

describe('AdrConsultPage', () => {
  let component: AdrConsultPage;
  let fixture: ComponentFixture<AdrConsultPage>;

  beforeEach(async () => {
    const adrMetricsServiceMock = {
      totalRecords: signal(1250),
      monthlyStats: signal([{ month: 'Ene', value: 30 }]),
      getMetricsFromServer: jasmine.createSpy('getMetricsFromServer'),
      refreshMetrics: jasmine.createSpy('refreshMetrics')
    };

    await TestBed.configureTestingModule({
      imports: [AdrConsultPage],
      providers: [
        { provide: AdrMetricsService, useValue: adrMetricsServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdrConsultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
