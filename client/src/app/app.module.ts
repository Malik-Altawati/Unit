import { HTTP_INTERCEPTORS } from "@angular/common/http"; // use this
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./user/login/login.component";
import { NavComponent } from "./components/nav/nav.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PostComponent } from "./pages/home/post/post.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SignupComponent } from "./user/signup/signup.component";
import { LandingPageComponent } from "./pages/landingPage/landing-page/landing-page.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatIconModule } from "@angular/material/icon";
import { AuthGuard } from "./auth.guard";
import { EditComponent } from "./pages/profile/edit/edit.component";
import { InfoSectionComponent } from "./pages/profile/info-section/info-section.component";
import { PostsSectionComponent } from "./pages/profile/posts-section/posts-section.component";
import { HttpRequestInterceptor } from "./HttpRequestInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    PostComponent,
    ProfileComponent,
    SignupComponent,
    LandingPageComponent,
    EditComponent,
    InfoSectionComponent,
    PostsSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    NgbModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatIconModule
  ],
  providers: [
    LoginComponent,
    AuthGuard,

    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptor,
        multi: true
      }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
