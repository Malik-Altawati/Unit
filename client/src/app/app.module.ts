import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostComponent } from './pages/home/post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoSectionComponent } from './pages/profile/info-section/info-section.component';
import { PostsSectionComponent } from './pages/profile/posts-section/posts-section.component';
import { EditComponent } from './pages/profile/edit/edit.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NavComponent,
    FooterComponent,
    PostComponent,
    InfoSectionComponent,
    PostsSectionComponent,
    EditComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
