import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserByIdModel, UserModel } from '../../models/User';

const getUserState = createFeatureSelector<UserModel>('users');
const getUserByIdState = createFeatureSelector<UserByIdModel>('userById');

export const getAllUsers = createSelector(getUserState, (state) => {
  return state;
});

export const getUserById = createSelector(getUserByIdState, (state) => {
  return state;
});
