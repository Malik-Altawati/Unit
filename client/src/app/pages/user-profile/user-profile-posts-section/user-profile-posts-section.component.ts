import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "app-user-profile-posts-section",
  templateUrl: "./user-profile-posts-section.component.html",
  styleUrls: ["./user-profile-posts-section.component.scss"]
})
export class UserProfilePostsSectionComponent implements OnInit {
  constructor(private http: HttpClient) {}

  @Input() userData: any;
  // user_id: any = this.userData.id;
  // userData: any;

  getData() {
    console.log(this.userData, "tesssssssssst");
    return this.http
      .post("http://localhost:5000/posts/get", { user_id: this.userData[0].id })
      .subscribe(data => {
        console.log(data, "brr");
        this.userData = data;
      });
  }

  ngOnInit() {
    this.getData();
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
