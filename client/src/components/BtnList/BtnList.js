import React, { useState } from "react";
import BtnLink from "components/BtnLink/BtnLink";

import "./BtnList.style.scss";
import { BsHandIndex } from "react-icons/bs";

function BtnList(props) {
  const [active, setactive] = useState("");
  const { icon, name, links } = props;

  const onClick = () => {
    setactive((l) => (l === "active" ? "" : "active"));
  };

  return (
    <div className={`btn-list ${active}`}>
      <button onClick={onClick} className="btn-list-btn">
      <span>{icon}</span>
        <h1 className="label-link">{name}</h1>
      </button>
      <div className="btn-list-item ">
        {links.map((link,index) => (
          <BtnLink key={index}  name={link.name} icon={link.icon} />
        ))}
      </div>
    </div>
  );
}

export default BtnList;
