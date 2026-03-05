import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectResgiter } from './project-resgiter';

describe('ProjectResgiter', () => {
  let component: ProjectResgiter;
  let fixture: ComponentFixture<ProjectResgiter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectResgiter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectResgiter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
