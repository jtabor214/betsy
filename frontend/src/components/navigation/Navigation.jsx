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
        <button id="sign_in_button" onClick={() => {dispatch(showModal("login"))}}>Sign In</button>
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
        <button id="cart_button">Cart</button>
      </div>
      <div id="quick_look">
        <button>Valentine&apos;s Day Gifts</button>
        <button>Home Favorites</button>
        <button>Fashion Finds</button>
        <button>Gift Guides</button>
        <button>Registry</button>
      </div>
    </header>
  );
}

export default Navigation;