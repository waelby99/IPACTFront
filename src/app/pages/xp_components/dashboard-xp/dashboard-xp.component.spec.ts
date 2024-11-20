import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardXPComponent } from './dashboard-xp.component';

describe('DashboardXPComponent', () => {
  let component: DashboardXPComponent;
  let fixture: ComponentFixture<DashboardXPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardXPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardXPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
