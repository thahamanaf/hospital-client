import React from "react";

const WidgetCard = (props) => {
  return (
    <div style={props.style} className={`flex flex-col justify-center items-center rounded-md w-52 h-32 border`}>
      {props.children}
    </div>
  );
};

export default WidgetCard;
