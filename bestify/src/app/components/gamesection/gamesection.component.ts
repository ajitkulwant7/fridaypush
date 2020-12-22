import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { CheckloginComponent } from '../checklogin/checklogin.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-gamesection',
  templateUrl: './gamesection.component.html',
  styleUrls: ['./gamesection.component.scss'],
})
export class GamesectionComponent implements OnInit {
  @Output() isgamestart = new EventEmitter<boolean>();
  gamestarted: boolean = false;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.changeDetectorRef.detectChanges();
    // this.dataSource.paginator = this.paginator;
    // this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    // if (this.dataSource) {
    //   this.dataSource.disconnect();
    // }
  }
  startgame(path,gameid) {
    if (sessionStorage.getItem('user')) {
      this.gamestarted = true;
      this.isgamestart.emit(this.gamestarted);
      // sessionStorage.setItem('gameid',gameid);
      console.log(this.gamestarted);
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
