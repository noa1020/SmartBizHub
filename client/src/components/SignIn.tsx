import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../context/AuthProvider'; // עדכן את הנתיב בהתאם
import './SignIn.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { currentUser } = useContext(UserAuthContext) || {};

// LoginForm.tsx
const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginData = { username, password };

    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);

            // כאן אנחנו רק מעדכנים את הטוקן בקונטקסט, ולא שולפים את פרטי המשתמש
            setToken(data.token); 

            window.location.reload(); // רענון העמוד כדי לטעון מחדש את הקונטקסט
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
};


    // הפנייה אוטומטית לפי סוג המשתמש בקונטקסט
    useEffect(() => {
        if (currentUser) {
            if (currentUser.userType === 'Manager') {
                navigate('/manager-businessList');
            } else if (currentUser.userType === 'Client') {
                navigate('/client-businessList');
            }
        }
    }, [currentUser, navigate]);

    return (
        <div className="auth-container">
            <div className="login-container">
                <h2>התחברות</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="שם משתמש" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="סיסמה" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <input type="submit" value="התחבר" />
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
