import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervencionModal } from './intervencion-modal';

describe('IntervencionModal', () => {
  let component: IntervencionModal;
  let fixture: ComponentFixture<IntervencionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervencionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntervencionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
