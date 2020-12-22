import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl = "http://localhost:8080/api/user"
  
  constructor(private http: HttpClient) { }
  
  create(data : any):Observable<any>{
    return this.http.post(this.baseUrl,data);
  }
}
