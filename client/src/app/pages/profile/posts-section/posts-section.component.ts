import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ObservableLike } from "rxjs";

@Component({
  selector: "app-posts-section",
  templateUrl: "./posts-section.component.html",
  styleUrls: ["./posts-section.component.scss"]
})
export class PostsSectionComponent implements OnInit {
  constructor(private http: HttpClient) {}

  user_id = localStorage.getItem("user_id");
  Data: any;
  ngOnInit() {
    this.http
      .post("http://localhost:5000/posts/get", { user_id: this.user_id })
      .subscribe(data => {
        console.log(data);
        this.Data = data;
      });
  }
}
