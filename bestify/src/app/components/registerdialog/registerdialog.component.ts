import { RegistrationService } from './../../service/Registration/registration.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomvalidationsService } from '../../service/validation/customvalidations.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegistrationsuccessdialogComponent } from '../registrationsuccessdialog/registrationsuccessdialog.component';

@Component({
  selector: 'app-registerdialog',
  templateUrl: './registerdialog.component.html',
  styleUrls: ['./registerdialog.component.scss'],
})
export class RegisterdialogComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterdialogComponent>,
    private _regServ: RegistrationService,
    private customValidator: CustomvalidationsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        // username:['',Validators.required],
        username: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.usernameValidator(),
          ]),
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  saveRegistration(registrationForm: any): void {
    console.log(registrationForm);
    this._regServ.create(registrationForm).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        console.log('Form Submitted!');
        // alert("You have registered successfully...");
        this.isSuccessful = true;
        this.dialogRef.close();
        this.openDialog();
        this.isSignUpFailed = false;
      },
      (error) => {
        console.log(error);

        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        console.log(this.isSignUpFailed);
      }
    );
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Submitted!');
      this.registrationForm.reset();
    }
    //this.registrationForm.reset();
  }
  get saveRegistrationFormControl(): any {
    return this.registrationForm.controls;
  }
  openDialog() {
    const dialogRef = this.dialog.open(RegistrationsuccessdialogComponent, {
      //  panelClass:'login-dialog-container'
      width: '300px',
    });
  }
}
