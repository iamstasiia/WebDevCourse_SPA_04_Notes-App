import { useState, useContext } from "react";
import { UserContext } from "../contexts/User.context.jsx";

function SignInComponent({ onAuthSuccess }) {
    const { setUserId } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wrongEmail, setWrongEmail] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            switch (response.status) {
                case 200:
                    localStorage.setItem("userId", data.userId);
                    localStorage.setItem("username", data.username);
                    setUserId(data.userId);
                    onAuthSuccess();

                    setWrongEmail(false);
                    setWrongPassword(false);
                    break;
                case 404:
                    setWrongEmail(true);
                    setWrongPassword(false);
                    break;
                case 401:
                    setWrongEmail(false);
                    setWrongPassword(true);
                    break;
                default:
                    console.error("Unexpected error:", response.status);
                    break;
            }
        } catch (error) {
            console.log("Network error or server is down:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div>
            {wrongEmail && (<small style={{display: 'block', textAlign: 'left', color: 'red', fontWeight: 'bold'}}>Wrong email. Try again!</small>)}
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {setWrongEmail(false); setEmail(e.target.value)}} required
            />
            </div>
            <div>
            {wrongPassword && (<small style={{display: 'block', textAlign: 'left', color: 'red', fontWeight: 'bold'}}>Wrong password. Try again!</small>)}
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {setWrongPassword(false); setPassword(e.target.value)}} required
            />
            </div>
            
            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignInComponent;
