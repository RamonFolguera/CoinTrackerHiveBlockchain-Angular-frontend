import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokensComponent } from './tokens/tokens.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TokensComponent,
    LoginComponent 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hive Token Tracker';
}
