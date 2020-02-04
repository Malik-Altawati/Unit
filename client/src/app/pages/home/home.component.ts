import { Component, OnInit, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  posts: any;
  users: any;

  constructor(private router: Router, private _http: HttpService) {}

  ngOnInit() {
    setInterval(() => {
      if (!localStorage.token) {
        console.log("no tokeeeeeeeeeeen");
        this.router.navigate(["/"]);
      }
    }, 60000); //about 4 minsS

    this._http.getAllPosts().subscribe((data: Array<any>) => {
      this.posts = data;
      console.log(this.posts, "heeeeey these are the posts from home");
    });

    // this._http.getAllUsers().subscribe((data: Array<any>) => {
    //   this.users = data;
    //   // console.log(this.users, "heeeeey these are all users from post card");
    // });
  }
}
