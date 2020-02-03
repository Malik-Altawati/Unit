import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss']
})
export class InfoSectionComponent implements OnInit {


  constructor(private _http: HttpClient) { }
  user_id: string = localStorage.getItem('user_id')
  username: string;
  email: string;
  age: string;
  bio: string;
  gender: string;
  photo: string;
  ngOnInit() {
    this._http.post("http://localhost:5000/findById", { user_id: this.user_id }).subscribe(data => {
      console.log(data)
      this.username = data[0]["username"]
      this.age = data[0]["age"]
      this.email = data[0]["email"]
      this.bio = data[0]["bio"]
      this.gender = data[0]["gender"]
      this.photo = data[0]["photo"]
    })
  }
}
