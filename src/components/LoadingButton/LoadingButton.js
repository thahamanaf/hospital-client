import React from "react";
import { LoaderSpinner } from "../../icons/icons";

const LoadingButton = (props) => {
  return (
    <button
      className={`btn text-[14px] disabled:opacity-100 ${props.class}`}
      disabled
    >
      <LoaderSpinner
        className="w-6 h-6"
      />
      {props.children || "Loading"}
    </button>
  );
};

export default LoadingButton;
