// import { useDispatch } from "react-redux";
// import { fetchProducts } from "../../store/product";
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
            <div id="nav-button-1">
              <button></button>
            </div>
            <p>Valentine&apos;s <br />Day Gifts</p>
          </div>
          <div id="button-container-2">
            <div id="nav-button-2">
              <button></button>
            </div>
            <p>Bracelets</p>
          </div>
          <div id="button-container-3">
            <div id="nav-button-3">
              <button></button>
            </div>
            <p>Home Decor</p>
          </div>
          <div id="button-container-4">
            <div id="nav-button-4">
              <button></button>
            </div>
            <p>Tees & <br /> Sweaters</p>
          </div>
          <div id="button-container-5">
            <div id="nav-button-5">
              <button></button>
            </div>
            <p>Printables</p>
          </div>
          <div id="button-container-6">
            <div id="nav-button-6">
              <button></button>
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