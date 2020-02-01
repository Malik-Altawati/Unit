import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  getPosts() {
    return this._http.post("http://localhost:5000/posts/get", { user_id: "4" });
  }
}
