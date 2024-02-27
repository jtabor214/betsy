// import { useDispatch } from "react-redux";
// import { fetchProducts } from "../../store/product";
import { NavLink } from 'react-router-dom';
import './Splash.css';



const SplashPage = () => {


  return (
    <>
      <div className='splash-container'>

        <div className="splash-top">
          <div className='splash-header'>The sweetest gifts for EVERY Valentine.</div>
          <div className='splash-background'></div>
        </div>

        <div className='splash-content'>
          <div id="button-container-1">
            <div>
              <NavLink to="/404"><button id="nav-button-1"></button></NavLink>
            </div>
            <p>Valentine&apos;s <br />Day Gifts</p>
          </div>
        
          <div id="button-container-2">
            <div >
            <NavLink to="/404"><button id="nav-button-2"></button></NavLink>
            </div>
            <p>Bracelets</p>
          </div>
          <div id="button-container-3">
            <div >
              <NavLink to="/404"><button id="nav-button-3"></button></NavLink>
            </div>
            <p>Home Decor</p>
          </div>
          <div id="button-container-4">
            <div>
              <NavLink to="/404"><button id="nav-button-4"></button></NavLink>
            </div>
            <p>Tees & <br /> Sweaters</p>
          </div>
          <div id="button-container-5">
            <div>
            <NavLink to="/404"><button id="nav-button-5"></button></NavLink>
            </div>
            <p>Printables</p>
          </div>
          <div id="button-container-6">
            <div>
            <NavLink to="/404"><button id="nav-button-6"></button></NavLink>
            </div>
            <p>Up to 40% Off</p>
          </div>
        </div>
      </div>
      <div className='spacer'></div>
    </>
  );

};

export default SplashPage;