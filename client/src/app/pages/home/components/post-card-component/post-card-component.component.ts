import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-post-card-component",
  templateUrl: "./post-card-component.component.html",
  styleUrls: ["./post-card-component.component.scss"]
})
export class PostCardComponentComponent implements OnInit {
  posts: any;
  users: any;

  constructor(private _http: HttpService) {}

  ngOnInit() {
    this._http.getPosts().subscribe((data: Array<any>) => {
      this.posts = data;
      // console.log(this.posts, "heeeeey these are the posts from post card");
    });

    this._http.getAllUsers().subscribe((data: Array<any>) => {
      this.users = data;
      // console.log(this.users, "heeeeey these are all users from post card");
    });
  }
}
