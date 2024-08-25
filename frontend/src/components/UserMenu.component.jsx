import { useContext } from 'react';
import { UserContext } from '../contexts/User.context.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const UserMenuComponent = ({ onLogout }) => {
  const { setUserId } = useContext(UserContext);
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setUserId(null);
    onLogout();
  };

  return (
    <div className='user-menu'>
        <h2>Hello, {username}</h2>
        <button className="tooltip" onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <span className="tooltiptext">Log out</span>
        </button>
    </div>
  );
};

export default UserMenuComponent;
