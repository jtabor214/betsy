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
        <p>Categories</p>
        <form action="" onSubmit={handleSearch}>
          <input id="search_bar" value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <button type='submit'>Search</button>
        </form>
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