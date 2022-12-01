import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { registerApi } from "utils/apis/auth.api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is reqired"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "should be 8 chars minimum. "),
});

const user = {
  name: "",
  email: "",
  password: "",
};
const formOption = {
  resolver: yupResolver(validationSchema),
  defaultValues: user,
};
export default function useRegister() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm(formOption);
  const { errors, isSubmitting } = formState;

  const onSubmit = handleSubmit(async (data) => {
    await registerApi(data)
      .then((resualt) => {
        console.log(resualt);
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
