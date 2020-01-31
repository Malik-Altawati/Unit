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
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // setInterval(() => {
    //   if (localStorage.getItem("refreshtoken")) {
    //     this.refreshValue = localStorage.getItem("refreshtoken");
    //   }
    //   return this.http
    //     .post("http://localhost:5000/refreshtoken", {
    //       refreshtoken:
    //         "neTV0Lpq4AgNVYzYuFZxtPQXiozQ5he6TUSxv2kypok8NC5gZW…q1ysv0Pz4fsg3DT1pTWnHe6gdkKibFdVLWqewR5QFE31ahQwb"
    //     })
    //     .subscribe(data => {
    //       console.log(data);
    //       console.log("localSrtorage");
    //       localStorage.setItem("user_id", data["payload"]["id"]);
    //       localStorage.setItem("email", data["payload"]["email"]);
    //       localStorage.setItem("token", data["token"]);
    //       localStorage.setItem("refreshtoken", data["refreshToken"]);
    //       console.log("localSrtorage", localStorage);
    //     });
    // }, 60000);
  }
}
