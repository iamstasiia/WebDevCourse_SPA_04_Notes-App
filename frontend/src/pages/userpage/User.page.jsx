import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/Auth.context.jsx";
import UserMenuComponent from "../../components/header/UserMenu.component.jsx";
import { Outlet } from "react-router-dom";
import FooterComponent from "../../components/Footer.component.jsx";

function UserPage() {
    const { setUserId } = useContext(AuthContext);
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
        <div className="user-page">
            <UserMenuComponent />
            <main>
                <Outlet />
            </main>
            <FooterComponent />
        </div>
    );
}

export default UserPage;
