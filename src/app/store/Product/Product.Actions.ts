import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/Product';

// LOAD ALL PRODUCTS
export const LOAD_PRODUCTS = '[products] load products';
export const LOAD_PRODUCTS_SUCCESS = '[products] load products success';
export const LOAD_PRODUCTS_FAIL = '[products] load products fail';

export const loadProducts = createAction(
  LOAD_PRODUCTS,
  props<{ offset: number; limit: number }>()
);
export const loadProductsSuccess = createAction(
  LOAD_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);

export const loadProductsFail = createAction(
  LOAD_PRODUCTS_FAIL,
  props<{ errorMessage: string }>()
);

// LOAD PRODUCT BY ID
export const LOAD_PRODUCT_BY_ID = '[productById] load product by id';
export const LOAD_PRODUCT_BY_ID_SUCCESS =
  '[productById] load product by id success';
export const LOAD_PRODUCT_BY_ID_FAIL = '[productById] load product by id fail';

export const loadProductById = createAction(
  LOAD_PRODUCT_BY_ID,
  props<{ id: number }>()
);
export const loadProductByIdSuccess = createAction(
  LOAD_PRODUCT_BY_ID_SUCCESS,
  props<{ product: Product }>()
);

export const loadProductByIdFail = createAction(
  LOAD_PRODUCT_BY_ID_FAIL,
  props<{ errorMessage: string }>()
);
