import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {


  constructor(private router : Router) {
    // seed a demo user. Replace with real auth.
    // const demo: User = { id: 'u1', name: 'Admin User', role: 'admin' };
    // this.currentUser$.next(demo);
  }

    getUser() {
    const data = localStorage.getItem('authData');
    if (data) return JSON.parse(data).user;
    return null;
  }

  // 🔹 Get stored token
  getToken() {
    const data = localStorage.getItem('authData');
    if (data) return JSON.parse(data).token;
    return null;
  }

  // 🔹 Check if logged in
  isLoggedIn() {
    return !!localStorage.getItem('authData');
  }

  // 🔹 Logout
  logout() {
    localStorage.removeItem('authData');
    this.router.navigate(['/login']);
  }

}