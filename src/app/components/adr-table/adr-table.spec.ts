import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdrTable } from './adr-table';

describe('AdrTable', () => {
  let component: AdrTable;
  let fixture: ComponentFixture<AdrTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdrTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdrTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
