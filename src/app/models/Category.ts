export interface Category {
  id?: number;
  name: string;
  images: string;
  creationAt?: Date;
}

export interface CategoryModel {
  categories: Category[];
  errorMessage: string;
}

export interface CategoryByIdModel {
  category: Category;
  errorMessage: string;
}
