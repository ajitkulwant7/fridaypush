import { Component, OnInit,Input,Output, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import {Quiz } from './quiz.model';
import {HttpService} from './quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { map } from 'jquery';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit ,OnDestroy{

  QuizId:any={};
  questionsResult:any;
  questionNo:number=1;
  index:number=0;
  que_ids:any[]=[];
   questions:any=[];
  // questions:Quiz[]=[];
  count:number=0;
   isClicked=false;
   totalQuestions:number=0;
  completionTime: number=0;
   correctAnswersCount:number=0;
  // questionID = 0;
   currentQuestion = 0;
  // questionIndex: number;
   correctAnswer: boolean;
   hasAnswer: boolean;
   disabled: boolean;
   quizIsOver: boolean;
   progressValue: number;
   timeLeft: any;
   timePerQuestion:number = 15;
   interval: any;
  elapsedTime: number;
  userid:any;
   elapsedTimes = [];
   updated:boolean=false;
   data:any;
   updatedata:any;
   statusData:any=[];

  constructor(private service:HttpService,private router: Router,private route: ActivatedRoute) {
    this.route.params.subscribe(params=>
      this.QuizId = params.QuizId); 
      this.service.getStatus(this.QuizId,sessionStorage.getItem('userid')).subscribe((result)=>{
          this.statusData = result;
         if(this.statusData[0].QuestionsAttempted >= 0)
         {
            //  alert("data present in status");
             this.index = this.statusData[0].QuestionsAttempted+1;
         }
          
      });

    
      this.getQuestions(this.QuizId);
      console.log("------------"+this.QuizId);
      
}
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  ngOnInit(): void {
     this.userid=  sessionStorage.getItem('userid');
    console.log("mydata-----"+this.userid);
      this.timeLeft = this.timePerQuestion;
      this.countdown();
  }

  getQuestions(QuizId:number){
    // alert("------------------------grt");
    this.service.getQuestions(QuizId).subscribe((result)=>{
      this.questions = result;
      this.totalQuestions = this.questions.length;
      this.progressValue = 100 * (this.index+1) / this.totalQuestions;    
      return this.questions;
    });
  }

  navigateToNextQuestion(){
    this.router.navigate(['Quiz/'+this.QuizId+'/question/'+this.index++]);
    this.resetTimer();
    this.increaseProgressValue();
  }

  increaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.index + 1) / this.totalQuestions).toFixed(1));
  }
  getQuestionID() {
    //alert(this.questions[this.index+1].id); 
     return this.questions[this.index+1].id;
  }

  isFinalQuestion(): boolean {
    return this.index === this.totalQuestions;
  }
  calculateTotalElapsedTime(elapsedTimes) {
    return this.completionTime = elapsedTimes.reduce((acc, cur) => acc + cur, 0);
  }

  isCorrect(id:number,option:string){
    //alert("u selected"+option+"for id"+id);
    $("li").click(function(){
      $('li').removeClass('selected');
      $(this).addClass('selected');
     });
    this.questions[this.index].selectedOption = option;
    if(this.questions[this.index].selectedOption == this.questions[this.index].Answers){
      this.correctAnswersCount++;
    }
    this.statusSave(this.QuizId,this.userid,this.index);
    // alert("index"+this.index+" "+this.questions[this.index].selectedOption);
    if(this.index+1 == this.totalQuestions){
      this.quizIsOver=true;
    clearInterval(this.interval);
   
    this.router.navigate(['/result/'+this.QuizId],{state:{
      selectedOption:this.questions,
      correctcount:this.correctAnswersCount

    }});
  }
  }

  statusSave(quizId,userid,index){
    this.data={
      quizid :quizId,
      userid : userid,
      score:this.correctAnswersCount,
      QuestionsAttempted:this.index
    }
    if(this.updated===false){
     
      this.service.saveStatus(this.data).subscribe(
        response => {
          console.log(response);
          console.log("Form Submitted!");
          // alert("You have saved satus successfully...");
          },
          error => {
            console.log(error);
            
          });
          this.updated = true;
     }
     else{
       
       this.service.updateStatus(this.QuizId,this.userid,this.data).subscribe(
        response => {
          console.log(response);
          console.log("Form Submitted!");
          },
          error => {
            console.log(error);
            
          });
          this.updated = true;
          if(this.index+1 == this.totalQuestions)
          this.correctAnswersCount = 0;
     }

  }

  navigateToResult(){
      clearInterval(this.interval);
      this.router.navigate(['/result/'+this.QuizId],{state:{
        selectedOption:this.questions,
        userid:this.userid,
        correctcount:this.correctAnswersCount
      }});
  }

  quizDelay(milliseconds) {
    const start = new Date().getTime();
    let counter = 0;
    let end = 0;

    while (counter < milliseconds) {
      end = new Date().getTime();
      counter = end - start;
    }
  }

  private countdown() {
    // alert(this.index);
    if (this.index <= this.totalQuestions) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
           if (this.timeLeft === 0 && !this.isFinalQuestion()) {
            this.navigateToNextQuestion();
           }
           if (this.timeLeft === 0 && this.isFinalQuestion()) {
            clearInterval(this.interval);  
           }
        }
      }, 1000);
    }
  }
  private resetTimer() {
    this.timeLeft = this.timePerQuestion;
  }

  
}


















