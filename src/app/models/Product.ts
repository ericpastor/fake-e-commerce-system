export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface ProductModel {
  products: Product[];
  errorMessage: string;
}
