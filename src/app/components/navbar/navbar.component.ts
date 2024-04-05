import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { SearchComponent } from '../search/search.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  private authService = inject(AuthService);
  private router = inject(Router);

  public loggedIn(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
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
