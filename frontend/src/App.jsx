import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import ProfileButton from './components/navigation/ProfileButton';
import * as sessionActions from './store/session';
import Splash from './components/splash/Splash';
import Navigation from './components/navigation/Navigation';
// import ProductForm from './components/product/ProductForm';
import ProductShow from './components/product/ProductShow';
import ProductsIndex from './components/product/ProductsIndex';



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
    ],
  },
 
]);

export default App;