import React, { useEffect } from "react";
import { getUser, getloding, getOut } from "state/AuthSlice";
import { Error404Path } from "utils/router/path.utils";
import { useSelector } from "react-redux";
import { DashboardContext } from "context/contextDaschboard";
import { Loder } from "components";
import { useNavigate } from "react-router-dom";

export default function withAuthentification(Component) {
  return (props) => {
    const user = useSelector(getUser);
    const loding = useSelector(getloding);
    const out = useSelector(getOut);
    const navigate = useNavigate();

    useEffect(() => {
      if (!user && !loding && !out) navigate(Error404Path);
      else if (!user && !loding && out) navigate("/");
    }, [user, loding, out]);

    if (loding) return <Loder />;

    if (user)
      return (
        <DashboardContext>
          <Component {...props} user={user} />
        </DashboardContext>
      );
  };
}
