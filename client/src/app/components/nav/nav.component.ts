import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AbsoluteSourceSpan } from "@angular/compiler";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  token;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    var check = setInterval(() => {
      this.token = localStorage.token;
      if (this.token) {
        clearInterval(check);
      }
    }, 200);
  }

  logout() {
    localStorage.removeItem("token");
    const id = Number(localStorage.getItem("user_id"));
    console.log("idddd", id);
    this.http.post("http://localhost:5000/logout", { id }).subscribe(data => {
      console.log(data);
      localStorage.clear();
    });
  }

  routing() {
    if (localStorage.token) {
      this.router.navigate(["/home"]);
    } else {
      this.router.navigate(["/"]);
    }
  }

  lookUp() {
    Swal.fire({
      title: "Search by Username",
      showClass: {
        popup: "animated fadeInDownBig"
      },
      hideClass: {
        popup: "animated fadeOutUpBig"
      },
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Search",
      showLoaderOnConfirm: true,
      preConfirm: username => {
        return this.http
          .post("http://localhost:5000/findUser", { username: username })
          .subscribe(response => {
            // console.log(response, "ressssponnnnnse");
            if (response["length"] < 1) {
              return Swal.fire({
                icon: "info",
                text: "This user is not there !!"
              });
            } else {
              console.log(response);
              Swal.fire({
                title: `${response[0].username}`,
                imageUrl: `${response[0].photo}`,
                showCancelButton: true,
                cancelButtonText: "close",
                confirmButtonText: "view profile"
              });
            }
            // else {
            //   Swal.fire({
            //     icon: "info",
            //     text: "This user is not there !!"
            //   });
            // }
          });
        // .catch(error => {
        //   Swal.showValidationMessage(`Request failed: ${error}`);
        // });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }
}
