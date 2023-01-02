import React, { useEffect } from "react";
import { InputAuth } from "components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  loginPath,
  registerPath,
  Error404Path,
} from "utils/router/path.utils";
import useVerificationCode from "Hooks/UseVerificationCode";
const { TextInputCode, SubmitInput } = InputAuth;

function VerificationCode() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  useEffect(() => {
    if (!state) navigate(Error404Path);
  }, [state]);

  const { register, onSubmit, errors, isSubmitting, error, success } =
    useVerificationCode(state?.email);
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="content"
    >
      <h1 className="title-form">Verifivation Code</h1>
      <p className="sousTitle-form">
        Consultez votre boite mail and entre code de verification. cet code
        valble 1h{" "}
      </p>
      <p className="error-form">{error}</p>
      <form onSubmit={onSubmit}>
        <TextInputCode
          register={register("code")}
          error={errors.code?.message}
        />
        <SubmitInput label="Send" isSubmitting={isSubmitting} />
      </form>
      <p className="have-not-account">
        Already have an account ? <Link to={loginPath}>Sign In</Link>
      </p>
      <p className="have-not-account">
        Don't have an account? <Link to={registerPath}>Sign Up</Link>{" "}
      </p>
    </motion.div>
  );
}

export default VerificationCode;
