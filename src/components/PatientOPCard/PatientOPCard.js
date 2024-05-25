import React from "react";
import HospitalLogo from "../HospitalLogo";
const PatientOPCard = ({ data }) => {
  const patientName =
    data?.patient_name || `${data?.first_name || ""} ${data?.last_name || ""}`;
  return (
    <div className="border rounded-md bg-white shadow-md max-w-[300px] py-2">
      <div className="flex items-center  gap-5 border-b px-2 pb-2">
        <HospitalLogo className="w-20" />{" "}
        <div className="flex flex-col">
          <span className="font-semibold">Medical Center</span>
          <span className="text-xs">Main road. Trivandrum 989900989</span>
        </div>
      </div>
      <div className="flex gap-5 px-3 py-2 text-sm font-medium">
        <ul>
          <li>Name:</li>
          <li>Age:</li>
          <li>Place:</li>
          <li>Gender:</li>
          <li>Mobile:</li>
        </ul>
        <ul>
          <li>{patientName}</li>
          <li>{data?.age}</li>
          <li>{data?.place}</li>
          <li>{data?.gender}</li>
          <li>{data?.phone}</li>
        </ul>
      </div>
    </div>
  );
};

export default PatientOPCard;
