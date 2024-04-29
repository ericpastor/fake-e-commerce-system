import { Store, createReducer, on } from '@ngrx/store';
import {
  productByIdState,
  productInitialState,
  productState,
} from './Product.State';
import {
  addProduct,
  addProductFail,
  addProductSuccess,
  loadAllProductsFail,
  loadAllProductsSuccess,
  loadProductByIdFail,
  loadProductByIdSuccess,
  loadProductsWithPaginationFail,
  loadProductsWithPaginationSuccess,
} from './Product.Actions';

import { Product } from '../../models/Product';

export const allProducts = createReducer(
  productState,
  on(loadAllProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
      errorMessage: '',
    };
  }),

  on(loadAllProductsFail, (state, action) => {
    return {
      ...state,
      products: [],
      errorMessage: action.errorMessage,
    };
  })
);

export const productsWithPaginationReducer = createReducer(
  productState,
  on(loadProductsWithPaginationSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
      errorMessage: '',
    };
  }),

  on(loadProductsWithPaginationFail, (state, action) => {
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

export const addProductReducer = createReducer(
  productState,
  on(addProduct, (state) => ({
    ...state,
    error: null,
  })),

  on(addProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    error: null,
  })),

  on(addProductFail, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
  }))
);
