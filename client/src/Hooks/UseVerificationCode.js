import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { verificationCodeApi } from "utils/apis/auth.api";
import { useNavigate } from "react-router-dom";
import {UpdatePasswordPath} from 'utils/router/path.utils'
const validationSchema = Yup.object().shape({
  code: Yup.string().required("Code is reqired"),
});

const defaultCode = {
  code: "",
};
const formOption = {
  resolver: yupResolver(validationSchema),
  defaultValues: defaultCode,
};

export default function useVerificationCode(email) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm(formOption);
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    data.email = email;
    console.log(data);
    await verificationCodeApi(data)
      .then((resualt) => {
        console.log(resualt);
        navigate(UpdatePasswordPath, { state: { token: resualt.token } });
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
