import { Role, UserByIdModel, UserModel } from '../../models/User';

export const userInitialState = {
  name: '',
  role: Role.CUSTOMER,
  avatar: '',
  email: '',
  password: '',
};

export const userState: UserModel = {
  users: [],
  errorMessage: '',
};

export const userByIdState: UserByIdModel = {
  user: userInitialState,
  errorMessage: '',
};
