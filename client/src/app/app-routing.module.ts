import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/user/login/login.component";
import { LandingPageComponent } from "./pages/landingPage/landing-page/landing-page.component";
import { SignupComponent } from "./pages/user/signup/signup.component";
import { PostComponent } from "./pages/home/components/post/post.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./auth.guard";
import { ProfileComponent } from "./pages/profile/profile.component";
import { EditComponent } from "./pages/profile/edit/edit.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { ChatComponent } from "./chat/chat.component";
import { ChatroomComponent } from "./chatroom/chatroom.component";
const routes: Routes = [
  {
    path: "",
    component: localStorage.token ? HomeComponent : LandingPageComponent
  },
  { path: "login", component: LoginComponent },
  { path: "signUp", component: SignupComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "post", component: PostComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "users/:id",
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: "edit", component: EditComponent, canActivate: [AuthGuard] },
  { path: "chat", component: ChatComponent },
  { path: "chatroom", component: ChatroomComponent },
  { path: "**", component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
