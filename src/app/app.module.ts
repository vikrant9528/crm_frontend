import { NgModule } from '@angular/core';
import { BrowserModule , HammerModule ,HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LeadAddComponent } from './leads/lead-add/lead-add.component';
import { LeadListComponent } from './leads/lead-list/lead-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserAddComponent } from './leads/user-add/user-add.component';
import { AuthInterceptor } from './auth.interceptor';
import { SignupComponent } from './common/signup/signup.component';
import { LoginComponent } from './common/login/login.component';
import { LeadPipelineComponent } from './leads/lead-pipeline/lead-pipeline.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalComponent } from './leads/modal/modal.component';
import { IndianNumberPipe } from './leads/indian-number.pipe';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FollowupComponent } from './leads/followup/followup.component';
import { MyHammerConfig } from './hammer.config';



@NgModule({
declarations: [AppComponent, LeadAddComponent, LeadListComponent, UserAddComponent, SignupComponent, LoginComponent, LeadPipelineComponent, ModalComponent, IndianNumberPipe, NavbarComponent, FollowupComponent],
imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule , HttpClientModule ,   DragDropModule , HammerModule],
providers: [
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
],
bootstrap: [AppComponent]
})
export class AppModule {}