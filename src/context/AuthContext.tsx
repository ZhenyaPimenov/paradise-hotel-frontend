import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';
import { storage } from '../utils/storage';
import { getErrorMessage } from '../utils/http';
import type { LoginPayload, RegisterPayload, User } from '../types/auth';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(storage.getUser());
  const [loading, setLoading] = useState(true);

  const logout = () => {
    storage.clear();
    setUser(null);
  };

  const refreshUser = async () => {
    const token = storage.getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await authApi.me();
      setUser(data.user);
      storage.setUser(data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshUser();
  }, []);

  const login = async (payload: LoginPayload) => {
    try {
      const data = await authApi.login(payload);
      storage.setToken(data.token);
      storage.setUser(data.user);
      setUser(data.user);
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Login failed.'));
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      await authApi.register(payload);
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Registration failed.'));
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
