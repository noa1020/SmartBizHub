import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import LoginForm from './components/SignIn';
import SignUpForm from './components/SignUp';
import BusinessList from './components/BusinessList';
import BusinessServices from './components/BusinessServices';
import AddBusiness from './components/AddBusiness';
import EditBusiness from './components/EditBusiness';
import DeleteBusiness from './components/DeleteBusiness';
import './index.css';
import 'primereact/resources/themes/vela-green/theme.css'
import {  UserAuthProvider } from './context/AuthProvider';
import AddService from './components/AddService';
import EditService from './components/EditService';
import LandingPage from './components/LandingPage';
import ClientBusinessList from './components/ClientBusinessList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />, // דף פתיחה
  },
  {
    path: '/sign-up',
    element: <SignUpForm />, // דף הרשמה אחיד עם אפשרות בחירה
  },
  {
    path: '/login',
    element: <LoginForm />, // דף התחברות
  },
  {
    path: '/',
    element: <App />, // הדשבורד הראשי אחרי התחברות
    children: [
      {
        path: 'manager-businessList',
        element: <BusinessList />,
      },
      {
        path: 'client-businessList',
        element: <ClientBusinessList />
      },
      {
        path: 'business/:businessId',
        element: <BusinessServices />,
      },
      {
        path: 'add-business',
        element: <AddBusiness />,
      },
      {
        path: 'edit-business/:businessId',
        element: <EditBusiness />,
      },
      {
        path: 'delete-business/:businessId',
        element: <DeleteBusiness />,
      },
      {
        path: 'add-service/:businessId',
        element: <AddService />,
      },
      {
        path: 'edit-service/:businessId/:serviceId',
        element: <EditService />,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <UserAuthProvider> */}
      <RouterProvider router={router} />
    {/* </UserAuthProvider> */}
  </React.StrictMode>,
)