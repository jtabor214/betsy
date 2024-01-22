import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Splash from './components/splash/Splash';
// import LoginForm from './SessionModal/LoginForm';
// import SignupForm from './SessionModal/SignupForm';
// import ProfileButton from './components/navigation/ProfileButton';

import Navigation from './components/navigation/Navigation';
// import ProductForm from './components/product/ProductForm';
import ProductShow from './components/product/ProductShow';
import ProductsIndex from './components/product/ProductsIndex';
import ProductIndexItem from './components/product/ProductIndexItem';

import * as sessionActions from './store/session';


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
  {
    path: '/',
    element:
    <>
      <Layout />
      <ProductsIndex />
      <ProductIndexItem />
    </>,
  },
  {
    path: '/:productId',
    element: <ProductShow />,
  },
  // {
  //   path: 'new',
  //   element: <ProductForm />,
  // },
  // {
  //   path: ':productId/edit',
  //   element: <ProductForm />,
  // },
]);

export default App;