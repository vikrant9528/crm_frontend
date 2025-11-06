import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  // private url = 'http://localhost:3000';
  // private url = 'http://192.168.1.161:3000';

  constructor(private http: HttpClient) { }

  private _toast = new Subject<{ type: 'success' | 'error', msg: string }>();
  toast$ = this._toast.asObservable();

  show(type: 'success' | 'error', msg: string) {
    this._toast.next({ type, msg });
  }

  ngOnInit(): void {

  }
  postLead(data: any) {
    return this.http.post(environment.apiUrl + '/leads', data);
  }
  getAllLeads(payload) {
    return this.http.get(environment.apiUrl + payload)
  }
  addUser(data: any) {
    return this.http.post(environment.apiUrl + '/users', data);
  }
  getAllUsers(data: any) {
    return this.http.get(environment.apiUrl + '/users/' + data)
  }
  signup(data: any) {
    return this.http.post(environment.apiUrl + '/auth/signup', data).pipe(
      tap((res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }
  login(data: any) {
    return this.http.post(environment.apiUrl + '/auth/login', data)
  }
  putApi(param, payload: any) {
    return this.http.put(environment.apiUrl + param, payload)
  }
  getApi(param: string) {
    return this.http.get(environment.apiUrl + param)
  }
  deleteApi(endpoint:string){
    return this.http.delete(environment.apiUrl + endpoint);
  }
}
