import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  getPosts() {
    return this._http.get("http://localhost:5000/getAllPosts");
  }
  getAllUsers() {
    return this._http.get("http://localhost:5000/getAllUsers");
  }
}
