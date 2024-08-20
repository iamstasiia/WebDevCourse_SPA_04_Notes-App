import { useState } from "react";
import SignUpComponent from "./SignUp.component.jsx";
import SignInComponent from "./SignIn.component.jsx";

const AuthComponent = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-content">
                {isLogin ? (
                    <>
                        <SignInComponent onAuthSuccess={onAuthSuccess} />
                        <p>
                            Don`t have an account? 
                            <button onClick={toggleForm}>Sign up</button>
                        </p>
                    </>
                ) : (
                    <>
                        <SignUpComponent onAuthSuccess={onAuthSuccess} />
                        <p>
                            Already have an account? 
                            <button onClick={toggleForm}>Sign in</button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthComponent;
