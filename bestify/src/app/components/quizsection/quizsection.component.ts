import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CheckloginComponent } from '../checklogin/checklogin.component';
import { MatDialog } from '@angular/material/dialog';
declare var jarallax;
@Component({
  selector: 'app-quizsection',
  templateUrl: './quizsection.component.html',
  styleUrls: ['./quizsection.component.scss'],
})
export class QuizsectionComponent implements OnInit {
  @Input() attemptClick: boolean = false;

  @Output() public notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2,
    });
  }

  attemptClicked(path) {
    if (sessionStorage.getItem('user')) {
      this.attemptClick = true;
      this.notify.emit(this.attemptClick);
      this.router.navigate([`${path}`]);
    } else {
      this.openLoginDialog();
    }
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(CheckloginComponent, {
      //  panelClass:'login-dialog-container'
      width: '200px',
    });
  }
}
