export interface User extends UserToLogin {
  id: number;
  name: string;
  role: Role;
}
export interface UserToLogin {
  email: string;
  password: string;
}

export enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}
