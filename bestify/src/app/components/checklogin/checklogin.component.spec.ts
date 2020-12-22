import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckloginComponent } from './checklogin.component';

describe('CheckloginComponent', () => {
  let component: CheckloginComponent;
  let fixture: ComponentFixture<CheckloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
