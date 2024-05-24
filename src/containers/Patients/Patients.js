import React, { useState } from "react";
import PatientList from "../../components/PatientList";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import AddPatient from "../../components/AddPatient";

const Patients = () => {
  const [isAddPatient, setIsAddPatient] = useState(false);
  return (
    <div className="p-10">
      {isAddPatient && <AddPatient open={isAddPatient} close={() => setIsAddPatient(false)} />}
      <div className="flex flex-col">
        <div className="pb-3 flex justify-between items-center">
          <h1 className="font-semibold text-xl">Patients</h1>
          <button onClick={() => setIsAddPatient(true)} className="btn">
            <UserCircleIcon width={20} fill="#ffffff" className="mr-1" /> Add
            Patient
          </button>
        </div>
        <div>
          <PatientList />
        </div>
      </div>
    </div>
  );
};

export default Patients;
