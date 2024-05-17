import {FC, ReactElement, useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {getAuth} from "firebase/auth";
import {useSelector} from "react-redux";
import {login, logout} from '../redux/reducers/auth';
import configurestore, {RootState} from "../redux/configurestore";
import {selectIsLoggedIn} from "../redux/selectors/auth";

interface AuthGuardProps {
  component: React.ReactElement<any>,
  forceAuth?: boolean
}

const AuthGuard: FC<AuthGuardProps> = ({component, forceAuth = false, ...rest}) => {

  const isLoggedIn = useSelector((state: RootState) => {
    return selectIsLoggedIn(state);
  });
  const auth = getAuth();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        // configurestore.dispatch(login({email: user.email, token: token})); // Dispatch action to update authentication state
        // user.getIdToken().then((token) => { })
      } else {
        // User is signed out
        configurestore.dispatch(logout({})); // Dispatch action to update authentication state
      }
    })

    return () => {
      unsub(); // Unsubscribe from the event when component unmounts
    };
  }, [auth]);

  return isLoggedIn ? component : <Navigate to="/login"/>;
}

export default AuthGuard
