import React from 'react';
import './App.css';

import './styles/bootstrap/custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import {Provider, useSelector} from "react-redux";
import configurestore from "./redux/configurestore";
import FavoritesLazy from "./components/favorites/favorites.lazy";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/layout/layout.lazy";
import AuthGuard from "./guards/auth.guard";
import Login from "./components/login/login";
import FirebaseAppProvider from "./constants/firebase";
import {selectIsLoggedIn} from "./redux/selectors/auth";
import Register from "./components/register/register";


function App() {

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthGuard component={<Layout/>}></AuthGuard>,
      /*errorElement: <ErrorPage />,*/
      children: [
        {
          path: "/favorites",
          element: <AuthGuard component={<FavoritesLazy/>}></AuthGuard>,
        },
      ],
    },
    {
      path: '/login',
      element: <Layout/>,
      children: [
        {
          path: '/login',
          element: <Login/>,
        }
      ]
    },
    {
      path: '/register',
      element: <Layout/>,
      children: [
        {
          path: '/register',
          element: !isLoggedIn ? <Register/> : <Login/>,
        }
      ]
    }
  ]);

  return (<RouterProvider router={router}/>);
}

export default App;
