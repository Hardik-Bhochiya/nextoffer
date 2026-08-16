import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Hardik Bhochiya',
    email: 'hardik@nextoffer.dev',
    targetRole: 'Full Stack SDE',
    dreamCompany: 'Google / Tier-1 Tech',
    gradYear: '2026',
    streak: 12,
    readinessScore: 84,
  });
  const [token, setToken] = useState(localStorage.getItem('nextoffer_token') || 'demo_token');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/profile');
        if (res?.user) {
          setUser(res.user);
        }
      } catch (err) {
        console.log('Using local user session:', err);
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
    } catch (err) {
      // Local fallback for smooth demo experience
      if (email && password) {
        const fallbackUser = {
          name: email.split('@')[0],
          email,
          targetRole: 'Software Engineer',
          dreamCompany: 'Top Tech',
          gradYear: '2026',
          streak: 5,
          readinessScore: 78
        };
        setUser(fallbackUser);
        localStorage.setItem('nextoffer_token', 'demo_token');
        setToken('demo_token');
        return { success: true };
      }
      return { success: false, message: err?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res?.token) {
        localStorage.setItem('nextoffer_token', res.token);
        setToken(res.token);
        setUser(res.user);
        return { success: true };
      }
    } catch (err) {
      const fallbackUser = {
        name: userData.name || 'Student Developer',
        email: userData.email,
        targetRole: userData.targetRole || 'Software Engineer',
        dreamCompany: userData.dreamCompany || 'Top Tech',
        gradYear: userData.gradYear || '2026',
        streak: 1,
        readinessScore: 65
      };
      setUser(fallbackUser);
      localStorage.setItem('nextoffer_token', 'demo_token');
      setToken('demo_token');
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem('nextoffer_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
