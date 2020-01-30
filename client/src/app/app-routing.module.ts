import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { LandingPageComponent } from "./pages/landingPage/landing-page/landing-page.component";
import { SignupComponent } from "./user/signup/signup.component";
import { PostComponent } from "./pages/home/post/post.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  { path: "signUp", component: SignupComponent },
  { path: "post", component: PostComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
