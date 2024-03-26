export interface Category {
  id?: number;
  name: string;
  image: string;
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
