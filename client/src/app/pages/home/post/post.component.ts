import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private http: HttpClient) { }


  fileData: File = null;

  ngOnInit() {
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.http.post('http://localhost:3000/upload', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        if (events.type == HttpEventType.UploadProgress) {
          console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
        } else if (events.type === HttpEventType.Response) {
          console.log(events);
        }
      })
  }

}