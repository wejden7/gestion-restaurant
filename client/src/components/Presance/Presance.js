import React, { useEffect } from "react";
import withNotAdmin from "components/Protected/withNotAdmin";
import usePresence from "Hooks/UsePresence";
import { socket } from "utils/service/socket";
import { checkMePresant, selectSatatus } from "state/PresanceSlice";
import { useSelector, useDispatch } from "react-redux";
import "./Presance.style.scss";

const AddPresance = () => {
  const { status, onClickAdd } = usePresence();

  return (
    <div className="present">
      <h1>Click here to add your presence</h1>

      <button
        disabled={status === "succed"}
        onClick={onClickAdd}
        className={`fingre ${status}`}
      ></button>
    </div>
  );
};

const QuitePresance = () => {
  const { status, onClickQuite } = usePresence();
  return (
    <div className="present">
      <h1>To exit, click here</h1>

      <button
        disabled={status === "succed"}
        onClick={onClickQuite}
        className={`fingre ${status}`}
      ></button>
    </div>
  );
};

const CheckedPresence = ({ satatus }) => {
  return (
    <div className="checked">
      <h1>You are {satatus}</h1>
      <p>
        Your presence has been checked by the system, so go to a supervisor for
        verification
      </p>
    </div>
  );
};

const Presance = () => {
  const satatus = useSelector(selectSatatus);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("RELODE-PRESECE", async (room) => {
      dispatch(checkMePresant());
    });
  }, []);

  let content = !satatus ? (
    <AddPresance />
  ) : satatus === "Work" ? (
    <QuitePresance />
  ) : (
    <CheckedPresence satatus={satatus} />
  );
  return <div className="iam-presant-quite">{content}</div>;
};

export default withNotAdmin(Presance);
