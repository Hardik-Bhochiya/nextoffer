import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('nextoffer_token') || null);
  const [loading, setLoading] = useState(true);

  // On mount (or token change), fetch the real profile from backend
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/profile');
        if (res?.user) {
          setUser(res.user);
        } else {
          // Bad token — clear it
          localStorage.removeItem('nextoffer_token');
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        // Token invalid or expired
        localStorage.removeItem('nextoffer_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res?.token) {
        localStorage.setItem('nextoffer_token', res.token);
        setToken(res.token);
        setUser(res.user);
        return { success: true };
      }
      return { success: false, message: 'Login failed. Please try again.' };
    } catch (err) {
      return { success: false, message: err?.message || 'Invalid email or password' };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res?.success) {
        return { success: true, message: res.message || 'Registration successful! Please sign in.' };
      }
      return { success: false, message: res?.message || 'Registration failed. Please try again.' };
    } catch (err) {
      return { success: false, message: err?.message || 'Registration error' };
    }
  };

  const updateProfile = async (updates) => {
    try {
      const res = await api.put('/auth/profile', updates);
      if (res?.user) {
        setUser(res.user);
      }
    } catch (err) {
      console.error('Update profile error:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('nextoffer_token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, register, updateProfile, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
