import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleHome } from './title-home';

describe('TitleHome', () => {
  let component: TitleHome;
  let fixture: ComponentFixture<TitleHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
