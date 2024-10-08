import { useState } from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }

        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="auth-page">
            <div className="auth-content">
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account?  <Link to='/auth/login'>Sign in</Link></p>
            </div>
        </div>
    );
}

export default SignUpPage;
