import { ActionReducerMap } from '@ngrx/store';
import { ProductByIdModel, ProductModel } from '../models/Product';
import { productByIdReducer, productReducer } from './Product/Product.Reducer';
import { CategoryByIdModel, CategoryModel } from '../models/Category';
import {
  categoryByIdReducer,
  categoryReducer,
} from './Category/Category.Reducer';

export interface AppState {
  products: ProductModel;
  productById: ProductByIdModel;
  categories: CategoryModel;
  categoryById: CategoryByIdModel;
}

export const appReducers: ActionReducerMap<AppState> = {
  products: productReducer,
  productById: productByIdReducer,
  categories: categoryReducer,
  categoryById: categoryByIdReducer,
};
