import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAdr } from './card-adr';
import { AdrRecordsService } from '../../services/adr-records.service';

describe('CardAdr', () => {
  let component: CardAdr;
  let fixture: ComponentFixture<CardAdr>;

  beforeEach(async () => {
    const adrRecordsServiceMock = {
      totalRecords: signal(1250),
      refreshTotalRecords: jasmine.createSpy('refreshTotalRecords')
    };

    await TestBed.configureTestingModule({
      imports: [CardAdr],
      providers: [
        { provide: AdrRecordsService, useValue: adrRecordsServiceMock }
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
