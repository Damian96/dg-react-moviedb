import './App.css';

import './styles/bootstrap/custom.scss';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import { useSelector } from "react-redux";
import FavoritesLazy from "./components/favorites/favorites.lazy";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/layout.lazy";
import AuthGuard from "./guards/auth.guard";
import Login from "./components/login/login";
import { selectIsLoggedIn } from "./redux/selectors/auth";
import Register from "./components/register/register";
import MovieDetailLazy from "./components/movie-detail/movie-detail.lazy";
import HomeLazy from "./components/home/home.lazy";


function App() {

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthGuard component={<Layout />}></AuthGuard>,
      /*errorElement: <ErrorPage />,*/
      children: [
        {
          path: '',
          element: <AuthGuard component={<HomeLazy />}></AuthGuard>
        },
        {
          path: "/favorites",
          element: <AuthGuard component={<FavoritesLazy />}></AuthGuard>,
        },
        {
          path: 'movies/:id',
          element: <AuthGuard component={<MovieDetailLazy />}></AuthGuard>
        }
      ],
    },
    {
      path: '/login',
      element: <Layout />,
      children: [
        {
          path: '/login',
          element: <Login />,
        }
      ]
    },
    {
      path: '/register',
      element: <Layout />,
      children: [
        {
          path: '/register',
          element: !isLoggedIn ? <Register /> : <Login />,
        }
      ]
    },
  ]);

  return (<RouterProvider router={router} />);
}

export default App;
