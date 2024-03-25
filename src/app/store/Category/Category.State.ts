import { CategoryByIdModel, CategoryModel } from '../../models/Category';

export const categoryInitialState = {
  name: '',
  images: '',
};

export const categoryState: CategoryModel = {
  categories: [],
  errorMessage: '',
};

export const categoryByIdState: CategoryByIdModel = {
  category: categoryInitialState,
  errorMessage: '',
};
