import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartModel } from '../../models/CartItem';

const getItemState = createFeatureSelector<CartModel>('cartItems');

export const getItems = createSelector(getItemState, (state) => {
  return state.cartItems;
});
