import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdrDetail } from './adr-detail';

describe('AdrDetail', () => {
  let component: AdrDetail;
  let fixture: ComponentFixture<AdrDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdrDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdrDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
