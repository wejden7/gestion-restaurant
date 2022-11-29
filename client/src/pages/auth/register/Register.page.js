import React from "react";
import { Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "styles/auth.style.scss";
import useRegister from "Hooks/UseRegister";
import { AiOutlineCheckCircle } from "react-icons/ai";
const { TextInputName, EmailInput, PasswordInput, SubmitInput } = Input;

const RegisterContent = ({ useOther }) => {
  const { register, onSubmit, errors, isSubmitting, error } = useOther;
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="content"
    >
      <h1 className="title-form">Sign Up</h1>
      <p className="sousTitle-form">Creat account to start usign TacPro</p>
      <p className="error-form">{error}</p>
      <form onSubmit={onSubmit}>
        <TextInputName
          register={register("name")}
          error={errors.name?.message}
        />
        <EmailInput
          register={register("email")}
          error={errors.email?.message}
        />
        <PasswordInput
          register={register("password")}
          error={errors.password?.message}
        />
        <SubmitInput isSubmitting={isSubmitting} />
      </form>
      <p className="have-not-account">
        Already have an account ? <Link to="/login">Sign in</Link>
      </p>
    </motion.div>
  );
};

const RegisterSuccess = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/login");
  };
  return (
    <div className="content-success">
      <div className="success-top">
        <AiOutlineCheckCircle className="register-success-icon" />
      </div>
      <div className="success-bottom">
        <p className="text">
          Congratulation, Your account has been successfully created.
        </p>
        <button onClick={onClick} type="button">
          Sign In
        </button>
      </div>
    </div>
  );
};

const Register = () => {
  const { success, ...useOther } = useRegister();
  return (
    <div className="body">
      {!success ? <RegisterContent useOther={useOther} /> : <RegisterSuccess />}
    </div>
  );
};

export default Register;
