import React from "react";
import { Input } from "../components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useLogin from "Hooks/UseLogin";
import {registerPath,ForgetPasswordPath } from 'utils/router/pathRouter.util'
const { EmailInput, PasswordInput, SubmitInput } = Input;

function Login() {
  const { register, onSubmit, errors, isSubmitting, error,success } = useLogin();
  return (
 
      <motion.div
        initial={{ opacity: .5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
       
      >
        <h1 className="title-form">Sign In</h1>
        <p className="sousTitle-form">welcome back to tacPro</p>
        <p className="error-form">{error}</p>
        <form onSubmit={onSubmit}>
          <EmailInput register={register("email")}
          error={errors.email?.message} />
          <PasswordInput  register={register("password")}
          error={errors.password?.message} />
        
          <SubmitInput isSubmitting={isSubmitting} label="Sign In" />
        </form>
        <p className="have-not-account">
          Don't have an account? <Link to={registerPath}>Sign Up</Link>{" "}
        </p>
        <p className="forgot-password"><Link to={ForgetPasswordPath} className="forgot-password">Forgot password ?</Link></p>
      </motion.div>
   
  );
}

export default Login;
