import React from 'react';
import './App.css';

import './styles/bootstrap/custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import {Provider} from "react-redux";
import configurestore from "./redux/configurestore";
import FavoritesLazy from "./components/favorites/favorites.lazy";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/layout/layout.lazy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    /*errorElement: <ErrorPage />,*/
    children: [
      {
        path: "/favorites/",
        element: <FavoritesLazy />,
      },
    ],
  },
]);


function App() {
  return (
    <Provider store={configurestore}>
      <RouterProvider router={router}/>
    </Provider>
  );
}

export default App;
