import { Component, OnInit, Input, Output } from "@angular/core";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-post-card-component",
  templateUrl: "./post-card-component.component.html",
  styleUrls: ["./post-card-component.component.scss"]
})
export class PostCardComponentComponent implements OnInit {
  @Input() posts: any;

  constructor(private _http: HttpService) {}

  ngOnInit() {
    this._http.newPost.subscribe(data => {
      this.posts = data;
    });
  }
}
