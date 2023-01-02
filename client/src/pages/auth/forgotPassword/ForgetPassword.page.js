import React from "react";
import { InputAuth } from "components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {loginPath,registerPath} from 'utils/router/path.utils'
import useForgotPassword from "Hooks/UseForgetPassword";
const { EmailInput, SubmitInput } = InputAuth;

function ForgetPassword() {
  const { register, onSubmit, errors, isSubmitting, error, success } =
    useForgotPassword();
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="content"
    >
      <h1 className="title-form">Forgot Password</h1>
      <p className="sousTitle-form">Enter your email </p>
      <p className="error-form">{error}</p>
      <form onSubmit={onSubmit}>
        <EmailInput
          register={register("email")}
          error={errors.email?.message}
        />
        <SubmitInput label="Send" isSubmitting={isSubmitting} />
      </form>
      <p className="have-not-account">
        Already have an account ? <Link to={loginPath}>Sign in</Link>
      </p>
      <p className="have-not-account">
        Don't have an account? <Link to={registerPath}>Sign Up</Link>{" "}
      </p>
    </motion.div>
  );
}

export default ForgetPassword;
//L’adresse mail est inconnue.
//Le mot de passe est incorrect
//La connexion a échouée, merci de réessayer
//Merci de consulter la boite mail renseignée pour récupérer votre mot de passe
//Cette adresse mail n’existe pas dans notre système
//Consultez votre boite mail pour poursuivre l’inscription.
