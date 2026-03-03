import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuBar } from './side-menu-bar';

describe('SideMenuBar', () => {
  let component: SideMenuBar;
  let fixture: ComponentFixture<SideMenuBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
