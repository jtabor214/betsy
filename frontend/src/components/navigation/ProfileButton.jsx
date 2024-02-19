import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session.js';
import './ProfileButton.css'; 

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return; 

    const closeMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button id="button-container" onClick={toggleMenu}>
        <i id="profile-icon" className="fa-solid fa-user"></i>
        <i className="fa-solid fa-caret-down"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={dropdownRef}>
          <li id="profile-name">{user.name}</li>
          <li>View your profile</li>
          <li>
            <div className='logout-container'>
              <img id="logout-icon" src="/images/logout-icon.png" alt="" />
              <button id="logout-button" onClick={logout}>Sign out</button>
            </div>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;