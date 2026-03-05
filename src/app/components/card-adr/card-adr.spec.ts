import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAdr } from './card-adr';
import { AdrMetricsService } from '../../services/adr-metrics.service';

describe('CardAdr', () => {
  let component: CardAdr;
  let fixture: ComponentFixture<CardAdr>;

  beforeEach(async () => {
    const adrMetricsServiceMock = {
      totalRecords: signal(1250),
      monthlyStats: signal([]),
      getMetricsFromServer: jasmine.createSpy('getMetricsFromServer'),
      refreshMetrics: jasmine.createSpy('refreshMetrics')
    };

    await TestBed.configureTestingModule({
      imports: [CardAdr],
      providers: [
        { provide: AdrMetricsService, useValue: adrMetricsServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAdr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
