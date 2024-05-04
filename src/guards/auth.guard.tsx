import {FC, ReactElement, useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {getAuth} from "firebase/auth";
import {useSelector} from "react-redux";
import {login, logout} from '../redux/reducers/auth';
import configurestore, {RootState} from "../redux/configurestore";
import {selectIsLoggedIn} from "../redux/selectors/auth";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

interface AuthGuardProps {
  component: ReactElement,
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
        configurestore.dispatch(login(user)); // Dispatch action to update authentication state
      } else {
        // User is signed out
        configurestore.dispatch(logout({})); // Dispatch action to update authentication state
      }
    })

    return () => {
      unsub(); // Unsubscribe from the event when component unmounts
    };
  }, [auth]);

  return isLoggedIn ? <Outlet/> : <Navigate to="/login"/>;
}

export default AuthGuard
