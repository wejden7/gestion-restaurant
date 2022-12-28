import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { loginEmployer } from "state/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object().shape({
  userName: Yup.string().required("userName is reqired"),
  codeLogin: Yup.string()
    .required("codeLogin is required")
    .min(8, "should be 8 chars minimum. "),
});

const user = {
  userName: "w",
  codeLogin: "",
};
const formOption = {
  resolver: yupResolver(validationSchema),
  defaultValues: user,
};
export default function useLoginEmployer() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm(formOption);
  const { errors, isSubmitting } = formState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data, e) => {
    e.preventDefault();
    console.log(data);
  await  dispatch(loginEmployer(data))
      .unwrap()
      .then((resualt) => {
        console.log(resualt);
        navigate("/")
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
