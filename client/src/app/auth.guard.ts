import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
// import { LoginComponent } from "./user/login/login.component";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  // static canActivate() {
  //   throw new Error("Method not implemented.");
  // }
  tokenValue = "";
  constructor(
    // private _authService: LoginComponent,
    private _router: Router,
    private http: HttpClient
  ) { }

  canActivate(): any {
    // if (localStorage.getItem("token")) {
    //   this.tokenValue = localStorage.getItem("token").slice(7);
    // }
    console.log(this.tokenValue, "token from client");
    return this.http.get("http://localhost:5000/auth").pipe(
      map(data => {
        console.log(data["message"]);
        if (data["message"] === "all good") {
          return true;
        }
        localStorage.clear();
        this._router.navigate(["/login"]);
        return false;
      })
    );
  }
}