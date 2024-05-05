import React, {FC} from 'react';
import {RegisterWrapper} from './register.styled';
import {Link} from "react-router-dom";
import {useForm, SubmitHandler} from "react-hook-form"
import configurestore from "../../redux/configurestore";
import {register as registerAction} from '../../redux/reducers/auth';

type Inputs = {
  email: string
  password: string
}

interface RegisterProps {
}

const Register: FC<RegisterProps> = () => {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = ({email, password}) => {
    configurestore.dispatch(registerAction({email: email, password: password}));
  }

  return (
    <RegisterWrapper>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="text-center my-5">MyMovieDB</div>
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                  <form method="POST" className="needs-validation" noValidate={false} autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label>
                      <input id="email" type="email" className="form-control" required autoFocus={true}
                             autoComplete="username"
                             {...register("email", {required: true})}
                             aria-invalid={errors.email ? "true" : "false"}/>
                      <div className={'invalid-feedback ' + (errors.email ? 'd-block' : 'd-none')}>
                        {errors.email?.type === 'required' && ("Email is required")}
                        {errors.email?.type !== 'required' && errors.email && (errors.email!.message)}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="password">Password</label>
                        {/*<a href="forgot.html" className="float-end">Forgot Password?</a>*/}
                      </div>
                      <input id="password" type="password" className="form-control" required
                             autoComplete="current-password"
                             {...register("password", {required: true, minLength: 4})}/>
                      <div className={'invalid-feedback ' + (errors.password ? 'd-block' : 'd-none')}>
                        {errors.password?.type === 'required' && ("Password is required")}
                        {errors.password?.type === 'minLength' && ("Password should be at least 4 characters long")}
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      {/*<div className="form-check">*/}
                      {/*  <input type="checkbox" name="remember" id="remember" className="form-check-input"/>*/}
                      {/*  <label htmlFor="remember" className="form-check-label">Remember Me</label>*/}
                      {/*</div>*/}
                      <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Already have an account? <Link to={'/login'} className="text-dark">Log in</Link>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RegisterWrapper>
  );
};

export default Register;
