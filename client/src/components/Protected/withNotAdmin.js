import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "state/AuthSlice";
import "utils/styles/skeleton.scss";
export default function withNotAdmin(Component) {
  return (props) => {
    const user = useSelector(getUser);

    if (user.role === "admin") return <></>;
    return <Component {...props} />;
  };
}
