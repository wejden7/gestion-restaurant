import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./Loder.style.scss";
const Loader = () => {
  return (
    <div className="loader-component">
      <span>
        <ScaleLoader color="#243454" width={8} height={80} />
      </span>
    </div>
  );
};

export default Loader;
