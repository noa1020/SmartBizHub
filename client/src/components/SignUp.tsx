import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './SignUp.css';

const SignUpForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialRole = searchParams.get('role') || 'client'; // קבלת התפקיד מה-URL
    const [role, setRole] = useState(initialRole);
    
    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUser = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            phone: event.target.phone.value,
            userType: role,
        };

        try {
            const response = await fetch('http://localhost:3000/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });


            if (response.ok) {
                alert('User registered successfully!');
                navigate('/login');
            } if (!response.ok) {
                const textResponse = await response.text(); // מקבל את התגובה כטקסט
                console.error('Server response:', textResponse); // מדפיס ללוג לבדיקה
                try {
                    const errorData = JSON.parse(textResponse); // מנסה להמיר ל-JSON
                    alert(errorData.message);
                } catch (e) {
                    alert('Unknown error occurred.');
                }
            }
            
        } catch (error) {
            console.error('Error during sign up:', error);
            alert('An error occurred during registration.');
        }
    };

    return (
        <div className="auth-container">
            <div className="signup-container">
                <h2>הרשמה</h2>
                <p>{role === 'manager' ? 'בעל עסק? רשום כאן!' : 'לקוח? הצטרף עכשיו!'}</p>
                
                <form onSubmit={handleSignUp}>
                    <input type="text" name="username" placeholder="שם משתמש" required />
                    <input type="password" name="password" placeholder="סיסמה" required />
                    <input type="email" name="email" placeholder="אימייל" required />
                    <input type="text" name="phone" placeholder="טלפון" required />
                    
                    <input type="submit" value="הרשמה" />
                </form>
            </div>
            <p>כבר יש לך חשבון?</p>
            <button onClick={() => navigate('/login')} className="login-btn">
                התחבר כאן
            </button>
        </div>
    );
};

export default SignUpForm;
