import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/Product';

// LOAD ALL PRODUCTS
export const LOAD_ALL_PRODUCTS = '[allProducts] load products';
export const LOAD_ALL_PRODUCTS_SUCCESS = '[allProducts] load products success';
export const LOAD_ALL_PRODUCTS_FAIL = '[allProducts] load products fail';

export const loadAllProducts = createAction(LOAD_ALL_PRODUCTS);

export const loadAllProductsSuccess = createAction(
  LOAD_ALL_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);

export const loadAllProductsFail = createAction(
  LOAD_ALL_PRODUCTS_FAIL,
  props<{ errorMessage: string }>()
);

// LOAD PRODUCTS WITH PAGINATION
export const LOAD_PRODUCTS_WITH_PAGINATION =
  '[productsWithPagination] load products';
export const LOAD_PRODUCTS_WITH_PAGINATION_SUCCESS =
  '[productsWithPagination] load products with pagination success';
export const LOAD_PRODUCTS_WITH_PAGINATION_FAIL =
  '[productsWithPagination] load products with pagination fail';

export const loadProductsWithPagination = createAction(
  LOAD_PRODUCTS_WITH_PAGINATION,
  props<{ offset: number; limit: number }>()
);
export const loadProductsWithPaginationSuccess = createAction(
  LOAD_PRODUCTS_WITH_PAGINATION_SUCCESS,
  props<{ products: Product[] }>()
);

export const loadProductsWithPaginationFail = createAction(
  LOAD_PRODUCTS_WITH_PAGINATION_FAIL,
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
