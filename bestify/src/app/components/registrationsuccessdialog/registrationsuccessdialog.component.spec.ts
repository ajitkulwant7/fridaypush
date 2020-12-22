import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsuccessdialogComponent } from './registrationsuccessdialog.component';

describe('RegistrationsuccessdialogComponent', () => {
  let component: RegistrationsuccessdialogComponent;
  let fixture: ComponentFixture<RegistrationsuccessdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationsuccessdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationsuccessdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
