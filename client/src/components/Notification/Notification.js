import React, { useState } from "react";
import "./Notification.style.scss";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  const { title, sousTitle, timeDate, vu } = item;
  return (
    <Link className={`notification-list-item ${vu}`}>
      <span className="item-titel">{title}</span>
      <span className="item-sous-title">{sousTitle} </span>
      <span className="item-time">{timeDate}</span>
    </Link>
  );
};
const data = {
  nbNew: 2,
  notification: [
    {
      title: "Wejden",
      sousTitle:
        "wejden chneti has new mot pass donc is not has belive your schole never nevre",
      timeDate: "11:05 Am",
      vu: "noVu",
    },
    {
      title: "Wejden",
      sousTitle:
        "wejden chneti has new mot pass donc is not has belive your schole never nevre",
      timeDate: "11:05 Am",
      vu: "noVu",
    },
    {
      title: "Wejden",
      sousTitle:
        "wejden chneti has new mot pass donc is not has belive your schole never nevre",
      timeDate: "11:05 Am",
      vu: "vu",
    },
    {
      title: "Wejden",
      sousTitle:
        "wejden chneti has new mot pass donc is not has belive your schole never nevre",
      timeDate: "11:05 Am",
      vu: "vu",
    },
    {
      title: "Wejden",
      sousTitle:
        "wejden chneti has new mot pass donc is not has belive your schole never nevre",
      timeDate: "11:05 Am",
      vu: "vu",
    },
    {
      title: "Wejden",
      sousTitle:
        "wejden chneti has new mot pass donc is not has belive your schole never nevre",
      timeDate: "11:05 Am",
      vu: "vu",
    },
    {
      title: "Wejden",
      sousTitle:
        "wejden chneti has new mot pass donc is not has belive your schole never nevre",
      timeDate: "11:05 Am",
      vu: "vu",
    },
    {
      title: "Wejden",
      sousTitle:
        "wejden chneti has new mot pass donc is not has belive your schole never nevre",
      timeDate: "11:05 Am",
      vu: "vu",
    },
    {
      title: "Wejden",
      sousTitle:
        "wejden chneti has new mot pass donc is not has belive your schole never nevre",
      timeDate: "11:05 Am",
      vu: "vu",
    },
    {
      title: "ala delivre 1 milo d'euro for banc",
      sousTitle:
        "wejden chneti has new mot pass donc is not has belive your schole never nevre",
      timeDate: "12/11/2022 11:05 Am",
      vu: "noVu",
    },
  ],
};
function Notification() {
  const [open, setOpen] = useState(false);
  const { nbNew, notification } = data;
  return (
    <div className="notification">
      <button
        onClick={() => setOpen((l) => !l)}
        count={nbNew}
        className={`notification-btn  ${nbNew && "alert"}`}
      ></button>

      <div className={`notification-list  ${open && "open"} `}>
        <div className="list-titel">
          Notification {nbNew > 0 && <span>{nbNew} new</span>}
        </div>
        <div className="divider" />

        {notification.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Notification;
