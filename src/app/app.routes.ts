import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login.component';
import { SignupComponent } from './auth/components/signup.component';
import { AuthGuard } from "./auth/services/auth-guard.service";

export const rootRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'songs', redirectTo: 'music' },
  {
    path: 'music',
    loadChildren: "./music/music.module#MusicModule",
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'signin', component: LoginComponent
  },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },

  { path: '**', component: SignupComponent }
]; 