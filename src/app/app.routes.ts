import { Routes } from '@angular/router';
import { TokensComponent } from './tokens/tokens.component';

export const routes: Routes = [
  { path: 'tokens', component: TokensComponent },
  { path: '', redirectTo: '/tokens', pathMatch: 'full' }
];
