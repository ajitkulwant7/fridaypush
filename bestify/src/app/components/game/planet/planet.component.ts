import { Component, OnInit } from '@angular/core';
import { PlanetService } from 'src/app/service/planet.service.js';
// import { GameService } from 'src/app/service/game.service';



@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {
  subs: any;
  score: any;
  constructor(private gserv: PlanetService) {
     
  }
  ngOnInit(): void {
    

  }
 
  updateScore(s) {
    this.score = s;
    console.log(this.score);

  this.saveScore(this.score);
  }
  // constructor(private userServ: HttpService) {
  //   this.userServ.getGameScore().subscribe((data)=>{
  //     this.gamescore=data;
  //   })
  saveScore(score)
  {
    // console.log();
    // this.gserv.saveScore(score, sessionStorage.getItem('username')).subscribe((data)=>{
    // })
  }
}
