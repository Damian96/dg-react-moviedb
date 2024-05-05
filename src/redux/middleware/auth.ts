import {auth} from "../../constants/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {loginFailure, loginSuccess, registerFailure, registerSuccess} from "../reducers/auth";

const authMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  console.log(action.type, 'middleware');
  if (action.type === 'auth/login') {
    const {email, password} = action.payload;
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Dispatch an action indicating successful login
        userCredential.user.getIdToken()
          .then((token) => {
            storeAPI.dispatch(loginSuccess({token: token}));
          })
      })
      .catch(error => {
        // Dispatch an action indicating login failure
        storeAPI.dispatch(loginFailure({ message: error.message}));
      });
  } else if (action.type === 'auth/register') {
    const {email, password} = action.payload;
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Dispatch an action indicating successful registration
        userCredential.user.getIdToken()
          .then((token) => {
            storeAPI.dispatch(registerSuccess({token: token}));
          })
      })
      .catch(error => {
        // Dispatch an action indicating registration failure
        storeAPI.dispatch(registerFailure({ message: error.message}));
      });
  }

  return next(action);
};

export default authMiddleware;
