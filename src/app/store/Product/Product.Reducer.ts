import { createReducer, on } from '@ngrx/store';
import {
  productByIdState,
  productInitialState,
  productState,
} from './Product.State';
import {
  loadProductByIdFail,
  loadProductByIdSuccess,
  loadProductsFail,
  loadProductsSuccess,
} from './Product.Actions';

export const productReducer = createReducer(
  productState,
  on(loadProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
      errorMessage: '',
    };
  }),

  on(loadProductsFail, (state, action) => {
    return {
      ...state,
      products: [],
      errorMessage: action.errorMessage,
    };
  })
);

export const productByIdReducer = createReducer(
  productByIdState,
  on(loadProductByIdSuccess, (state, action) => {
    return {
      ...state,
      product: action.product,
      errorMessage: '',
    };
  }),

  on(loadProductByIdFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  })
);
