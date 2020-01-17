import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../_services/auth.service";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, filter, switchMap, take} from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("id_token");

    if (this.auth.isLoggedIn()) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + this.auth.getJwtToken())
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
