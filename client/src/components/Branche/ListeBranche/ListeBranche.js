import React, { useState } from "react";
import { Branche } from "components";
import Tooltip from "@mui/material/Tooltip";
// * import react redux and stata
import { useSelector, useDispatch } from "react-redux";
import {
  getBranches,
  deleteBranche,
  openCloseZoneBranche,
} from "state/SettingSlice";

import "./ListeBranche.style.scss";
const ListeBranche = () => {
  const dispatch = useDispatch();
  const branches = useSelector(getBranches);
  const [idApdate, setIdUpdate] = useState();

  const onDeleteBranche = (id) => {
    dispatch(deleteBranche(id))
      .unwrap()
      .then((e) => console.log(e))
      .catch((e) => console.log(e));
  };
  const onAnnuler = () => {
    setIdUpdate(null);
  };
  const onUpdate = (id) => {
    setIdUpdate(id);
  };

  const onOpenCloseZone = async (id) => {
    await dispatch(openCloseZoneBranche(id))
      .unwrap()
      .then((e) => console.log(e))
      .catch((e) => console.log(e));
  };

  return (
    <div className="liste-branche">
      {branches.map(({ label, zones, _id }, index) => (
        <div key={index} className="grid gap-2">
          <div key={index} className="item-branche">
            <h1 className="titel">{label}</h1>
            <ul>
              {zones.map(({ label, ferme, _id }, index) => (
                <Tooltip key={index} title={` ${ferme ? "ouvrir" : "ferme"}`}>
                  <button
                    onClick={() => onOpenCloseZone(_id)}
                    className={`btn-ul ${ferme && "ferme"}`}
                  >
                    {label}
                  </button>
                </Tooltip>
              ))}
            </ul>
            <button
              onClick={() => onDeleteBranche(_id)}
              className="btn-item-branche delete"
            >
              Delete
            </button>
            <button
              onClick={() => onUpdate(_id)}
              className="btn-item-branche update"
            >
              {" "}
              Update
            </button>
          </div>
          {idApdate === _id && (
            <Branche.UpdateBranche id={_id} annuler={onAnnuler} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ListeBranche;
