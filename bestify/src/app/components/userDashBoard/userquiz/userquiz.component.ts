import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/test/http.service';

@Component({
  selector: 'app-userquiz',
  templateUrl: './userquiz.component.html',
  styleUrls: ['./userquiz.component.scss']
})
export class UserquizComponent implements OnInit {

  
  userid:number = JSON.parse(sessionStorage.getItem("userid"));
 
  quizscore:any[]=[];
  constructor(private userServ: HttpService) {
    this.userServ.getQuizScore(this.userid).subscribe((data)=>{
      this.quizscore=data;
      
      console.log(this.quizscore);
    })
   }

   
  

   displayedColumns: string[] = ['quizname', 'score'];
  //  dataSource = this.quizscore;

  ngOnInit(): void {
  }


}