import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotUsernameComponent } from './forgot-username/forgot-username.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';

import { AdminGuard } from './admin.guard';
import { UserGuard } from './user.guard';
import { NotLoggedInGuard } from './not-logged-in-guard.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full' 
  },
  {
    path: "register", component: RegisterComponent, canActivate: [NotLoggedInGuard] 
  },
  {
    path: "login", component: LoginComponent, canActivate: [NotLoggedInGuard] 
  },
  { 
    path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard], data: { role: 'Admin' }
  },
  { 
    path: 'user-dashboard', component: UserDashboardComponent, canActivate: [UserGuard] 
  },
  { 
    path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [NotLoggedInGuard]
  },
  { 
    path: 'forgot-username', component: ForgotUsernameComponent, canActivate: [NotLoggedInGuard]
  },
  { 
    path: 'add-movie', component: AddMovieComponent, canActivate: [AdminGuard]
  },
  {
    path: 'book-ticket',
    component: BookTicketComponent,
    canActivate: [UserGuard] 
  }
  
  

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })], // Set the option here
  exports: [RouterModule]
})
export class AppRoutingModule { }