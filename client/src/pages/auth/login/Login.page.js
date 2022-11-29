import React from "react";
import { Input } from "../components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "styles/auth.style.scss";
const { EmailInput, PasswordInput, SubmitInput } = Input;

function Login() {
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
        <form>
          <EmailInput />
          <PasswordInput />
          <Link className="forgot-password">Forgot password ?</Link>
          <SubmitInput />
        </form>
        <p className="have-not-account">
          Don't have an account? <Link to="/register">Sign Up</Link>{" "}
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
