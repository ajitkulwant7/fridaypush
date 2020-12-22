import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { GameService } from './services/game.service';
import { Location } from '@angular/common';
import { HttpService } from '../../quiz/quiz.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShowScoreComponent } from '../../show-score/show-score.component';

// import { HttpService } from 'src/app/test/http.service';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  @ViewChild('canvas') public canvas: ElementRef;
  subscription: any;
  showLoader = true;
  score: number = 0;
  subs2: any;
  flag: boolean = false;
  constructor(
    private appService: AppService,
    private gameService: GameService,
    private quizservice: HttpService,
    private _location: Location,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.appService.createPlayGround(canvasEl);
    this.subscription = this.appService
      .getImageLoadEmitter()
      .subscribe((item) => {
        this.showLoader = false;
        this.gameService.startGameLoop();
      });

    this.subs2 = this.gameService.getCount().subscribe((res) => {
      this.score = res;
      console.log(res);
    });
    this.gameService.getFlag().subscribe((res) => {
      this.flag = res;
      console.log(res);
      if (this.flag) {
        this.openScoreDialog();
      }
    });
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.appService.movePlayer(event, 'keydown');
  }

  @HostListener('document:keyup', ['$event']) onKeyupHandler(
    event: KeyboardEvent
  ) {
    this.appService.movePlayer(event, 'keyup');
  }

  backToHome() {
    this._location.back();
    setTimeout(() => window.location.reload(), 1);
  }
  submit() {
    // console.log(this.user_email);

    let maildata = {
      username: sessionStorage.getItem('username'),
      quizname: 'car game',
      email: sessionStorage.getItem('email'),
      score: this.score,
    };

    // this.quizservice.sendEmail("http://localhost:8080/api/quizscore/sendmail", maildata).subscribe(
    //  data => {
    //    let res:any = data;
    //    console.log(`mail has been sent succesfully to meghama@cybage.com email Id. `);
    //    alert("Check your mail to see score....");
    //  },
    //  err => {
    //    console.log(err);

    //  }
    //  );
  }

  openScoreDialog() {
    const dialogRef = this.dialog.open(ShowScoreComponent, {
      //  panelClass:'login-dialog-container'
      width: '350px',
      data: {
        score: this.score,
        gameid: 2,
      },
    });
  }

  // showScore() {
  //   this.openLoginDialog()
  // }
}
