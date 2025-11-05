import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(null);


  constructor() {
    // seed a demo user. Replace with real auth.
    // const demo: User = { id: 'u1', name: 'Admin User', role: 'admin' };
    // this.currentUser$.next(demo);
  }


  // getUser(): Observable<User | null> {
  // return this.currentUser$.asObservable();
  // }


  setUser(user: User | null) {
    this.currentUser$.next(user);
  }


  isAdmin(): boolean {
    const u = this.currentUser$.value;
    return !!u && u.role === 'admin';
  }
}