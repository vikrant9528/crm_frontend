import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadAddComponent } from './leads/lead-add/lead-add.component';
import { LeadListComponent } from './leads/lead-list/lead-list.component';
import { SignupComponent } from './common/signup/signup.component';
import { LoginComponent } from './common/login/login.component';
import { FollowupComponent } from './leads/followup/followup.component';
import { authGuard } from './auth/auth.guard';
const routes: Routes = [
  { path: '', component: FollowupComponent ,canActivate:[authGuard]},
  { path: 'signup' , component: SignupComponent},
  { path: 'login', component: LoginComponent },
  { path: 'leads/add', component: LeadAddComponent ,canActivate:[authGuard] },
  { path: 'leads', component: LeadListComponent , canActivate:[authGuard] },
  { path: 'followups', component: FollowupComponent , canActivate:[authGuard] },
  {path:'**',component:LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }