import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { updatePasswordCodeApi } from "utils/apis/auth.api";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "should be 8 chars minimum. "),
});

const defaultPassword = {
  password: "",
};
const formOption = {
  resolver: yupResolver(validationSchema),
  defaultValues: defaultPassword,
};

export default function useUpdatePassword(token) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm(formOption);
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    await updatePasswordCodeApi(data, token)
      .then((resualt) => {
        console.log(resualt);
        setSuccess(true);
        reset();
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  });

  return { register, onSubmit, errors, isSubmitting, error, success };
}
