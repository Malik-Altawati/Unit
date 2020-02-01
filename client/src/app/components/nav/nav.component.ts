import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  token;
  constructor(private http: HttpClient) { }

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
    const id = Number(localStorage.getItem("user_id"))
    console.log("idddd", id)
    this.http
      .post("http://localhost:5000/logout", { id })
      .subscribe(data => {
        console.log(data);
        localStorage.clear();
      });
  }
  id(arg0: string, id: any) {
    throw new Error("Method not implemented.");
  }
}
