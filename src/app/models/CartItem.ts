import { Product } from './Product';

export interface CartItem {
  quantity: number;
  product: Product;
}
export interface CartModel {
  cartItems: CartItem[];
  errorMessage: string;
}
