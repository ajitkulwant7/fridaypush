import { Component, OnInit } from '@angular/core';
import {QuizlistService} from './display-quiz.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {

  quizList:any;
  category:string;
  constructor(private service: QuizlistService,private router: Router,private _Activatedroute:ActivatedRoute,private http:HttpClient) {
    this._Activatedroute.params.subscribe(params=>
      this.category = params.category);
      console.log("catttttt-------"+this.category);
   }
  


  ngOnInit(): void {
    this.service.quizlist(this.category).subscribe((result)=>{
             this.quizList = result;
             console.log(this.quizList[0].id);
      
      });
    }

}
