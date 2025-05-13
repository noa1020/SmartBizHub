import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <header className="landing-header">
                <h1>!ברוכים הבאים לפלטפורמת השירותים המובילה</h1>
                <p>.התחברו לעסקים מקומיים, קבלו שירותים מקצועיים או פרסמו את העסק שלכם</p>
            </header>

            <div className="buttons-container">
            <button className="btn client-btn" onClick={() => navigate('/sign-up?role=Client')}>
                    אני מחפש שירותים 🔍
                </button>
                <button className="btn business-btn" onClick={() => navigate('/sign-up?role=Manager')}>
                    אני בעל עסק 📢
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
