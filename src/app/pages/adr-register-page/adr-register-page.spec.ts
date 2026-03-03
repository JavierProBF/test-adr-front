import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdrRegisterPage } from './adr-register-page';

describe('AdrRegisterPage', () => {
  let component: AdrRegisterPage;
  let fixture: ComponentFixture<AdrRegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdrRegisterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdrRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
