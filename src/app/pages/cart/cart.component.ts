import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  decrementQuantity,
  incrementQuantity,
  loadItems,
  removeFromCart,
} from '../../store/Cart/Cart.Actions';
import { getItems } from '../../store/Cart/Cart.Selector';
import { CartItem } from '../../models/CartItem';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LatestProductsComponent } from '../../components/latest-products/latest-products.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CheckoutComponent } from '../../components/checkout/checkout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NavbarComponent,
    MatDividerModule,
    LatestProductsComponent,
    CheckoutComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  public checkoutIsvisible = false;
  public shipmentPrice!: number;
  public items: CartItem[] = [];
  public targetId!: string;

  private store = inject(Store);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.getItemsInCart();
  }

  getItemsInCart() {
    this.store.dispatch(loadItems());
    this.store.select(getItems).subscribe((response) => {
      this.items = response;
      console.log(this.items);
    });
  }

  incrementQuantity(item: CartItem) {
    this.store.dispatch(incrementQuantity({ cartItem: item }));
  }

  decrementQuantity(item: CartItem) {
    this.store.dispatch(decrementQuantity({ cartItem: item }));
  }

  removeItem(item: CartItem) {
    this.store.dispatch(removeFromCart({ cartItem: item }));
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      if (item && item.product && item.quantity) {
        return acc + item.product.price * item.quantity;
      } else {
        return acc;
      }
    }, 0);
  }

  getTotalPlusShipment() {
    if (typeof this.shipmentPrice === 'number') {
      return this.getTotal() + this.shipmentPrice;
    } else {
      return this.getTotal() + 0;
    }
  }

  getQuantityOfItems() {
    return this.items.reduce((acc, item) => {
      if (item && item.product && item.quantity && item.quantity > 0) {
        return acc + item.quantity;
      } else {
        return acc;
      }
    }, 0);
  }

  getShipmentPrice() {
    if (this.authService.isLoggedIn()) {
      return (this.shipmentPrice = 0);
    } else {
      return (this.shipmentPrice = 5);
    }
  }

  gotToCheckout(targetId: string) {
    this.checkoutIsvisible = true;
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }

  cleanString(str: string) {
    str = str.replace(/\\/g, '');
    str = str.replace(/"/g, '');
    str = str.replace(/\[/g, '');
    str = str.replace(/\]/g, '');
    return str;
  }

  urlChecking(array: string[], positonInArray: number): boolean {
    if (
      this.cleanString(array[positonInArray]).startsWith('http') &&
      (this.cleanString(array[positonInArray]).includes('jpg') ||
        this.cleanString(array[positonInArray]).includes('jpeg') ||
        this.cleanString(array[positonInArray]).includes('png') ||
        this.cleanString(array[positonInArray]).includes('image'))
    ) {
      return true;
    }
    return false;
  }
}
