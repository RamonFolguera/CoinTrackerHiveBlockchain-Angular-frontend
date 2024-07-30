import { Routes } from '@angular/router';
import { TokensComponent } from './tokens/tokens.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
  { path: 'tokens', component: TokensComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
