import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamescoreService {

  constructor(private http: HttpClient) {}


  saveScore(score:any, gameid:any,userid:any): Observable<any> {
    // let jsondata = JSON.stringify(data);
    return this.http.post(`http://localhost:8080/api/gameScore`, {
      score: score,
      gameid: gameid,
      userid:userid
    });
  }}
