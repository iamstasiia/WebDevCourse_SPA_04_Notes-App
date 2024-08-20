import { useContext } from 'react';
import { UserContext } from '../contexts/User.context.jsx';

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
    <div style={{ marginBottom: '20px' }}>
        <h2>Hello, {username}</h2>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default UserMenuComponent;
