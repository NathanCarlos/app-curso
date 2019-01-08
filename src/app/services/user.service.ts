import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8081';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  auth(email, password){
    return this.http.post(`${this.baseUrl}/auth`, { email, password }, { headers: this.headers })
  }
  register(username, email, password ){
    return this.http.post(`${this.baseUrl}/user/create`, { username, email, password }, { headers: this.headers })
  }
}
