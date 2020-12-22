import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _http: HttpClient) {}

  getgameusersCount() {
    return this._http.get(
      'http://localhost:8080/api/gameScore/getGameUserCount'
    );
  }

  getquizusersCount() {
    return this._http.get(
      'http://localhost:8080/api/quizscore/getQuizUserCount'
    );
  }

  getUsersWithHighGameScore() {
    return this._http.get(
      'http://localhost:8080/api/gameScore/getUsersWithHighGameScore'
    );
  }
  getUsersWithHighQuizScore() {
    return this._http.get(
      'http://localhost:8080/api/quizscore/getUsersWithHighQuizScore'
    );
  }
  postQuiz(quiz: any) {
    return this._http.post('http://localhost:8080/api/quiz', quiz);
  }
  postQuestions(questions: any) {
    return this._http.post('http://localhost:8080/api/questions', questions);
  }

  getallQuiz() {
    return this._http.get('http://localhost:8080/api/quiz');
  }
  deleteQuiz(id1: any) {
    console.log(id1 + 'in http');
    return this._http.delete("http://localhost:8080/api/quiz/" + id1);
  }
}
