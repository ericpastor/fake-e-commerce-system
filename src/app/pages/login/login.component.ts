import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User, UserToLogin } from '../../models/User';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  // user?: any;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login(event: Event) {
    event.preventDefault();
    this.authService
      .login({
        email: this.email!.value!,
        password: this.password!.value!,
      })
      .subscribe(() => {
        alert('Logged in!');
        this.router.navigate(['/']);
      });
  }
}
