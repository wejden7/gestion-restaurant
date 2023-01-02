import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { PresenceItem, MapItem, Input } from "components";
import { UseGetPresence } from "utils/apis/presence.api";
import { useSelector } from "react-redux";
import { selectAllTeam } from "state/TeamSlice";
import moment from "moment-timezone";
import PuffLoader from "react-spinners/PuffLoader";
import { socket } from "utils/service/socket";
import { status } from "utils/Data/Data";
import "./TeamPresence.style.scss";
import UseAutorization from "components/Protected/withAutorization";
const option = (Month) => ({
  defaultValues: { team: "all", mois: Month },
});


const TeamPresence = () => {
  const { InputSelectFilter, InputSelectMois } = Input
  const Month = moment().startOf("month").format("YYYY-MM-DD");
  const teams = useSelector(selectAllTeam);
  const { control, watch } = useForm(option(Month));
  const watchShowTeam = watch("team", "all");
  const watchShowMois = watch("mois", Month);
  const { data, isSuccess, refetch } = UseGetPresence(watchShowTeam);
  useEffect(() => {
    socket.on("RELODE-PRESECE", (room) => {
      console.log("relode client");
      refetch();
    });
  }, []);

  const render = !isSuccess ? (
    <div className="loading">
      <PuffLoader color="#618685" size={100} />
    </div>
  ) : (
    <MapItem items={data} date={watchShowMois}>
      <PresenceItem />
    </MapItem>
  );
  return (
    <div className="presence-team">
      <div className="hedear">
        <h1 className="titel">Presence</h1>

        <div className="filter">
          <InputSelectFilter control={control} name="team" data={teams} />
          <InputSelectMois control={control} name="mois" />
        </div>
      </div>

      <div className="team-presence-containte">
        {render}
        <div className="guide-color">
          {status.map((item) => (
            <div key={item.value} className={`guide-color-item ${item.value}`}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseAutorization(TeamPresence, "select presence");
