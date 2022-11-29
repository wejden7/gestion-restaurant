import React from "react";
import { Input } from "../components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "styles/auth.style.scss";
const { TextInputName, EmailInput, PasswordInput, SubmitInput } = Input;

function Register() {
  return (
    <div className="body">
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{duration:.5}}
        className="content"
      >
        <h1 className="title-form">Sign Up</h1>
        <p className="sousTitle-form">Creat account to start usign TacPro</p>
        <form onSubmit={() => {}}>
          <TextInputName />
          <EmailInput />
          <PasswordInput />
          <SubmitInput />
        </form>
        <p className="have-not-account">
          Already have an account ? <Link to="/login">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
