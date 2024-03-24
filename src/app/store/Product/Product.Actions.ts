import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/Product';

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
