import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  // Mock user for development - remove this when backend is ready
  const mockUser = {
    id: 'user123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    createdAt: '2024-01-01T00:00:00.000Z'
  };

  const [user, setUser] = useState(mockUser); // Set mock user as default
  const [loading, setLoading] = useState(false); // Set to false since we're using mock data

  useEffect(() => {
    // For development, we'll skip the token check and use mock user
    // Uncomment this section when backend is ready:
    /*
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token validity
      fetchUser();
    } else {
      setLoading(false);
    }
    */

    // For now, just set the mock user and stop loading
    setUser(mockUser);
    setLoading(false);
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // Mock login for development - remove this when backend is ready
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful login
      const mockToken = 'mock-jwt-token-123';
      const mockUserData = {
        id: 'user123',
        name: 'John Doe',
        email: email, // Use the provided email
        createdAt: '2024-01-01T00:00:00.000Z'
      };

      localStorage.setItem('token', mockToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      setUser(mockUserData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Login failed',
      };
    }

    // Uncomment this section when backend is ready:
    /*
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
    */
  };

  const signup = async (name, email, password) => {
    // Mock signup for development - remove this when backend is ready
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful signup
      const mockToken = 'mock-jwt-token-123';
      const mockUserData = {
        id: 'user123',
        name: name, // Use the provided name
        email: email, // Use the provided email
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('token', mockToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      setUser(mockUserData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Signup failed',
      };
    }

    // Uncomment this section when backend is ready:
    /*
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed',
      };
    }
    */
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    // For development, set back to mock user instead of null
    // Change this to setUser(null) when backend is ready
    setUser(mockUser);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};