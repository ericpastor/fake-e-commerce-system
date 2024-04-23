import { CanActivateFn, Router } from '@angular/router';
import { Role, User } from '../models/User';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const admin: Role = Role.ADMIN;

  const getProfile = () => {
    let userProfile: User = {
      name: '',
      role: Role.CUSTOMER,
      email: '',
      password: '',
      avatar: '',
    };
    authService.getProfile().subscribe((res) => {
      userProfile = res as User;
    });
    return userProfile.role;
  };

  if (!authService.isLoggedIn() && getProfile() !== admin) {
    router.navigate(['/**']);
    return false;
  }

  return true;
};
