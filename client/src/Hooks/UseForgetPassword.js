import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { forgotPasswordApi } from "utils/apis/auth.api";
import { useNavigate } from "react-router-dom";
import {VerificationCodePAth} from 'utils/router/path.utils'
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is reqired"),
});

const user = {
  email: "",
};
const formOption = {
  resolver: yupResolver(validationSchema),
  defaultValues: user,
};
export default function useForgotPassword() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm(formOption);
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    await forgotPasswordApi(data)
      .then((resualt) => {
        console.log(resualt);
        navigate(VerificationCodePAth, { state: { email: resualt.data } });
        setSuccess(true);
        reset();
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error.errors);
      });
  });

  return { register, onSubmit, errors, isSubmitting, error, success };
}
