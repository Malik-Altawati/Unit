import { Component, OnInit, Input, Output } from "@angular/core";
import { HttpService } from "src/app/http.service";
import Swal from "sweetalert2";

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

  widePost(link) {
    console.log(link);
    Swal.fire({
      showClass: {
        popup: "animated bounceIn"
      },
      hideClass: {
        popup: "animated bounceOut"
      },
      background: "transparent",
      heightAuto: true,
      width: 700,
      showConfirmButton: false,
      imageUrl: `http://127.0.0.1:5000/uploads/${link}`
    });
  }
}
