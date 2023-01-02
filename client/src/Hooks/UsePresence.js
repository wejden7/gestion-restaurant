import { useState } from "react";
import { socket } from "utils/service/socket";
import { IamQuite, IamPresant } from "state/PresanceSlice";
import { useDispatch } from "react-redux";
export default function usePresence(_) {
  const [status, setStatus] = useState();

  const dispatch = useDispatch();

  const onClickAdd = () => {
    setStatus("clicked");
    setTimeout(async () => {
      await dispatch(IamPresant())
        .unwrap()
        .then((result) => {
          setStatus("succed");
          socket.emit("UPDATE-PRESENCE", "63ad6b033749be33f60dbf97");
        })
        .catch((error) => {
          setStatus("error");
        });
    }, 1000);
  };
  const onClickQuite = () => {
    setStatus("clicked");
    setTimeout(async () => {
      await dispatch(IamQuite())
        .unwrap()
        .then((result) => {
          setStatus("succed");
          socket.emit("UPDATE-PRESENCE", "63ad6b033749be33f60dbf97");
        })
        .catch((error) => {
          setStatus("error");
          console.log(error);
        });
    }, 1000);
  };
  return { status, onClickAdd, onClickQuite };
}
