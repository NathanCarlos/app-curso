import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) { }

  find() {
    return this.http.get(`${this.baseUrl}/task/find`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  findAll() {
    return this.http.get(`${this.baseUrl}/task/findAll`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  findAllDone() {
    return this.http.get(`${this.baseUrl}/task/findAllDone`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  
  findCount(){
    return this.http.get(`${this.baseUrl}/task/findCount`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  findCountAll(){
    return this.http.get(`${this.baseUrl}/task/findCountAll`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  create(title, description, dataInicio, dataFim, aviso) {
    return this.http.post(`${this.baseUrl}/task/create`, { title, description, dataInicio, dataFim, aviso }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  update(id, title, description, dataInicio, dataFim, done, aviso) {
    return this.http.put(`${this.baseUrl}/task/update`, { id, title, description, dataInicio, dataFim, done, aviso }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  delete(id) {
    return this.http.delete(`${this.baseUrl}/task/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
}
