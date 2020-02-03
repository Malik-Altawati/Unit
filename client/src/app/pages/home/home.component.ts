import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  posts: any;

  constructor(private router: Router, private _http: HttpService) {}

  ngOnInit() {
    setInterval(() => {
      if (!localStorage.token) {
        console.log("no tokeeeeeeeeeeen");
        this.router.navigate(["/"]);
      }
    }, 60000); //about 4 minsS

    this._http.getPosts().subscribe((data: Array<any>) => {
      this.posts = data;
      console.log(this.posts, "heeeeey these are the posts");
    });
  }
}
