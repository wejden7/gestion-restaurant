import React, { useState } from "react";
import BtnLink from "components/BtnLink/BtnLink";

import "./BtnList.style.scss";

function BtnList(props) {
  const [active, setactive] = useState("");
  const { icon, name, links } = props;

  const onClick = () => {
    setactive((l) => (l === "active" ? "" : "active"));
  };

  return (
    <div className={`btn-list ${active}`}>
      <button onClick={onClick} className="btn-list-btn">
        {icon}
        <h1>{name}</h1>
      </button>
      <div className="btn-list-item ">
        {links.map((link) => (
          <BtnLink name={link.name} icon={link.icon} />
        ))}
      </div>
    </div>
  );
}

export default BtnList;
