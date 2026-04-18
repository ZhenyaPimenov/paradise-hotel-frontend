import { api } from './client';
import type { LoginPayload, LoginResponse, RegisterPayload, User } from '../types/auth';

export const authApi = {
  async register(payload: RegisterPayload) {
    const { data } = await api.post('/api/auth/register', payload);
    return data;
  },
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await api.post('/api/auth/login', payload);
    return data;
  },
  async me(): Promise<{ user: User }> {
    const { data } = await api.get('/api/auth/me');
    return data;
  },
};
