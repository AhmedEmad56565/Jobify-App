import { useState } from 'react';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import useDashboardContext from '../hooks/useDashboardContext';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useDashboardContext();

  function handleShowLogout() {
    setShowLogout((prevShowLogoutState) => !prevShowLogoutState);
  }

  return (
    <Wrapper>
      <button
        type='button'
        className='btn logout-btn'
        onClick={handleShowLogout}
      >
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout ? 'show-dropdown' : ''}`}>
        <button type='button' className='dropdown-btn' onClick={logout}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
