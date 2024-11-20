import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigramsComponent } from './digrams.component';

describe('DigramsComponent', () => {
  let component: DigramsComponent;
  let fixture: ComponentFixture<DigramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
