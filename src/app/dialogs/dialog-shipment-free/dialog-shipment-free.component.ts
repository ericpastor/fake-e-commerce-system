import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'dialog-shipment-free',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './dialog-shipment-free.component.html',
  styleUrl: './dialog-shipment-free.component.scss',
})
export class DialogShipmentFreeComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  public loggedIn(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
