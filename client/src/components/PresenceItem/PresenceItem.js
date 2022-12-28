import React, { useState } from "react";
import useModel from "Hooks/useModel";
import moment from "moment-timezone";
import * as _date from "utils/service/date";
// * import Component
import { Drawer, PresenceDetail } from "components";

// * import redux and State
import { useSelector } from "react-redux";
import { selectTeamById } from "state/TeamSlice";

// * import styles
import "./PresenceItem.style.scss";

// * function
const loop = (nb) => {
  return Array(nb).fill(" ");
};
const createPresence = (date, daye, id) => {
  const object = {
    _id: id,
    date: _date.getDateDayFormat(date, daye),
    timeStart: _date.getDateSatrtDayFormat(date, daye),
    timeEnd: _date.getDateDayAddHourFormat(date, daye, 4),
    status: "Not-Work",
    commit: "",
    add: true,
  };
  return object;
};

// * Component
const ListeDate = ({ presence, employers, date }) => {
  const { openModal, handleCloseModal, handleOpenModal } = useModel();
  const [selected, setSelected] = useState();

  const condition = (days) =>
    moment(employers.dateStart).isAfter(_date.getDateDayFormat(date, days));

  const selectPresence = (days) => {
    return presence.find((i) => _date.same(i.date, days, date));
  };

  const onClick = (days) => {
    handleOpenModal();
    setSelected(
      selectPresence(days) || createPresence(date, days, employers._id)
    );
  };
  return (
    <>
      {loop(_date.numberDayofMonth(date)).map((_, index) => {
        const { status } = selectPresence(index) || "";
        return (
          <button
            onClick={() => onClick(index)}
            key={index}
            disabled={condition(index)}
            className={`daye ${status} ${condition(index) && "sup"}`}
          >
            {index + 1}
          </button>
        );
      })}
      <Drawer open={openModal} onClose={handleCloseModal}>
        <PresenceDetail data={selected} employers={employers} />
      </Drawer>
    </>
  );
};

const PresenceItem = ({ presence, employer, date }) => {
  const employers = useSelector((state) => selectTeamById(state, employer));
  const endOfMonth = moment(date).endOf("month").format("YYYY-MM-DD");

  return (
    <div className="presence-item">
      <div className="header">
        <h1 className="titel-item">{employers.name}</h1>
        <span className="periode">
          De {date} A {endOfMonth}
        </span>
      </div>
      <div className="date">
        <ListeDate presence={presence} employers={employers} date={date} />
      </div>
    </div>
  );
};
export default PresenceItem;
