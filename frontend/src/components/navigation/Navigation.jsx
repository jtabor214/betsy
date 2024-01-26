import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import ProfileButton from './ProfileButton';
import SessionModal from '../SessionModal/SessionModal';
import './Navigation.css';
import { showModal } from '../../store/modals';
import { fetchResults } from '../../store/search';

function Navigation(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const [query, setQuery] = useState('');
  const handleSearch= (e) => {
    e.preventDefault();

    dispatch(fetchResults(query));
    navigate(`/search/${query}`);
    
    //redirect to search/${query}
  };

  return (
    <header id="main_header">
      <div id="nav_bar">
        <SessionModal />
        <NavLink id="name" to="/">Betsy</NavLink>
        <button id="category-container">
          <img id="category-icon" src="../../../public/assets/images/menu-icon.png" alt="" />
          <p>Categories</p>
        </button>
        <form id="search-container" action="" onSubmit={handleSearch}>
          <input placeholder="Search for anything"id="search_bar" value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <button id="search-button"type='submit'><img id="search-icon" src="../../../public/assets/images/search-icon.png" alt="search icon" /></button>
        </form>
        {sessionLinks}
        <button id="cart_button"><img id="cart-icon" src="../../../public/assets/images/cart-icon.png" alt="cart icon" /></button>
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