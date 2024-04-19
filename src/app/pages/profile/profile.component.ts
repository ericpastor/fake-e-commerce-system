import { Component, OnInit, inject } from '@angular/core';
import { User, UserByIdModel } from '../../models/User';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../store/User/User.Actions';
import { getAllUsers, getUserById } from '../../store/User/User.Selector';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PlaceholderProfileComponent } from '../../placeholders/placeholder-profile/placeholder-profile.component';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [PlaceholderProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public userProfile!: User;

  private service = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.service.getProfile().subscribe((res) => {
      this.userProfile = res as User;
    });
  }

  goHome() {
    this.router.navigate(['']);
  }
}
