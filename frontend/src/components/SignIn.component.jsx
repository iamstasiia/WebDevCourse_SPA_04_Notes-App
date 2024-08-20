import { useState, useContext } from "react";
import { UserContext } from "../contexts/User.context.jsx";

function SignInComponent({ onAuthSuccess }) {
    const { setUserId } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data.userId);

            if (data) {
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("username", data.username);

                setUserId(data.userId);
                onAuthSuccess();
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.log(error.message);
        }

        setEmail("");
        setPassword("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignInComponent;
