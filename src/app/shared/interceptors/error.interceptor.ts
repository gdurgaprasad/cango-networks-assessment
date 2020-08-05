import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { UserService } from "../services/user.service";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { PAGES, MESSAGES } from "../utils/constant";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {

        // DO SOME STUFF HERE BASED ON ERROR CODES
        const isOnline = window.navigator.onLine;
        const error = !isOnline
          ? MESSAGES.NETWORK_NOT_AVAILABLE
          : err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
