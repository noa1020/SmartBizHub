// UserFetcher.tsx
import React, { useEffect, useState } from 'react';

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return null; // אין טוקן
  }

  // פיצול הטוקן ל-3 חלקים
  const parts = token.split('.');

  if (parts.length !== 3) {
    console.error('Invalid token');
    return null;
  }

  // החלק השני (payload) הוא מקודד ב-base64
  const payload = parts[1];

  // דקוד את ה-payload מ-base64 ל-JSON
  try {
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.id; // מחזיר את ה-ID מה-payload
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
};

  const UserFetcher = ({ onUserFetched }: { onUserFetched: (user: any) => void }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserIdFromToken();
      if (userId) {
        try {
          const response = await fetch(`http://localhost:3000/user/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();
          onUserFetched(userData);
        } catch (error) {
          setError(error.message);
        }
      } else {
        setError('Token not found');
      }
      setLoading(false);
    };

    fetchUserData();
  }, [onUserFetched]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null; // לא מציג כלום בעצמו, כל המידע יישלח לדף השני
};

export default UserFetcher;