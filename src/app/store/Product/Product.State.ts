import { ProductByIdModel, ProductModel } from '../../models/Product';

export const productInitialState = {
  title: '',
  price: 0,
  description: '',
  images: [],
  categoryId: 0,
};

export const productState: ProductModel = {
  products: [],
  errorMessage: '',
};

export const productByIdState: ProductByIdModel = {
  product: productInitialState,
  errorMessage: '',
};
