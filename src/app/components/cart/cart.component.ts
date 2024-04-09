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
import { NavbarComponent } from '../navbar/navbar.component';
import { LatestProductsComponent } from '../latest-products/latest-products.component';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NavbarComponent,
    MatDividerModule,
    LatestProductsComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  public items: CartItem[] = [];

  private store = inject(Store);

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

  getQuantityOfItems() {
    return this.items.reduce((acc, item) => {
      if (item && item.product && item.quantity && item.quantity > 0) {
        return acc + item.quantity;
      } else {
        return acc;
      }
    }, 0);
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
