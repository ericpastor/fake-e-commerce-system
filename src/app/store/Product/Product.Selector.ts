import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product, ProductByIdModel, ProductModel } from '../../models/Product';

const addProductState = createFeatureSelector<Product>('addProduct');

const getProductState = createFeatureSelector<ProductModel>('allProducts');

const getProductStateWithPagination = createFeatureSelector<ProductModel>(
  'productsWithPagination'
);
const getProductByIdState =
  createFeatureSelector<ProductByIdModel>('productById');

export const addProduct = createSelector(addProductState, (state) => {
  return state;
});

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
