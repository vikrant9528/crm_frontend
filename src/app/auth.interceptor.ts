import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // List of URLs that should NOT include the token
    const excludedUrls = ['/login', '/signup'];

    // Check if the request URL matches any excluded URL
    const isExcluded = excludedUrls.some(url => req.url.includes(url));

    if (isExcluded) {
      return next.handle(req); // Skip adding Authorization header
    }

    const authData = localStorage.getItem('authData');
    if (authData) {
      const data = JSON.parse(authData);
      const token = data.token;
      if (token) {
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(authReq);
      }
    }

    return next.handle(req);
  }
}
