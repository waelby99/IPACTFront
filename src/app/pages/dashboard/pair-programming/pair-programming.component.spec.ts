import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairProgrammingComponent } from './pair-programming.component';

describe('PairProgrammingComponent', () => {
  let component: PairProgrammingComponent;
  let fixture: ComponentFixture<PairProgrammingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PairProgrammingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PairProgrammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
