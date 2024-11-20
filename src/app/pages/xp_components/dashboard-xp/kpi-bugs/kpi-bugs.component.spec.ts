import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiBugsComponent } from './kpi-bugs.component';

describe('KpiBugsComponent', () => {
  let component: KpiBugsComponent;
  let fixture: ComponentFixture<KpiBugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiBugsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
