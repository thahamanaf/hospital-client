import React from "react";

const HospitalLogo = (props) => {
  return (
    <img
      className={`${props.className} rounded-full`}
      src="/images/hospital-logo.png"
    />
  );
};

export default HospitalLogo;
