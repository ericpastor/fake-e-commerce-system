import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductModel } from '../../models/Product';

const getProductState = createFeatureSelector<ProductModel>('products');

export const getAllProducts = createSelector(getProductState, (state) => {
  return state.products;
});
