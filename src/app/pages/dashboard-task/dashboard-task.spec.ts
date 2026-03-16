import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTask } from './dashboard-task';

describe('DashboardTask', () => {
  let component: DashboardTask;
  let fixture: ComponentFixture<DashboardTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
