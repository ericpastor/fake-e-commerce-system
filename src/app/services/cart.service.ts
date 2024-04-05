import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { CartItem } from '../models/CartItem';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];

  getCartItems(): Observable<any> {
    return of(this.cartItems);
  }
}
