import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"
const arrayOfInjects = ["signIn", "signUp"]

@Injectable()
export class CustomInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = request.clone(handleClone(request.url))
    function handleClone(url) {
      const include = arrayOfInjects.find(inj => url.includes(inj))
      if (include) return {}
      const token = localStorage.getItem("token") || ""
      return { setHeaders: { autorization: token } }
    }
    return next.handle(newRequest).pipe(map(event => {
      if (event instanceof HttpResponse) {
        if (event.body.status === false) localStorage.setItem("token", "")
      }
      return event;
    }))
  }
}