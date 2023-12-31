/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import useDashboardContext from '../hooks/useDashboardContext';

const NavLinks = ({ isBigSidebar }) => {
  const { user, toggleSidebar } = useDashboardContext();

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role, email } = user;
        if (path === 'admin' && role !== 'admin') return;
        if (path === 'profile' && email === 'test@test.com') return;
        return (
          <NavLink
            to={path}
            key={text}
            className='nav-link'
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
