import { useNavigate } from "react-router-dom";
import FooterComponent from "../../components/Footer.component.jsx";

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/auth/login");
    };

    return (
        <div className="welcome-page">
            <header>
                <h2>MindPad*</h2>
                <h1>Welcome to your notes app!</h1>
                <p>
                    This app allows you to create, edit, and save your personal
                    notes.
                </p>
                <button onClick={handleGetStarted}>Get started</button>
            </header>

            <FooterComponent />
        </div>
    );
};

export default WelcomePage;
