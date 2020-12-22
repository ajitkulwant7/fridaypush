import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { AuthServiceService } from '../../service/login/loginservice.service';
//import { Router } from '@angular/router';
@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.scss'],
})
export class LogindialogComponent implements OnInit {
  myform: FormGroup;
  loggedIn: boolean = false;
  isThemeChange: boolean = false;
  adminLoggedIn: boolean = false;
  isValidate: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LogindialogComponent>,
    private authService: AuthServiceService,
    private fb: FormBuilder
  ) {
    this.isThemeChange = this.data.theme;
    // alert(this.isThemeChange);
    this.myform = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  loginProcess() {
    // console.log(this.formGroup);

    let user1 = {
      username: this.myform.value.username,
      password: this.myform.value.password,
    };

    if (this.myform.valid) {
      // console.log("test ...");

      let res = this.authService.login(user1).subscribe(
        (data) => {
          //console.log("daskjdg");

          console.log(data);
          console.log(data.user.isadmin);

          if (data.user.isadmin) {
            sessionStorage.setItem('admin', data);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('username', data.user.username);

            this.adminLoggedIn = true;
            this.dialogRef.close({
              event: 'close',
              data: [this.adminLoggedIn, 'admin'],
            });
          } else {
            sessionStorage.setItem('user', data);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('username', data.user.username);
            sessionStorage.setItem('userid',data.user.id);
            sessionStorage.setItem('email',data.user.email);


            this.loggedIn = true;
            this.dialogRef.close({
              event: 'close',
              data: [this.loggedIn, 'user'],
            });
          }
        },
        (error) => {
          // alert(this.data);
          // alert('Please enter valid credentials.');
          this.isValidate=true;
        }
      );
    }
  }
}
