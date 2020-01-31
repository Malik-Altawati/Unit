import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  token;
  constructor(private http: HttpService) {}

  ngOnInit() {
    var check = setInterval(() => {
      this.token = localStorage.token;
      if (this.token) {
        clearInterval(check);
      }
    }, 200);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("email");
    localStorage.removeItem("user_id");
  }
}
