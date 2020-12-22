import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GamescoreTodbService {
  constructor(private _http: HttpClient) {}

  postGameScore(score) {
    return this._http.post('http://localhost:8080/api/gameScore', score);
  }
}
