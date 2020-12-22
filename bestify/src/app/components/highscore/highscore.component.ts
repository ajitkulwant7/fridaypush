import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpService } from 'src/app/test/http.service';
import { AuthServiceService } from 'src/app/service/login/loginservice.service';
// import { MatTableModule } from '@angular/material/table'  



@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit   {
  quizHighScorer:any[]=[];
  gameHighScorer:any[]=[];

  constructor(private highService : AuthServiceService) {
    this.highService.gethighScorer().subscribe((data)=>{
      this.quizHighScorer =data;
      console.log(this.quizHighScorer);
      
    })
    this.highService.getGamehighScorer().subscribe((data)=>{
      this.gameHighScorer =data;
      console.log(this.gameHighScorer);
      
    })

   }

   
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns1: string[] = ['quizname', 'username', 'score'];
  displayedColumns2: string[] = ['gamename', 'username', 'score'];

  ngOnInit(): void {
  }

  // dataSource = new MatTableDataSource(this.highScorer);
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

}
