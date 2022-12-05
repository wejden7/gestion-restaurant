import React from "react";
import { getUser, getloding } from "state/AuthSlice";
import { useSelector } from "react-redux";
import { DashboardContext } from "context/contextDaschboard";
import { error } from "pages";
export default function withAuthentification(Component) {
  return (props) => {
    const user = useSelector(getUser);
    const loding = useSelector(getloding);
    if (loding) return <div>loding</div>;

    if (!user) return <error.NotFound />;

    if (user)
      return (
        <DashboardContext>
          <Component {...props} user={user} />
        </DashboardContext>
      );
  };
}
