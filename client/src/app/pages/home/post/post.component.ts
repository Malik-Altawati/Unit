import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type.split("/")[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);

    if (mimeType == "video") {
      reader.onload = (_event) => {
        this.previewUrl = "https://cdn4.iconfinder.com/data/icons/social-messaging-productivity-1/128/play-icon-2-512.png";
      }
    } else if (mimeType == "image") {
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
      }
    } else if (mimeType == "audio") {
      reader.onload = (_event) => {
        this.previewUrl = "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/volume-24-512.png";
      }
    }

    // var reader = new FileReader();
    // reader.readAsDataURL(this.fileData);

  }
  onSubmit() {
    const formData = new FormData();

    if (!this.fileData) {
      return alert("you have to post something")
    }
    var type = this.fileData.type.split("/")[0]
    var size = this.fileData.size

    if (size > 10000000 && type === "video") {
      return alert(` your ${type} cant be bigger than 10MB`)
    }
    if (size > 3000000 && type === "audio") {
      return alert(` your ${type} cant be bigger than 3MB`)
    }
    if (size > 5000000 && type === "image") {
      return alert(` your ${type} cant be bigger than 5MB`)
    }
    if (type !== 'image' && type !== 'video' && type !== 'audio') {
      return alert(" You can only post images / videos and audios")
    }

    formData.append('files', this.fileData); // here we pass the file
    formData.append("user_id", "123")  // here we pass user id 
    formData.append("post_text", "hello world") // here we pass post text
    formData.append("type", this.fileData.type) // here we pass data type

    this.fileUploadProgress = '0%';

    this.http.post('http://localhost:5000/posts/post', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          console.log(this.fileUploadProgress);
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          console.log(events.body);
          alert('SUCCESS !!');
        }
      })
  }
}
