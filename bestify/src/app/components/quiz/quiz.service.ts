import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) {


  }
  getTotalQuestions():Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/questions?QuizId=1`);
  }

  getQuestions(QuizId:number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/questions?QuizId=`+QuizId);
  }

  saveStatus(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/api/status',data);
  }
  updateStatus(quizid,userid,data:any):Observable<any>{
    return this.http.put(`http://localhost:8080/api/status?quizid=`+quizid+`&userid=`+userid,data);
  }
  deleteStatus(quizid,userid):Observable<any>{
    return this.http.delete(`http://localhost:8080/api/status?quizid=`+quizid+`&userid=`+userid);
  }
  getStatus(quizid,userid):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/status?quizid=`+quizid+`&userid=`+userid);
  }
  saveScore(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/api/quizscore',data);
  }
  sendEmail(url: string, maildata){
    // console.log("Aaaa raha hai.......");
      alert("Mail sent successfully, Check your mail to see your score....")
      return this.http.post(url, maildata);
    }
}

