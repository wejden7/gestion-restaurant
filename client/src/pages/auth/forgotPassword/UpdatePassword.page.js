import React, { useEffect } from "react";
import { Input } from "../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useUpdatePassword from "Hooks/UseUpdatePassword";
import { AiOutlineCheckCircle } from "react-icons/ai";
const { PasswordInput, SubmitInput } = Input;

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
        Already have an account ? <Link to="/login">Sign In</Link>
      </p>
      <p className="have-not-account">
        Don't have an account? <Link to="/register">Sign Up</Link>{" "}
      </p>
    </motion.div>
  );
};

const UpdatePasswordSuccess = () => {
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
    if (!state) navigate("/login");
  }, [state]);
  const { success, ...useOther } = useUpdatePassword(state?.token);
  return (
    <div className="body">
      {!success ? (
        <UpdatePasworedContent useOther={useOther} />
      ) : (
        <UpdatePasswordSuccess />
      )}
    </div>
  );
}

export default UpdatePassword;
