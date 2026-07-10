import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('notely-user', null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const login = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  }, [setUser]);

  const register = useCallback((userData) => {
    const newUser = {
      ...userData,
      id: `user-${Date.now()}`,
      joinedAt: new Date().toISOString(),
      avatar: null,
      bio: '',
    };
    setUser(newUser);
    setIsAuthenticated(true);
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, [setUser]);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
