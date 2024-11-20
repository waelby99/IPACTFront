import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiIterationComponent } from './kpi-iteration.component';

describe('KpiIterationComponent', () => {
  let component: KpiIterationComponent;
  let fixture: ComponentFixture<KpiIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiIterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
