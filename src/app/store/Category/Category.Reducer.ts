import { createReducer, on } from '@ngrx/store';
import { categoryByIdState, categoryState } from './Category.State';
import {
  loadCategoryByIdFail,
  loadCategoryByIdSuccess,
  loadCategoriesFail,
  loadCategoriesSuccess,
} from './Category.Actions';

export const categoryReducer = createReducer(
  categoryState,
  on(loadCategoriesSuccess, (state, action) => {
    return {
      ...state,
      categories: action.categories,
      errorMessage: '',
    };
  }),

  on(loadCategoriesFail, (state, action) => {
    return {
      ...state,
      categories: [],
      errorMessage: action.errorMessage,
    };
  })
);

export const categoryByIdReducer = createReducer(
  categoryByIdState,
  on(loadCategoryByIdSuccess, (state, action) => {
    return {
      ...state,
      category: action.category,
      errorMessage: '',
    };
  }),

  on(loadCategoryByIdFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  })
);
