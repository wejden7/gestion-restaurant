import React, { useState } from "react";
import { InputAuth } from "components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useLogin from "Hooks/UseLogin";
import useLoginEmployer from "Hooks/UseLoginEmployer";
import { registerPath, ForgetPasswordPath } from "utils/router/pathRouter.util";
const { EmailInput, PasswordInput, SubmitInput, TextInputName } = InputAuth;

const LoginAdmin = () => {
  const { register, onSubmit, errors, isSubmitting, error, success } =
    useLogin();
  return (
    <motion.div
      initial={{ opacity: 0, x: "-300px" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="content"
    >
      <h1 className="title-form">Sign In</h1>
      <p className="sousTitle-form">welcome back to tacPro</p>
      <p className="error-form">{error}</p>
      <form onSubmit={onSubmit}>
        <EmailInput
          register={register("email")}
          error={errors.email?.message}
        />
        <PasswordInput
          register={register("password")}
          error={errors.password?.message}
        />

        <SubmitInput isSubmitting={isSubmitting} label="Sign In" />
      </form>
      <p className="have-not-account">
        Don't have an account? <Link to={registerPath}>Sign Up</Link>{" "}
      </p>
      <p className="forgot-password">
        <Link to={ForgetPasswordPath} className="forgot-password">
          Forgot password ?
        </Link>
      </p>
    </motion.div>
  );
};
const LoginEmployer = () => {
  const { register, onSubmit, errors, isSubmitting, error, success } =
    useLoginEmployer();
  return (
    <motion.div
      initial={{ opacity: 0, x: "300px" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="content"
    >
      <h1 className="title-form">Sign In</h1>
      <p className="sousTitle-form">welcome back to tacPro</p>
      <p className="error-form">{error}</p>
      <form onSubmit={onSubmit}>
        <TextInputName
          register={register("userName")}
          error={errors.userName?.message}
        />
        <PasswordInput
          register={register("codeLogin")}
          error={errors.codeLogin?.message}
        />

        <SubmitInput isSubmitting={isSubmitting} label="Sign In" />
      </form>
      <p className="h-10">
       
      </p>
     
    </motion.div>
  );
};

const Select = ({ page }) => {
  switch (page) {
    case "admin":
      return <LoginAdmin />;
    case "employer":
      return <LoginEmployer />;
  }
};
function Login() {
  const [select, setSelect] = useState("admin");
  const onselect = (_) => {
    setSelect(_);
  };

  return (
    <div>
      <div className="flex gap-4">
        <button
          className={`button-login-admin ${select}`}
          onClick={() => onselect("admin")}
        >
          Admin
        </button>
        <button
          className={`button-login-employer ${select}`}
          onClick={() => onselect("employer")}
        >
          Employer
        </button>
      </div>
      <Select page={select} />
    </div>
  );
}

export default Login;
