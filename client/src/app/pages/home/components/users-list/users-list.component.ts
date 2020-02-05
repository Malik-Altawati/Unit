import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "src/app/http.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  userProfile: any;

  constructor(
    private _http: HttpService,
    private router: Router,
    private http: HttpClient
  ) {}

  @Input() users: any;

  ngOnInit() {
    this._http.newUser.subscribe(data => {
      this.users = data;
    });
  }
}
