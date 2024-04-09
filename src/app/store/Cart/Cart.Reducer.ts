import {
  ActionReducer,
  INIT,
  MetaReducer,
  UPDATE,
  createReducer,
  on,
} from '@ngrx/store';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  loadItemsFail,
  loadItemsSuccess,
  removeFromCart,
} from './Cart.Actions';
import { cartInitialState } from './Cart.State';
import { CartModel } from '../../models/CartItem';
import { AppState } from '../app.store';
import { environment } from '../../../environments/environment.development';

export const cartReducer = createReducer(
  cartInitialState,
  on(loadItemsSuccess, (state, action) => {
    return {
      ...state,
      cartItems: action.cartItems,
      errorMessage: '',
    };
  }),

  on(loadItemsFail, (state, action) => {
    return {
      ...state,
      cartItems: [],
      errorMessage: action.errorMessage,
    };
  }),

  on(addToCart, (state, action) => {
    const cartItemExist = state.cartItems.find(
      (item) => item.product.id === action.product.id
    );

    if (cartItemExist) {
      const updatedCartItems = state.cartItems.map((item) =>
        item.product.id === action.product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cartItems: updatedCartItems };
    } else {
      const newCartItem = { quantity: 1, product: action.product };
      const newCartItems = [...state.cartItems, newCartItem];
      return { ...state, cartItems: newCartItems };
    }
  }),

  on(removeFromCart, (state, action) => {
    const cartItemToRemove = action.cartItem.product.id;
    if (cartItemToRemove) {
      const updatedCartItems = state.cartItems.filter(
        (cartItem) => cartItem.product.id !== cartItemToRemove
      );
      return { ...state, cartItems: updatedCartItems };
    } else {
      return state;
    }
  }),

  on(incrementQuantity, (state, action) => {
    const itemToIncrementQuantity = action.cartItem.product.id;
    if (itemToIncrementQuantity) {
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.product.id === itemToIncrementQuantity) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { ...state, cartItems: updatedCartItems };
    }
    return state;
  }),

  on(decrementQuantity, (state, action) => {
    const itemToDecrementQuantity = action.cartItem.product.id;
    if (itemToDecrementQuantity) {
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.product.id === itemToDecrementQuantity && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return { ...state, cartItems: updatedCartItems };
    }
    return state;
  })
);

export function cartItemsLocalStorageReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  let initialized = false;

  return (state: AppState | undefined, action: any) => {
    const nextState = reducer(state, action);

    const savedCartState = localStorage.getItem(environment.cartState);
    const parsedCartState: CartModel | undefined = savedCartState
      ? JSON.parse(savedCartState)
      : undefined;

    if (parsedCartState && !initialized) {
      nextState.cartItems = { ...nextState.cartItems, ...parsedCartState };
      initialized = true;
    }

    if (nextState.cartItems !== state?.cartItems) {
      localStorage.setItem(
        environment.cartState,
        JSON.stringify(nextState.cartItems)
      );
    }

    return nextState;
  };
}

export const cartItemsMetaReducer: MetaReducer<AppState> =
  cartItemsLocalStorageReducer;
