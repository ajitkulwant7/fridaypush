import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GamescoreTodbService } from 'src/app/service/gamescoreDb/gamescore-todb.service';

@Component({
  selector: 'app-show-score',
  templateUrl: './show-score.component.html',
  styleUrls: ['./show-score.component.scss'],
})
export class ShowScoreComponent implements OnInit {
  score: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private _gameScoreServ: GamescoreTodbService
  ) {}

  ngOnInit(): void {
    this.score = this.data.score;
  }
  goBackToHomePage() {
    this.router.navigate(['']);
    setTimeout(() => window.location.reload(), 1);
  }
  sentResults() {
    let score = {
      GameId: this.data.gameid,
      UserId: sessionStorage.getItem('userid'),
      Score: this.score,
    };

    this._gameScoreServ.postGameScore(score).subscribe((res) => {
      console.log(res);
    });
  }
}
