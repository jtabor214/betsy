import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import SessionModal from '../../SessionModal/SessionModal';
import './Navigation.css';
import { showModal } from '../../store/modals';

function Navigation(){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ? (
    <ul>
      <ProfileButton user={sessionUser} />
    </ul>
  ) : (
    <>
      <ul>
        <button onClick={() => {dispatch(showModal("login"))}}>Log In</button>
      </ul>
    </>
  );

  return (
    <header id="main_header">
      <div id="nav_bar">
        <SessionModal />
        <NavLink id="name" to="/">Betsy</NavLink>
        <p>Categories</p>
        <div id="search_bar">Seach Bar</div>
        {sessionLinks}
        <button>Cart Icon</button>
      </div>
      <div id="quick_look">
        <p>Valentine's Day Gifts</p>
        <p>Home Favorites</p>
        <p>Fashion Finds</p>
        <p>Gift Guides</p>
        <p>Registry</p>
      </div>
    </header>
  );
}

export default Navigation;