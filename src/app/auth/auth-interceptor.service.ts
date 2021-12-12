import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs';
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private  session: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.session.getTokenFromStorage();

    if (token != null) {


      let tokenInReq = req.clone({
        setHeaders: {
          Authorization: "Bearer " + token
        }
      })
      console.log("Hieronder de header 'Authorization'. ")
      console.log(tokenInReq.headers.get("Authorization"))
      return next.handle(tokenInReq)
    } else {
      return next.handle(req);
    }
  }
}
