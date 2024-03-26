import { CategoryByIdModel, CategoryModel } from '../../models/Category';

export const categoryInitialState = {
  name: '',
  image: '',
};

export const categoryState: CategoryModel = {
  categories: [],
  errorMessage: '',
};

export const categoryByIdState: CategoryByIdModel = {
  category: categoryInitialState,
  errorMessage: '',
};
