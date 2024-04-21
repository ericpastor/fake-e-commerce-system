import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  private toastr = inject(ToastrService);

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

  showSuccess() {
    this.toastr.info('Nice to see you again!', 'Logged in!');
  }

  login(event: Event) {
    event.preventDefault();
    this.authService
      .login({
        email: this.email!.value!,
        password: this.password!.value!,
      })
      .subscribe(() => {
        this.showSuccess();
        this.router.navigate(['/']);
      });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
