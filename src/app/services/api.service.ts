import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  // private url = 'http://localhost:3000';
  private url = 'http://192.168.1.161:3000';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }
  postLead(data: any) {
    return this.http.post(this.url + '/leads', data);
  }
  getAllLeads(payload) {
    return this.http.get(this.url + payload)
  }
  addUser(data: any) {
    return this.http.post(this.url + '/users', data);
  }
  getAllUsers(data: any) {
    return this.http.get(this.url + '/users/' + data)
  }
  signup(data: any) {
    return this.http.post(this.url + '/auth/signup', data).pipe(
      tap((res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }
  login(data: any) {
    return this.http.post(this.url + '/auth/login', data)
  }
  putApi(param, payload: any) {
    return this.http.put(this.url + param, payload)
  }
  getApi(param: string) {
    return this.http.get(this.url + param)
  }
}
