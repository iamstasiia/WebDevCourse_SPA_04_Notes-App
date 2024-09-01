import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth.context.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faHouse,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const UserMenuComponent = () => {
    const location = useLocation();
    const isInTrash = location.pathname === "/notes/trash";

    const { logout } = useContext(AuthContext);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        logout();  
        navigate('/auth/login');      
    };

    const handleToTrash = () => {
        navigate('trash');
    };

    const handleToNotes = () => {
        navigate('/notes');
    };

    return (
        <header>
            <h2>Hello, {username}</h2>
            <nav>
                {isInTrash ? (
                    <button className="tooltip" onClick={handleToNotes}>
                            <FontAwesomeIcon icon={faHouse} />
                        <span className="tooltiptext">To Notes</span>
                    </button>
                ) : (
                    <button className="tooltip" onClick={handleToTrash}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        <span className="tooltiptext">To Trash</span>
                    </button>
                )}

                <button className="tooltip" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    <span className="tooltiptext">Log out</span>
                </button>
            </nav>
        </header>
    );
};

export default UserMenuComponent;
