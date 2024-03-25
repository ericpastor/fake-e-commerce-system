import { Product, ProductByIdModel, ProductModel } from '../../models/Product';

export const productState: ProductModel = {
  products: [],
  errorMessage: '',
};

export const productByIdState: ProductByIdModel = {
  product: {
    title: '',
    price: 0,
    description: '',
    images: [],
    categoryId: 0,
  },
  errorMessage: '',
};

export const productInitialState = {
  title: '',
  price: 0,
  description: '',
  images: [],
  categoryId: 0,
};
