import React, {FC} from 'react';
import {LoginWrapper} from './login.styled';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

interface LoginProps {
}

const Login: FC<LoginProps> = () => {


  return (
    <LoginWrapper>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="text-center my-5">MyMovieDB</div>
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                  <form method="POST" className="needs-validation" noValidate={false} autoComplete="off">
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>
                      <input id="email" type="email" className="form-control" name="email" required
                             autoFocus={true} autoComplete="username" />
                      <div className="invalid-feedback">
                        Email is invalid
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="password">Password</label>
                        {/*<a href="forgot.html" className="float-end">Forgot Password?</a>*/}
                      </div>
                      <input id="password" type="password" className="form-control" name="password" required
                        autoComplete="current-password"/>
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      {/*<div className="form-check">*/}
                      {/*  <input type="checkbox" name="remember" id="remember" className="form-check-input"/>*/}
                      {/*  <label htmlFor="remember" className="form-check-label">Remember Me</label>*/}
                      {/*</div>*/}
                      <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Don't have an account? <a href="register.html" className="text-dark">Create One</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LoginWrapper>
  );
};

export default Login;
