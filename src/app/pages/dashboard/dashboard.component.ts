import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { Role, User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from '../../dialogs/dialog-add-product/dialog-add-product.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addProduct } from '../../store/Product/Product.Actions';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    SearchComponent,
    MatBadgeModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public userProfile!: User;
  public admin = Role.ADMIN;

  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  goHome() {
    this.router.navigate(['/']);
  }

  openAddProduct() {
    this.dialog.open(DialogAddProductComponent);
  }

  public logout() {
    this.userProfile = {
      name: '',
      role: Role.CUSTOMER,
      avatar: '',
      email: '',
      password: '',
    };
    this.authService.logout();
    this.router.navigate(['/']);
    this.toastr.info('Good Bye!', 'Logged out!');
  }
}
