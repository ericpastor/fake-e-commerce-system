import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/Product';
import { CartItem } from '../../models/CartItem';

//ADD TO CART
export const ADD_TO_CART = '[addToCart] Add a product to cart';
export const ADD_TO_CART_SUCCESS = '[addToCart] Add a product to cart success';
export const ADD_TO_CART_FAIL = '[addToCart] Add a product to cart fail';

export const addToCart = createAction(
  ADD_TO_CART,
  props<{ product: Product }>()
);
export const addToCartSuccsess = createAction(
  ADD_TO_CART_SUCCESS,
  props<{ product: Product }>()
);
export const addToCartFail = createAction(
  ADD_TO_CART_FAIL,
  props<{ errorMessage: string }>()
);

//REMOVE FROM CART
export const REMOVE_FROM_CART = '[removeFromCart] Remove a product from cart';
export const REMOVE_FROM_CART_SUCCESS =
  '[removeFromCart] Remove a product from cart success';
export const REMOVE_FROM_CART_FAIL =
  '[removeFromCart] Remove a product from cart fail';

export const removeFromCart = createAction(
  REMOVE_FROM_CART,
  props<{ cartItem: CartItem }>()
);
export const removeFromCartSuccess = createAction(
  REMOVE_FROM_CART_SUCCESS,
  props<{ cartItem: CartItem }>()
);
export const removeFromCartFail = createAction(
  REMOVE_FROM_CART_FAIL,
  props<{ errorMessage: string }>()
);

//EMPTY THE CART
export const EMPTY_THE_CART = '[emptyTheCart] Empty the cart';
export const EMPTY_THE_CART_SUCCESS = '[emptyTheCart] Empty the cart success';
export const EMPTY_THE_CART_FAIL = '[emptyTheCart] Empty the cart fail';

export const emptyTheCart = createAction(
  EMPTY_THE_CART,
  props<{ cartItems: CartItem[] }>()
);
export const emptyTheCartSuccess = createAction(
  EMPTY_THE_CART_SUCCESS,
  props<{ cartItems: CartItem[] }>()
);
export const emptyTheCartFail = createAction(
  EMPTY_THE_CART_FAIL,
  props<{ errorMessage: string }>()
);

//INCREMENT QUANTITY ITEM
export const INCREMENT_QUANTITY = '[incrementQuantity] Increment quantity item';
export const INCREMENT_QUANTITY_SUCCESS =
  '[incrementQuantity] Increment quantity item success';
export const INCREMENT_QUANTITY_FAIL =
  '[incrementQuantity] Increment quantity item fail';

export const incrementQuantity = createAction(
  INCREMENT_QUANTITY,
  props<{ cartItem: CartItem }>()
);
export const incrementQuantitySuccess = createAction(
  INCREMENT_QUANTITY_SUCCESS,
  props<{ cartItem: CartItem }>()
);
export const incrementQuantityFail = createAction(
  INCREMENT_QUANTITY_FAIL,
  props<{ errorMessage: string }>()
);

//DECREMENT QUANTITY ITEM
export const DECREMENT_QUANTITY = '[decrementQuantity] decrement quantity item';
export const DECREMENT_QUANTITY_SUCCESS =
  '[decrementQuantity] decrement quantity item success';
export const DECREMENT_QUANTITY_FAIL =
  '[decrementQuantity] decrement quantity item fail';

export const decrementQuantity = createAction(
  DECREMENT_QUANTITY,
  props<{ cartItem: CartItem }>()
);
export const decrementQuantitySuccess = createAction(
  DECREMENT_QUANTITY_SUCCESS,
  props<{ cartItem: CartItem }>()
);
export const decrementQuantityFail = createAction(
  DECREMENT_QUANTITY_FAIL,
  props<{ errorMessage: string }>()
);

//LOAD ALL ITEMS IN CART
export const LOAD_ITEMS = '[items] load items';
export const LOAD_ITEMS_SUCCESS = '[items] load items success';
export const LOAD_ITEMS_FAIL = '[items] load items fail';

export const loadItems = createAction(LOAD_ITEMS);
export const loadItemsSuccess = createAction(
  LOAD_ITEMS_SUCCESS,
  props<{ cartItems: CartItem[] }>()
);

export const loadItemsFail = createAction(
  LOAD_ITEMS_FAIL,
  props<{ errorMessage: string }>()
);
