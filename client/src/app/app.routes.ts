import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent }
];
