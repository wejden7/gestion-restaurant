import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { login } from "state/AuthSlice";
import { useDispatch } from "react-redux";
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is reqired"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "should be 8 chars minimum. "),
});

const user = {
  email: "",
  password: "",
};
const formOption = {
  resolver: yupResolver(validationSchema),
  defaultValues: user,
};
export default function useLogin() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm(formOption);
  const { errors, isSubmitting } = formState;
  const dispatch = useDispatch()

  const onSubmit = handleSubmit(async (data) => {
     dispatch(login(data))
      .unwrap()
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
