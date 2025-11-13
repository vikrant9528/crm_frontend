import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LeadAddComponent } from './leads/lead-add/lead-add.component';
import { LeadListComponent } from './leads/lead-list/lead-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { SignupComponent } from './common/signup/signup.component';
import { LoginComponent } from './common/login/login.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalComponent } from './leads/modal/modal.component';
import { IndianNumberPipe } from './leads/indian-number.pipe';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FollowupComponent } from './leads/followup/followup.component';
import { MyHammerConfig } from './hammer.config';
import { LoaderComponent } from './leads/loader/loader.component';
import { SnackComponent } from './leads/snack.component';
import { CdkVirtualScrollableElement } from "@angular/cdk/scrolling";
import { WebcamModule } from 'ngx-webcam';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';





@NgModule({
  declarations: [AppComponent, LeadAddComponent, LeadListComponent, SignupComponent, LoginComponent, ModalComponent, IndianNumberPipe, NavbarComponent, FollowupComponent, LoaderComponent, SnackComponent, DashboardComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule, DragDropModule, HammerModule, CdkVirtualScrollableElement, WebcamModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }