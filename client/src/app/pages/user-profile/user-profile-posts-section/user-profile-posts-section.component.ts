import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "app-user-profile-posts-section",
  templateUrl: "./user-profile-posts-section.component.html",
  styleUrls: ["./user-profile-posts-section.component.scss"]
})
export class UserProfilePostsSectionComponent implements OnInit {
  constructor(private http: HttpClient) { }

  @Input() userData: any;
  // user_id: any = this.userData.id;
  // userData: any;
  Filtered: any;

  filter(event) {
    console.log(this.Filtered)
    this.Filtered = []
    console.log(event["index"])
    if (event["index"] == 1) {
      for (var i = 0; i < this.userData.length; i++) {
        if (this.userData[i]["type"] == "image") {
          this.Filtered.push(this.userData[i])
        }
      }
    } else if (event["index"] == 2) {
      for (var i = 0; i < this.userData.length; i++) {
        if (this.userData[i]["type"] == "video") {
          this.Filtered.push(this.userData[i])
        }
      }
    } else if (event["index"] == 3) {
      for (var i = 0; i < this.userData.length; i++) {
        if (this.userData[i]["type"] == "audio") {
          this.Filtered.push(this.userData[i])
        }
      }
    } else {
      this.Filtered = this.userData
    }
    console.log(this.Filtered)
  }

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
    setTimeout(() => {
      this.Filtered = this.userData;

    }, 1000);
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
