import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Splash from './components/splash/Splash';
import LoginForm from './SessionModal/LoginForm';
import SignupForm from './SessionModal/SignupForm';
// import ProfileButton from './components/navigation/ProfileButton';
import Navigation from './components/navigation/Navigation';
import ProductForm from './components/product/ProductForm';
import ProductShow from './components/product/ProductShow';

import * as sessionActions from './store/session';

function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [signupModal, setSignupModal] = useState(false);

  // const openSignupModal = () => {
  //   setSignupModal(true);
  // };

  // const closeSignupModal = () => {
  //   setSignupModal(false);
  // };

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isLoaded && <Outlet />}
      <ProductShow />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Splash />,
        children: [
          {
            path: 'new',
            element: <ProductForm />,
          },
          {
            path: ':productId',
            element: <ProductShow />,
          },
          {
            path: ':productId/edit',
            element: <ProductForm />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <SignupForm />,
      },
    ],
  },
]);

export default App;