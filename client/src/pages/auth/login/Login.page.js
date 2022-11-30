import React from "react";
import { Input } from "../components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useLogin from "Hooks/UseLogin";
const { EmailInput, PasswordInput, SubmitInput } = Input;

function Login() {
  const { register, onSubmit, errors, isSubmitting, error,success } = useLogin();
  return (
    <div className="body">
      <motion.div
        initial={{ opacity: .5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="content"
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
          Don't have an account? <Link to="/register">Sign Up</Link>{" "}
        </p>
        <p className="forgot-password"><Link to="/forget-password" className="forgot-password">Forgot password ?</Link></p>
      </motion.div>
    </div>
  );
}

export default Login;
