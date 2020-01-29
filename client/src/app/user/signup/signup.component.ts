import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errors: any = [];
  notifyMessage = "";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      if (params.registered === "success") {
        this.notifyMessage = "You have been successfully registered";
      }
    });
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }
  isInvalidForm(fieldName): boolean {
    return (
      this.signupForm.controls[fieldName].invalid &&
      (this.signupForm.controls[fieldName].dirty ||
        this.signupForm.controls[fieldName].touched)
    );
  }
  isRequired(fieldName): boolean {
    return this.signupForm.controls[fieldName].errors.required;
  }

  signup() {
    this.http.post("signup", {}).subscribe(data => {
      console.log(data);
    });
    console.log(this.signupForm.value);
  }
}
