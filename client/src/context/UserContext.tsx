// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface User {
//   _id: string;
//   username: string;
//   userType: 'Manager' | 'Client';
// }

// interface UserContextType {
//   currentUser: User | null;
//   setCurrentUser: (user: User | null) => void;
// }

// export const UserContext = createContext<UserContextType | null>(null);

// const getUserIdFromToken = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return null;

//   const parts = token.split('.');
//   if (parts.length !== 3) {
//     console.error('Invalid token');
//     return null;
//   }

//   try {
//     const payload = JSON.parse(atob(parts[1]));
//     return payload.id;
//   } catch (err) {
//     console.error('Error decoding token:', err);
//     return null;
//   }
// };

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   // const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userId = getUserIdFromToken();
//       if (!userId) {
//         // console.error('User ID not found in token');
//         return;
//       }

//       try {
//         const response = await fetch(`http://localhost:3000/user/${userId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }

//         const data = await response.json();
//         setCurrentUser(data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <UserContext.Provider value={{ currentUser, setCurrentUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
