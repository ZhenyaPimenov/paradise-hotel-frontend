export type Role = 'user' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
