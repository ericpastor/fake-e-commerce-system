import { createReducer, on } from '@ngrx/store';
import { productState } from './Product.State';
import { loadProductsFail, loadProductsSuccess } from './Product.Actions';

const productReducer = createReducer(
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

export function ProductReducer(state: any, action: any) {
  return productReducer(state, action);
}
