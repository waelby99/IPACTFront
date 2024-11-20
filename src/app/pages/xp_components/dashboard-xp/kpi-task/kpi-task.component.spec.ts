import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiTaskComponent } from './kpi-task.component';

describe('KpiTaskComponent', () => {
  let component: KpiTaskComponent;
  let fixture: ComponentFixture<KpiTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
