import React from "react";

function MapItem({ children, items, ...auther }) {
  const renderItems = items.map((item) =>
    React.cloneElement(children, { key: item._id, ...item, ...auther })
  );
  return <>{renderItems}</>;
}

export default MapItem;
