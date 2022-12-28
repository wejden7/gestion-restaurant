import React from "react";
import { getUser, getloding } from "state/AuthSlice";
import { useSelector } from "react-redux";
import { DashboardContext } from "context/contextDaschboard";
import { error } from "pages";
import { Loder } from "components";
export default function withAuthentification(Component) {
  return (props) => {
    const user = useSelector(getUser);
    const loding = useSelector(getloding);
    if (loding) return <Loder />;

    if (!user) return <error.NotFound />;

    if (user)
      return (
        <DashboardContext>
          <Component {...props} user={user} />
        </DashboardContext>
      );
  };
}
