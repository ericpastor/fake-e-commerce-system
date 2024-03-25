import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/Category';

//LOAD ALL CATEGORIES
export const LOAD_CATEGORIES = '[categories] load categories';
export const LOAD_CATEGORIES_SUCCESS = '[categories] load categories success';
export const LOAD_CATEGORIES_FAIL = '[categories] load categories fail';

export const loadCategories = createAction(LOAD_CATEGORIES);
export const loadCategoriesSuccess = createAction(
  LOAD_CATEGORIES_SUCCESS,
  props<{ categories: Category[] }>()
);
export const loadCategoriesFail = createAction(
  LOAD_CATEGORIES_FAIL,
  props<{ errorMessage: string }>()
);

//LOAD CATEGORY BY ID
export const LOAD_CATEGORY_BY_ID = '[categoryById] load category by id';
export const LOAD_CATEGORY_BY_ID_SUCCESS =
  '[categoryById] load category by id success';
export const LOAD_CATEGORY_BY_ID_FAIL =
  '[categoryById] load category by id fail';

export const loadCategoryById = createAction(
  LOAD_CATEGORY_BY_ID,
  props<{ id: number }>()
);
export const loadCategoryByIdSuccess = createAction(
  LOAD_CATEGORY_BY_ID_SUCCESS,
  props<{ category: Category }>()
);

export const loadCategoryByIdFail = createAction(
  LOAD_CATEGORY_BY_ID_FAIL,
  props<{ errorMessage: string }>()
);
