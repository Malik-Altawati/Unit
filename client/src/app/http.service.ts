import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  newPost: Subject<object> = new Subject();
  constructor(private _http: HttpClient) {}

  getAllPosts() {
    return this._http.get("http://localhost:5000/getAllPosts");
  }

  getAllUsers() {
    return this._http.get("http://localhost:5000/getAllUsers");
  }
}
