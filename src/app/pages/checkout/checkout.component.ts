import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from '../../models/CartItem';
import {
  emptyTheCart,
  loadItems,
  removeFromCart,
} from '../../store/Cart/Cart.Actions';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { getItems } from '../../store/Cart/Cart.Selector';

@Component({
  selector: 'checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  public deliveryInfoFilled = false;
  public items: CartItem[] = [];

  private store = inject(Store);

  deliveryInfoForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  paymentForm = new FormGroup({
    nameInCard: new FormControl('', [Validators.required]),
    cardNumber: new FormControl(null, [Validators.required]),
    expireDate: new FormControl('', [Validators.required]),
    cvc: new FormControl('', [Validators.required]),
  });

  get firstName() {
    return this.deliveryInfoForm.get('firstName');
  }
  get lastName() {
    return this.deliveryInfoForm.get('lastName');
  }
  get address() {
    return this.deliveryInfoForm.get('address');
  }
  get postalCode() {
    return this.deliveryInfoForm.get('postalCode');
  }
  get city() {
    return this.deliveryInfoForm.get('city');
  }
  get country() {
    return this.deliveryInfoForm.get('country');
  }
  get phone() {
    return this.deliveryInfoForm.get('phone');
  }
  get nameInCard() {
    return this.paymentForm.get('nameInCard');
  }
  get cardNumber() {
    return this.paymentForm.get('cardNumber');
  }
  get expireDate() {
    return this.paymentForm.get('expireDate');
  }
  get cvc() {
    return this.paymentForm.get('cvc');
  }

  getItemsInCart() {
    this.store.dispatch(loadItems());
    this.store.select(getItems).subscribe((response) => {
      this.items = response;
      console.log(this.items);
    });
  }

  onSubmitDeliveryInfo(event: Event) {
    event.preventDefault();
    this.deliveryInfoFilled = true;
  }

  onProceedToPay(event: Event) {
    event.preventDefault();
    if (this.deliveryInfoFilled) {
      this.store.dispatch(emptyTheCart({ cartItems: this.items }));
      alert('Fake payment done! Check the cart if is empty!');
    }
    if (!this.deliveryInfoFilled) {
      alert('hola');
    }
  }
  removeItem(item: CartItem) {
    this.store.dispatch(removeFromCart({ cartItem: item }));
  }
}
