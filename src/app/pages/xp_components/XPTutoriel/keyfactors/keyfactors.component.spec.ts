import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyfactorsComponent } from './keyfactors.component';

describe('KeyfactorsComponent', () => {
  let component: KeyfactorsComponent;
  let fixture: ComponentFixture<KeyfactorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyfactorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyfactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
