import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductByIdModel, ProductModel } from '../../models/Product';

const getProductState = createFeatureSelector<ProductModel>('allProducts');

const getProductStateWithPagination = createFeatureSelector<ProductModel>(
  'productsWithPagination'
);
const getProductByIdState =
  createFeatureSelector<ProductByIdModel>('productById');

export const getAllProducts = createSelector(getProductState, (state) => {
  return state;
});

export const getAllProductsWithPagination = createSelector(
  getProductStateWithPagination,
  (state) => {
    return state.products;
  }
);

export const getProductById = createSelector(getProductByIdState, (state) => {
  return state.product;
});
