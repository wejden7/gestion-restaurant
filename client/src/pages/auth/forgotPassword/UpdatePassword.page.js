import React, { useEffect } from "react";
import { InputAuth } from "components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useUpdatePassword from "Hooks/UseUpdatePassword";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {loginPath,registerPath,Error404Path}from 'utils/router/path.utils'
const { PasswordInput, SubmitInput } = InputAuth;

const UpdatePasworedContent = ({ useOther }) => {
  const { register, onSubmit, errors, isSubmitting, error } = useOther;
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="content"
    
    >
      <h1 className="title-form">Reset password</h1>
      <p className="sousTitle-form">Entre new password </p>
      <p className="error-form">{error}</p>
      <form onSubmit={onSubmit}>
        <PasswordInput
          register={register("password")}
          error={errors.password?.message}
        />
        <SubmitInput label="Save" isSubmitting={isSubmitting} />
      </form>
      <p className="have-not-account">
        Already have an account ? <Link to={loginPath}>Sign In</Link>
      </p>
      <p className="have-not-account">
        Don't have an account? <Link to={registerPath}>Sign Up</Link>{" "}
      </p>
    </motion.div>
  );
};

const UpdatePasswordSuccess = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(loginPath);
  };
  return (
    <div className="content-success">
      <div className="success-top">
        <AiOutlineCheckCircle className="register-success-icon" />
      </div>
      <div className="success-bottom">
        <p className="text">
          Congratulation, Your password has been successfully updateed.
        </p>
        <button onClick={onClick} type="button">
          Sign In
        </button>
      </div>
    </div>
  );
};
function UpdatePassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!state) navigate(Error404Path);
  }, [state]);
  const { success, ...useOther } = useUpdatePassword(state?.token);
  return (
 
      !success ? (
        <UpdatePasworedContent useOther={useOther} />
      ) : (
        <UpdatePasswordSuccess />
      )
  
  );
}

export default UpdatePassword;
