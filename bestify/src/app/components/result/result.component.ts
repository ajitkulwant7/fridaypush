import { Component, OnInit } from '@angular/core';
import {HttpService} from '../quiz/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  userid:any;
  correct:number;
  answer:any=[];
  QuizId:number;
  count:number=0;
  scoredata:any;
  totalQuestions:number;
  quizname: any;
  constructor(private service:HttpService,private router:Router,private _Activatedroute:ActivatedRoute,private http: HttpClient) {
    this._Activatedroute.params.subscribe(params=>
      this.QuizId = params.QuizId);
      console.log("Quizid-------"+this.QuizId);
       this.answer=this.router.getCurrentNavigation().extras.state.selectedOption;
      //  this.userid=this.router.getCurrentNavigation().extras.state.userid;
      this.count=this.router.getCurrentNavigation().extras.state.correctcount;
     
    }

  ngOnInit(): void {
    // clearInterval();
    this.service.deleteStatus(this.QuizId,sessionStorage.getItem('userid')).subscribe();

    this.service.getQuestions(this.QuizId).subscribe((result)=>{
      this.correct=0;
      this.totalQuestions = result.length;
      // this.answer.forEach((e,i) => {
      //   if(e[i].selectedOption == result[i].Answers)
      //   this.correct++;
      // });
      for(var i=0;i<result.length;i++){
        if(this.answer[i].selectedOption == result[i].Answers)
        this.correct++;
      }
      // alert("correct---"+this.correct);
      // alert("count----"+this.count)
      this.correct = this.correct+this.count;

      this.scoredata={
        quizid:this.QuizId,
        userid:sessionStorage.getItem('userid'),
        score:this.correct
      }
  
      this.service.saveScore(this.scoredata).subscribe(response => {
        console.log(response);
        console.log("score Submitted!");
        },
        error => {
          console.log(error);
          
        });

    });
    

 
  setTimeout(()=>{this.submit()},5000);
    this.http.get(`http://localhost:8080/api/quiz/quizid/`+this.QuizId).subscribe((result:any)=>{
      this.quizname = result.quizname;
    });
  
}


submit()
  { 
    let maildata={
      'quizname':this.quizname,
      'username':sessionStorage.getItem('username'),
      'email': sessionStorage.getItem('email'),
      'score': this.correct
    }

    this.service.sendEmail("http://localhost:8080/api/quizscore/sendmail", maildata).subscribe(
     data => {
       let res:any = data;
       console.log(`mail has been sent succesfully to meghama@cybage.com email Id. `);
       alert("Check your mail to see score....");
     },
     err => {
       console.log(err);
       
     }
   );
    
  }

}

