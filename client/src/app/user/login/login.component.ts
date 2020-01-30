import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = [];
  notifyMessage = "";
  token = "";
  x = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", Validators.required]
    });
  }

  isInvalidForm(fieldName): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }
  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  login() {
    this.http
      .post("http://localhost:5000/login", this.loginForm.value)
      .subscribe(data => {
        localStorage.setItem("user_id", data["payload"]["id"]);
        localStorage.setItem("email", data["payload"]["email"]);
        localStorage.setItem("token", data["token"]);
        localStorage.setItem("refreshtoken", data["refreshToken"]);

        if (data["success"]) {
          this.token = data["token"];
          this.router.navigate(["home"]);
        } else {
          alert(data["error"]);
        }
      });
  }

  loggedIn() {
    // return !!localStorage.getItem("token");
    if (localStorage.getItem("token")) {
      this.x = localStorage.getItem("token");
    }
    return this.http
      .post("http://localhost:5000/auth", {
        token: this.x
      })
      .subscribe(data => {
        console.log("hi");

        console.log(data, "this is the data we get");
        if (data === "token verified") {
          return true;
        } else {
          return false;
        }
      });
  }
}
