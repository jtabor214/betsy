import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ? (
    <ul>
      <ProfileButton user={sessionUser} />
    </ul>
  ) : (
    <>
      <ul>
        <NavLink to="/login">Log In</NavLink>
      </ul>
      <ul>
        <NavLink to="/signup">Sign Up</NavLink>
      </ul>
    </>
  );

  return (
    <ul>
      <ul>
        <NavLink to="/">Home</NavLink>
      </ul>
      {sessionLinks}
    </ul>
  );
}

export default Navigation;