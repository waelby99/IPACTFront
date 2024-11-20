import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiUserStoriesComponent } from './kpi-user-stories.component';

describe('KpiUserStoriesComponent', () => {
  let component: KpiUserStoriesComponent;
  let fixture: ComponentFixture<KpiUserStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiUserStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiUserStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
