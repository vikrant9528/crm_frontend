import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadAddComponent } from './leads/lead-add/lead-add.component';
import { LeadListComponent } from './leads/lead-list/lead-list.component';
import { SignupComponent } from './common/signup/signup.component';
import { LoginComponent } from './common/login/login.component';
import { FollowupComponent } from './leads/followup/followup.component';
const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'leads/add', component: LeadAddComponent },
  { path: 'leads', component: LeadListComponent },
  { path: 'followups', component: FollowupComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }