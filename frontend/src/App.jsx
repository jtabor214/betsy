import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import ProfileButton from './components/navigation/ProfileButton';
import * as sessionActions from './store/session';
import Splash from './components/splash/Splash';
import Navigation from './components/Navigation/Navigation.jsx';
// import ProductForm from './components/product/ProductForm';
import ProductShow from './components/Product/ProductShow';
import ProductsIndex from './components/Product/ProductsIndex';
import SearchIndex from './components/Navigation/SearchIndex';
import NoPage from './components/NoPage/NoPage.jsx';
import CartIndex from './components/Cart/CartIndex.jsx';



function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  { element: <Layout />,
    children: [
      { 
        path: '/',
        element:
          <> 
            <Splash />
            <ProductsIndex />
          </>,
      },
      {
        path: '/products/:productId',
        element: <ProductShow />,
      },
      {
        path: '/search/:query',
        element: <SearchIndex />,
      },
      {
        path: '/search/:query/products/:productId',
        element: <ProductShow />,
      },
      {
        path: '/cart/:userId',
        element: <CartIndex />
      },
      {
        path: '/404',
        element: <NoPage />
      }
    ],
  },
 
]);

export default App;