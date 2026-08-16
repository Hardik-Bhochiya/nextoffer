import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 'usr-1',
    userId: 'usr-1',
    fullName: 'Hardik Bhochiya',
    name: 'Hardik Bhochiya',
    email: 'hardik@nextoffer.dev',
    role: 'Student',
    college: 'Gujarat Technological University',
    branch: 'Computer Engineering',
    graduationYear: '2026',
    targetRole: 'Full Stack SDE',
    dreamCompany: 'Google / Microsoft / Tier-1 Tech',
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
      if (email && password) {
        const fallbackUser = {
          id: 'usr-1',
          userId: 'usr-1',
          fullName: email.split('@')[0],
          name: email.split('@')[0],
          email,
          role: 'Student',
          college: 'Gujarat Technological University',
          branch: 'Computer Engineering',
          graduationYear: '2026',
          targetRole: 'Software Engineer',
          dreamCompany: 'Top Tech',
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
        id: `usr-${Date.now()}`,
        userId: `usr-${Date.now()}`,
        fullName: userData.fullName || userData.name || 'Student Developer',
        name: userData.fullName || userData.name || 'Student Developer',
        email: userData.email,
        role: 'Student',
        college: userData.college || 'Engineering College',
        branch: userData.branch || 'Computer Engineering',
        graduationYear: userData.graduationYear || '2026',
        targetRole: userData.targetRole || 'Software Engineer',
        dreamCompany: userData.dreamCompany || 'Top Tech',
        streak: 1,
        readinessScore: 65
      };
      setUser(fallbackUser);
      localStorage.setItem('nextoffer_token', 'demo_token');
      setToken('demo_token');
      return { success: true };
    }
  };

  const updateProfile = async (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
    try {
      await api.put('/auth/profile', updates);
    } catch (err) {
      console.error('Update profile error:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('nextoffer_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, updateProfile, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
