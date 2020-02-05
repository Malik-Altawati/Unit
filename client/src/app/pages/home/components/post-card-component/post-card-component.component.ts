import { Component, OnInit, Input, Output } from "@angular/core";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-post-card-component",
  templateUrl: "./post-card-component.component.html",
  styleUrls: ["./post-card-component.component.scss"]
})
export class PostCardComponentComponent implements OnInit {
  @Input() posts: any;
  // @Output() renderPosts: any = new EventEmitter();
  // posts: any;
  // users: any;

  constructor(private _http: HttpService) {}

  ngOnInit() {
    this._http.newPost.subscribe(data => {
      // console.log(this.posts);
      this.posts = data;
      // console.log(this.posts);
      // console.log(this.posts, "from post component");
    });
  }
}
