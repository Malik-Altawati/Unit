import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ObservableLike } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-posts-section",
  templateUrl: "./posts-section.component.html",
  styleUrls: ["./posts-section.component.scss"]
})
export class PostsSectionComponent implements OnInit {
  constructor(private http: HttpClient) {}

  user_id: string = localStorage.getItem("user_id");
  Data: any;

  getData() {
    return this.http
      .post("http://localhost:5000/posts/get", { user_id: this.user_id })
      .subscribe(data => {
        this.Data = data;
        console.log(this.Data, "brrrrrrrrrrrrrrr");
      });
  }

  ngOnInit() {
    this.getData();
  }

  delete(item) {
    console.log(item, "delete this item");
    var resultOp = false;
    var footage = item;

    // shaking animation//
    var card = document.getElementById("card");
    card.classList.add("animated");
    card.classList.add("shake");
    // shaking animation//

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
      .then(result => {
        if (result.value) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          resultOp = true;
        }
      })
      .then(() => {
        if (resultOp) {
          this.http
            .post("http://localhost:5000/posts/delete", {
              user_id: this.user_id,
              id: footage
            })
            .subscribe(data => {
              if ((data = "Deleted")) {
                this.getData();
              }
            });
        }
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
