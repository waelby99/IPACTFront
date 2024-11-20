import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XpMethodologyComponent } from './xp-methodology.component';

describe('XpMethodologyComponent', () => {
  let component: XpMethodologyComponent;
  let fixture: ComponentFixture<XpMethodologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XpMethodologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XpMethodologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
