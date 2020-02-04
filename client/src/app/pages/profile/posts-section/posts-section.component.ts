import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ObservableLike } from "rxjs";

@Component({
  selector: "app-posts-section",
  templateUrl: "./posts-section.component.html",
  styleUrls: ["./posts-section.component.scss"]
})
export class PostsSectionComponent implements OnInit {
  constructor(private http: HttpClient) { }

  user_id: string = localStorage.getItem("user_id");
  Data: any;

  getData() {
    return this.http
      .post("http://localhost:5000/posts/get", { user_id: this.user_id })
      .subscribe(data => {
        console.log(data);
        this.Data = data;
      });
  }


  ngOnInit() {
    this.getData()
  }

  delete(item) {
    var footage = item
    this.http
      .post("http://localhost:5000/posts/delete", { user_id: this.user_id, id: footage })
      .subscribe(data => {
        if (data = "Deleted") {
          this.getData()
        }
      });
  }
}
