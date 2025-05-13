import { useEffect, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { UserAuthProvider, UserAuthContext } from './context/AuthProvider';

function App() {
    const { currentUser, token } = useContext(AuthUserContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
          navigate('/login');
      } else if (currentUser) {
          if (currentUser.userType === 'Manager') {
              navigate('/manager-businessList');
          } else if (currentUser.userType === 'Client') {
              navigate('/client-businessList');
          }
      }
  }, [token, currentUser, navigate]);
  

    return (
        <UserAuthProvider>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </UserAuthProvider>
    );
}

export default App;
