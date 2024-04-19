import { createReducer, on } from '@ngrx/store';
import { userByIdState, userState } from './User.State';
import {
  loadUserByIdFail,
  loadUserByIdSuccess,
  loadUsersFail,
  loadUsersSuccess,
} from './User.Actions';

export const userReducer = createReducer(
  userState,
  on(loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.users,
      errorMessage: '',
    };
  }),

  on(loadUsersFail, (state, action) => {
    return {
      ...state,
      users: [],
      errorMessage: action.errorMessage,
    };
  })
);

export const userByIdReducer = createReducer(
  userByIdState,
  on(loadUserByIdSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      errorMessage: '',
    };
  }),

  on(loadUserByIdFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  })
);
