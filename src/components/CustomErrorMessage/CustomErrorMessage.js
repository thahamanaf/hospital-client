import React from "react";

const CustomErrorMessage = (props) => {
  return (
    <span className={`text-red-600 font-medium text-sm ${props.className}`}>{props.children}</span>
  );
};

export default CustomErrorMessage;
