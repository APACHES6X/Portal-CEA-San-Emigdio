import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextValue } from '../types';
import { loginUser, registerUser, logoutUser } from '../services/authService';
import type { RegisterData } from '../services/authService';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginUser(credentials);
      // Map API response to User type if needed
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        userType: (response.user as any).role || (response.user as any).userType || 'visitante',
        createdAt: (response.user as any).createdAt || new Date().toISOString(),
        updatedAt: (response.user as any).updatedAt || new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', response.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await registerUser(data);
      // Map API response to User type if needed
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        userType: (response.user as any).role || (response.user as any).userType || 'visitante',
        createdAt: (response.user as any).createdAt || new Date().toISOString(),
        updatedAt: (response.user as any).updatedAt || new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', response.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar usuario');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement forgot password API call
      console.log('Forgot password for:', email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar correo');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (data: { token: string; newPassword: string; confirmPassword: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement reset password API call
      console.log('Reset password with token:', data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al restablecer contraseña');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('user');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cerrar sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    clearError,
  }), [user, isLoading, error, login, register, forgotPassword, resetPassword, logout, clearError]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;