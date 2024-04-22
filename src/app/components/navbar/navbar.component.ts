import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { SearchComponent } from '../search/search.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CartItem } from '../../models/CartItem';
import { loadItems } from '../../store/Cart/Cart.Actions';
import { getItems } from '../../store/Cart/Cart.Selector';
import { timeout } from 'rxjs';
import { DialogShipmentFreeComponent } from '../../dialogs/dialog-shipment-free/dialog-shipment-free.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogContactUsComponent } from '../../dialogs/dialog-contact-us/dialog-contact-us.component';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/User';

@Component({
  selector: 'navbar',
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
  animations: [
    trigger('zoomin', [
      transition('void=>*', [
        style({ transform: 'scale(0)' }),
        animate('1200ms', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NavbarComponent,
      multi: true,
    },
  ],
})
export class NavbarComponent implements ControlValueAccessor {
  public items: CartItem[] = [];
  public hidden = true;
  public targetId!: string;
  userProfile!: User;

  private store = inject(Store);
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getItemsInCart();
    this.getProfile();
  }

  getProfile() {
    this.authService.getProfile().subscribe((res) => {
      this.userProfile = res as User;
    });
  }

  openShipDialog() {
    this.dialog.open(DialogShipmentFreeComponent);
  }

  openContactUsDialog() {
    this.dialog.open(DialogContactUsComponent);
  }

  handleScroll = (targetId: string) => {
    this.goHome();
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  public loggedIn(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  getItemsInCart() {
    this.store.dispatch(loadItems());
    this.store.select(getItems).subscribe((response) => {
      this.items = response;
    });
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  getQuantityOfItems() {
    return this.items.reduce((acc, item) => {
      if (item && item.product && item.quantity && item.quantity > 0) {
        this.toggleBadgeVisibility();
        return acc + item.quantity;
      } else {
        return acc;
      }
    }, 0);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goToCart() {
    this.router.navigate(['cart']);
  }

  goToProducts() {
    this.router.navigate(['products']);
  }

  public logout() {
    this.authService.logout();
    this.toastr.info('Good Bye!', 'Logged out!');
  }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
