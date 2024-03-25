import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryByIdModel, CategoryModel } from '../../models/Category';

const getCategoryState = createFeatureSelector<CategoryModel>('categories');
const getCategoryByIdState =
  createFeatureSelector<CategoryByIdModel>('categoryById');

export const getAllCategories = createSelector(getCategoryState, (state) => {
  return state.categories;
});

export const getCategoryById = createSelector(getCategoryByIdState, (state) => {
  return state.category;
});
