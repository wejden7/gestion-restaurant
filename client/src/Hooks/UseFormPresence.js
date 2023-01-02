import React, { useState } from "react";
import moment from "moment-timezone";
import { socket } from "utils/service/socket";
//* import react hook from and yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//* import from state
import { updatePresenceApi, createPresenceApi } from "utils/apis/presence.api";

const validationSchema = Yup.object().shape({
  timeStart: Yup.date()
    .typeError("Must be a number type")
    .required("hour Worked is reqired"),
  timeEnd: Yup.date()
    .typeError("Must be a number type")
    .required("hour Worked is reqired"),
  status: Yup.string().required("Name Poste is reqired"),
});

export default function useFormPresence(dataDefault, update) {
  let option = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      timeStart: moment(dataDefault.timeStart).format("yyyy-MM-DDTHH:mm"),
      timeEnd: moment(dataDefault.timeEnd).format("yyyy-MM-DDTHH:mm"),
      status: dataDefault.status,
      commit: dataDefault.commit,
      date: moment(dataDefault.date).format("yyyy-MM-DDTHH:mm"),
    },
  };
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, reset, control } = useForm(option);
  const { errors, isSubmitting } = formState;

  const onClickCreate = async (data) => {
    return await createPresenceApi(dataDefault._id, data);
  };
  const onClickUpdate = async (data) => {
    return await updatePresenceApi(dataDefault._id, data);
    // get id of user
  };
  const onSubmit = handleSubmit(async (data, e) => {
    e.preventDefault();
    console.log(data);
    try {
      update ? await onClickUpdate(data) : await onClickCreate(data);
      socket.emit("UPDATE-PRESENCE", "63ad6b033749be33f60dbf97");
    } catch (error) {
      console.log(error);
    }
  });

  return {
    register,
    onSubmit,
    errors,
    isSubmitting,
    error,
    success,
    control,
  };
}
