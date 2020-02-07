import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  userData: any;
  followed = false;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      var id = params["id"];
      var myId = localStorage.getItem("user_id");

      if (myId === id) {
        this.router.navigate(["/profile"]);
      } else {
        this.http
          .post("http://localhost:5000/findById", { user_id: id })
          .subscribe(data => {
            this.userData = data;
          });
      }
      this.http
        .post("http://localhost:5000/follow/getfollowers", {
          followed_id: id
        })
        .subscribe(data => {
          for (var i = 0; i < data["length"]; i++) {
            if (data[i]["follower_id"].myId === data[i]["followed_id"].id) {
              console.log("YOU ARE FOLLOWING HIM");
              this.followed = true;
              return this.followed;
            } else {
              console.log("YOU ARE NOT FOLLOWING HIM");
              return this.followed;
            }
          }
          // console.log(data, "data");
          console.log(data, "ppl followed ");
        });
    });
  }

  follow(id) {
    var follower = localStorage.getItem("user_id");
    this.http
      .post("http://localhost:5000/follow/create", {
        follower_id: follower,
        followed_id: id
      })
      .subscribe(data => {
        this.followed = true;
        console.log(data, "user profile res follow");
      });
  }

  unFollow(id) {
    var follower = localStorage.getItem("user_id");
    this.http
      .post("http://localhost:5000/follow/delete", {
        follower_id: follower,
        followed_id: id
      })
      .subscribe(data => {
        this.followed = false;
        console.log(data, "user profile res UNFOLLOW");
      });
  }
}
