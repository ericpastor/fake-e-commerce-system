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
import { User } from '../../models/User';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public userProfile!: User;

  private authService = inject(AuthService);
  private router = inject(Router);
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

  login(event: Event) {
    event.preventDefault();
    this.authService
      .login({
        email: this.email!.value!,
        password: this.password!.value!,
      })
      .subscribe(() => {
        this.authService.getProfile().subscribe((res) => {
          this.userProfile = res as User;
        });
        this.showSuccess();
        this.router.navigate(['/']);
      });
  }

  showSuccess() {
    this.toastr.info(
      `Nice to see you again, ${this.userProfile.name}!`,
      'Logged in!'
    );
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
