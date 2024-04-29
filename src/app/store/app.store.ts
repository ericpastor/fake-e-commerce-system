import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Product, ProductByIdModel, ProductModel } from '../models/Product';
import {
  addProductReducer,
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
import { UserByIdModel, UserModel } from '../models/User';
import { userByIdReducer, userReducer } from './User/User.Reducer';

export interface AppState {
  addProduct: ProductModel;
  allProducts: ProductModel;
  productsWithPagination: ProductModel;
  productById: ProductByIdModel;
  categories: CategoryModel;
  categoryById: CategoryByIdModel;
  users: UserModel;
  userById: UserByIdModel;
  cartItems: CartModel;
}

export const appReducers: ActionReducerMap<AppState> = {
  addProduct: addProductReducer,
  allProducts: allProducts,
  productsWithPagination: productsWithPaginationReducer,
  productById: productByIdReducer,
  categories: categoryReducer,
  categoryById: categoryByIdReducer,
  users: userReducer,
  userById: userByIdReducer,
  cartItems: cartReducer,
};
