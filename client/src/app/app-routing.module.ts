import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './pages/home/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  { path: 'post', component: PostComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
