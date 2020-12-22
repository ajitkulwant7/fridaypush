import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergameComponent } from './usergame.component';

describe('UsergameComponent', () => {
  let component: UsergameComponent;
  let fixture: ComponentFixture<UsergameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
