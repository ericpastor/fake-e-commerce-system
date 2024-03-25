import { ActionReducerMap } from '@ngrx/store';
import { ProductByIdModel, ProductModel } from '../models/Product';
import { productByIdReducer, productReducer } from './Product/Product.Reducer';

export interface AppState {
  products: ProductModel;
  productById: ProductByIdModel;
}

export const appReducers: ActionReducerMap<AppState> = {
  products: productReducer,
  productById: productByIdReducer,
};
