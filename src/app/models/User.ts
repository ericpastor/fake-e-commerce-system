export interface User extends UserToLogin {
  id?: number;
  name: string;
  role: Role;
  avatar: string;
}
export interface UserToLogin {
  email: string;
  password: string;
}

export enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface UserModel {
  users: User[];
  errorMessage: string;
}

export interface UserByIdModel {
  user: User;
  errorMessage: string;
}
