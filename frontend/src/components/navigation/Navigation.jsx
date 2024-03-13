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
        {/* <button id="category-container">
          <i className="fa-solid fa-bars"></i>
          <p>Categories</p>
        </button> */}
        <form id="search-container" action="" onSubmit={handleSearch}>
          <input placeholder="Search for anything"id="search_bar" value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <button id="search-button"type='submit'><i id="search-icon" className="fa-solid fa-magnifying-glass"></i></button>
        </form>
        {sessionLinks}
        <NavLink id="placeholder-link" to="/404">
        <NavLink id="cart_NavLink" to="/cart/`{:userId}`"><i id="cart-icon" className="fa-solid fa-cart-shopping"></i></NavLink>
        </NavLink>
      </div>
      <div id="quick_look">
        <NavLink to="https://jtabor214.github.io/portfolio/" id="portfolio-link">About Me</NavLink>
        <NavLink to="https://github.com/jtabor214" id="github-link">Github</NavLink>
        <NavLink to="https://www.linkedin.com/in/jake-tabor-8913922b3/" id="linkedin-link">LinkedIn</NavLink>
        {/* <button>Gift Guides</button>
        <button>Registry</button> */}
      </div>
    </header>
  );
}

export default Navigation;