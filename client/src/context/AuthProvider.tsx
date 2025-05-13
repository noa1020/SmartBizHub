// CombinedUserAuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  username: string;
  userType: 'Manager' | 'Client';
}

interface UserAuthContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const UserAuthContext = createContext<UserAuthContextType | null>(null);

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 3) {
    console.error('Invalid token');
    return null;
  }

  try {
    const payload = JSON.parse(atob(parts[1]));
    return payload.id;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
};

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();
  let inactivityTimeout: number;

  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
      setCurrentUser(null); // איפוס המשתמש בעת מחיקת הטוקן
    }
    setToken(newToken);
  };

  const logout = () => {
    handleSetToken(null);
    navigate('/login');
  };

  const resetInactivityTimeout = () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      alert('עקב אי-פעילות, יש להתחבר מחדש.');
      logout();
    }, 1 * 60 * 1000); // 30 דקות
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserIdFromToken();
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        logout(); // אם יש בעיה בטעינת המשתמש, התנתקות
      }
    };

    if (token) {
      fetchUserData();
    } else {
      setCurrentUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      window.addEventListener('mousemove', resetInactivityTimeout);
      window.addEventListener('keydown', resetInactivityTimeout);
      window.addEventListener('scroll', resetInactivityTimeout);
      resetInactivityTimeout();
    } else {
      clearTimeout(inactivityTimeout);
      window.removeEventListener('mousemove', resetInactivityTimeout);
      window.removeEventListener('keydown', resetInactivityTimeout);
      window.removeEventListener('scroll', resetInactivityTimeout);
    }

    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener('mousemove', resetInactivityTimeout);
      window.removeEventListener('keydown', resetInactivityTimeout);
      window.removeEventListener('scroll', resetInactivityTimeout);
    };
  }, [token]);

  return (
    <UserAuthContext.Provider value={{ currentUser, token, setToken: handleSetToken, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};
