export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
  creationAt?: Date;
}

export interface ProductModel {
  products: Product[];
  errorMessage: string;
}

export interface ProductByIdModel {
  product: Product;
  errorMessage: string;
}
