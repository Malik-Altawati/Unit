import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "app-info-section",
  templateUrl: "./info-section.component.html",
  styleUrls: ["./info-section.component.scss"]
})
export class InfoSectionComponent implements OnInit {
  fileData: File = null;
  follow: any;

  constructor(private _http: HttpClient) { }
  user_id: string = localStorage.getItem("user_id");
  name: string;
  username: string;
  email: string;
  age: string;
  bio: string;
  gender: string;
  photo: string;

  ngOnInit() {
    this.getFollow();
    this._http
      .post("http://localhost:5000/findById", { user_id: this.user_id })
      .subscribe(data => {
        console.log(data);
        this.name = data[0]["name"];
        this.username = data[0]["username"];
        this.age = data[0]["age"];
        this.email = data[0]["email"];
        this.bio = data[0]["bio"];
        this.gender = data[0]["gender"];
        this.photo = data[0]["photo"];
      });
    this._http
      .post("http://localhost:5000/follow/getfollowers", {
        followed_id: this.user_id
      })
      .subscribe(data => {
        console.log(data, "followerrrrrrrrrrrrrs");
      });
  }

  onUploadPhoto(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    if (
      this.fileData["type"].split("/")[0] === "video" ||
      this.fileData["type"].split("/")[0] === "audio"
    ) {
      Swal.fire({
        titleText: "You can't upload non image files",
        icon: "error"
      });
      return false;
    }
    // console.log(this.fileData, "type");

    const formData = new FormData();
    const user_id = localStorage.getItem("user_id");

    formData.append("files", this.fileData); // here we pass the file
    formData.append("user_id", localStorage.user_id); // here we pass user id
    this._http
      .post("http://localhost:5000/updatePhoto", formData)
      .subscribe(data => {
        console.log(data);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Profile Photo Updated !!",
          showConfirmButton: false,
          timer: 1500
        });
        this._http
          .post("http://localhost:5000/findById", { user_id })
          .subscribe(data => {
            console.log(data);
            this.photo = data[0]["photo"];
          });
      });
    //
  }

  getFollow() {
    this._http
      .get("http://localhost:5000/follow/getfollowersInfo")
      .subscribe(data => {
        this.follow = data["length"];
        console.log(this.follow, "ff");
      });
  }

  followersInfo() {
    Swal.fire(`
      <ul>
        <li>follower 1</li>
        <li>follower 2</li>
        <li>follower 3</li>
      </ul>
    `);
  }
}
