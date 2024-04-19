import { createAction, props } from '@ngrx/store';
import { User } from '../../models/User';

// LOAD USERS
export const LOAD_USERS = '[users} load users';
export const LOAD_USERS_SUCCESS = '[users] load users success';
export const LOAD_USERS_FAIL = '[users] load users fail';

export const loadUsers = createAction(LOAD_USERS);
export const loadUsersSuccess = createAction(
  LOAD_USERS_SUCCESS,
  props<{ users: User[] }>()
);
export const loadUsersFail = createAction(
  LOAD_USERS_FAIL,
  props<{ errorMessage: string }>()
);

//LOAD USER BY ID
export const LOAD_USER_BY_ID = '[userById] load user by id';
export const LOAD_USER_BY_ID_SUCCESS = '[userById] load user by id success';
export const LOAD_USER_BY_ID_FAIL = '[userById] load user by id fail';

export const loadUserById = createAction(
  LOAD_USER_BY_ID,
  props<{ id: number }>()
);
export const loadUserByIdSuccess = createAction(
  LOAD_USER_BY_ID_SUCCESS,
  props<{ user: User }>()
);

export const loadUserByIdFail = createAction(
  LOAD_USER_BY_ID_FAIL,
  props<{ errorMessage: string }>()
);
