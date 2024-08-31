import { useContext } from "react";
// import { UserContext } from '../contexts/User.context.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/Auth.context.jsx";

import { Link, useLocation } from "react-router-dom";
const UserMenuComponent = ({ onLogout }) => {
    const location = useLocation();
    const isInTrash = location.pathname === "/notes/trash";

    const { setUserId } = useContext(AuthContext);
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        setUserId(null);
        onLogout();
    };

    return (
        <header>
            <h2>Hello, {username}</h2>
            <nav>
                {isInTrash ? (
                    <Link to="/notes">Back to Notes</Link>
                ) : (
                    <Link to="trash">Go to Trash</Link>
                )}
            </nav>
            <button className="tooltip" onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span className="tooltiptext">Log out</span>
            </button>
        </header>
    );
};

export default UserMenuComponent;
