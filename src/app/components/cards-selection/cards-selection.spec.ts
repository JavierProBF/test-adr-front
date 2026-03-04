import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsSelection } from './cards-selection';

describe('CardsSelection', () => {
  let component: CardsSelection;
  let fixture: ComponentFixture<CardsSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
