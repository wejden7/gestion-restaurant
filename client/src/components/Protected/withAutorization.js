import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Error404Path } from "utils/router/pathRouter.util";
import { useSelector } from "react-redux";
import { getUser } from "state/AuthSlice";
import { selectSiAutorized } from "state/AutorizationSlice";
import "utils/styles/skeleton.scss";
export default function withAutorization(Component, select, page) {
  return (props) => {
    const autorize = useSelector((state) => selectSiAutorized(state, select));
    const user = useSelector(getUser);
    const navigate = useNavigate();
    useEffect(() => {
      if (!autorize && !(user.role === "admin") && page) navigate(Error404Path);
    }, [autorize, user]);

    if (autorize || user.role === "admin") return <Component {...props} />;
  };
}
