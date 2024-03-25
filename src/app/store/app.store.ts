import { ActionReducerMap } from '@ngrx/store';
import { ProductByIdModel, ProductModel } from '../models/Product';
import {
  allProducts,
  productByIdReducer,
  productsWithPaginationReducer,
} from './Product/Product.Reducer';
import { CategoryByIdModel, CategoryModel } from '../models/Category';
import {
  categoryByIdReducer,
  categoryReducer,
} from './Category/Category.Reducer';

export interface AppState {
  allProducts: ProductModel;
  productsWithPagination: ProductModel;
  productById: ProductByIdModel;
  categories: CategoryModel;
  categoryById: CategoryByIdModel;
}

export const appReducers: ActionReducerMap<AppState> = {
  allProducts: allProducts,
  productsWithPagination: productsWithPaginationReducer,
  productById: productByIdReducer,
  categories: categoryReducer,
  categoryById: categoryByIdReducer,
};
