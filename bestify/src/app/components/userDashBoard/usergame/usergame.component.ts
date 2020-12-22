import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/test/http.service';

@Component({
  selector: 'app-usergame',
  templateUrl: './usergame.component.html',
  styleUrls: ['./usergame.component.scss']
})
export class UsergameComponent implements OnInit {
  param:number = JSON.parse(sessionStorage.getItem("userid"));
  gamescore:any[]=[];
  constructor(private userServ: HttpService) {
    this.userServ.getGameScore(this.param).subscribe((data)=>{
      this.gamescore=data;
    })
   }

   

   displayedColumns: string[] = [ 'Game Name', 'Score'];
  //  dataSource = this.gamescore;
  
  ngOnInit(): void {
  }

}
