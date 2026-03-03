import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdrConsultPage } from './adr-consult-page';

describe('AdrConsultPage', () => {
  let component: AdrConsultPage;
  let fixture: ComponentFixture<AdrConsultPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdrConsultPage]
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
