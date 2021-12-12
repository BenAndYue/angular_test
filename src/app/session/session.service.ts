import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {addImports} from "@angular/compiler-cli/src/ngtsc/transform/src/utils";
import {getNextToLastParentNode} from "codelyzer/util/utils";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public readonly BACKEND_URL = "http://localhost:8085/authenticate"
  private BS_TOKEN_NAME = 'AUTH_TOKEN';
  public currentUserName: string = null;
  t: boolean;

  constructor(private http: HttpClient) {
     this.getTokenFromStorage();
    this.getTokenFromSession();

  }

  private getTokenFromSession() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("No token found in localstorage")
    }
    return token;

  }

  // @ts-ignore
  signin(email: string, password: string): Observable<any> {
    console.log(email + "" + password)

    let signInRes = this.http.post<HttpResponse<User>>(this.BACKEND_URL + "/login", {
      email: email,
      password: password
    }, {observe: 'response'});

    signInRes.subscribe(response => {
      console.log(response);
      let token = response['headers'].get('Authorization');

      if (token == null) {
        console.log("no token in response")
      }
      token = token.replace('Bearer ', '');
      this.saveToSessionStorage(token, password)

    })

    return signInRes;

  }


  isAutenticated(): boolean{
    const localToken = window.localStorage.getItem("token");
    if (!localToken){
      return false
    }
    return true;
  }

  public saveToSessionStorage(token: string, username: string) {
    localStorage.setItem("token", token);

    sessionStorage.setItem("token", token)
    sessionStorage.setItem("username", username)
    window.location.reload();
  }


  deleteLocalUser() {
    //delete for local storage
    localStorage.removeItem('Users');
    localStorage.removeItem('token');

    //delte for session storage;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");

    window.location.reload();
  }

  getTokenFromStorage(): string {
    let token = sessionStorage.getItem(this.BS_TOKEN_NAME);
    if (token == null) {
      console.log("Getting token")
      token = localStorage.getItem("token");
      sessionStorage.setItem("token", token);
    }

    return token;
  }
}
