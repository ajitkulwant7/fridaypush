import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GamescoreTodbService } from 'src/app/service/gamescoreDb/gamescore-todb.service';
@Component({
  selector: 'app-rockpapersissors',
  templateUrl: './rockpapersissors.component.html',
  styleUrls: ['./rockpapersissors.component.scss'],
})
export class RockpapersissorsComponent implements OnInit {
  scores = [0, 0]; // store the scores. index 0 is you. index 1 is player 2.
  weapons = ['rock', 'paper', 'scissors'];
  playerSelected = -1;
  enemySelected = -1;
  loading = false; // we're going to show a loading spinner when waiting for the enemy pick.
  isResultShow = false;
  // theResult -  0 winner
  //              1 lose
  //              2 tie
  theResult = 0;
  finalScore = 10;
  constructor(
    private _location: Location,
    private _gameScoreServ: GamescoreTodbService
  ) {}

  ngOnInit(): void {}

  pick(weapon: number): void {
    if (this.scores[0] == 5) {
      alert('you win');
    }
    if (this.scores[1] == 5) {
      alert('pc win');
    }

    // return immediately when still loading. You don't want
    // the user to spam the button.
    if (this.loading) return;
    this.loading = true;
    this.playerSelected = weapon;

    //create a delay to simulate enemy's turn.
    setTimeout(() => {
      this.loading = false;
      // generate a number from 0 -2
      const randomNum = Math.floor(Math.random() * 3);
      this.enemySelected = randomNum;
      this.checkResult();
      this.isResultShow = true;
    }, Math.floor(Math.random() * 500) + 200);
  }

  reset(): void {
    this.scores = [0, 0];
  }
  checkResult(): void {
    const playerPick = this.playerSelected;
    const enemyPick = this.enemySelected;
    // if you and the enemy have the same weapon, then it is a tie.
    if (playerPick == enemyPick) {
      this.theResult = 2;
    }
    // let's say you picked rock ( 0 )
    // and the enemy picked paper ( 1 )
    // you lose because ( 0 - 1 + 3 ) % 3  is equal to 2.

    // when you picked rock ( 0 )
    // and the enemy picked scissor ( 2 )
    // you win because ( 0 - 2 + 3) % 3 is equal to 1.

    // when you picked scissor ( 2 )
    // and the enemy picked paper ( 1 )
    // you win because ( 2 - 1 + 3 ) % 3 is equal to 1. 4 % 3 is 1.
    // Hope you get the picture.
    else if ((playerPick - enemyPick + 3) % 3 == 1) {
      // YOU WIN
      this.theResult = 0;
      this.scores[0] = this.scores[0] + 1;
    } else {
      // YOU LOSE
      this.theResult = 1;
      this.scores[1] = this.scores[1] + 1;
    }
  }
  backToHome() {
    this._location.back();
    setTimeout(() => window.location.reload(), 500);
  }
  submitResults() {
    let score = {
      GameId: 3,
      UserId: sessionStorage.getItem('userid'),
      Score: this.scores[0],
    };

    this._gameScoreServ.postGameScore(score).subscribe((res) => {
      console.log(res);
    });
  }
}
