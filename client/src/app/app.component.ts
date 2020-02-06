import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Unit";
  refreshValue = "";
  constructor(private http: HttpClient) {}

  ngOnInit() {
    setInterval(() => {
      if (localStorage.getItem("refreshtoken")) {
        this.refreshValue = localStorage.getItem("refreshtoken");
      }
      return this.http
        .get("http://localhost:5000/refreshtoken")
        .subscribe(data => {
          console.log(data);
          console.log("localSrtorage");
          localStorage.setItem("user_id", data["payload"]["id"]);
          localStorage.setItem("email", data["payload"]["email"]);
          localStorage.setItem("token", data["token"]);
          localStorage.setItem("refreshtoken", data["refreshToken"]);
          console.log("localSrtorage", localStorage);
        });
    }, 30 * 60 * 1000); // keep it  30 * 60 * 1000
  }
}
