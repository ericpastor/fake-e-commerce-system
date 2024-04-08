import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
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
import { CartModel } from '../models/CartItem';
import { cartReducer } from './Cart/Cart.Reducer';

export interface AppState {
  allProducts: ProductModel;
  productsWithPagination: ProductModel;
  productById: ProductByIdModel;
  categories: CategoryModel;
  categoryById: CategoryByIdModel;
  cartItems: CartModel;
}

export const appReducers: ActionReducerMap<AppState> = {
  allProducts: allProducts,
  productsWithPagination: productsWithPaginationReducer,
  productById: productByIdReducer,
  categories: categoryReducer,
  categoryById: categoryByIdReducer,
  cartItems: cartReducer,
};
