import React, { useEffect, useState } from "react";
import PatientList from "../../components/PatientList";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import AddPatient from "../../components/AddPatient";
import useAxios from "../../hooks/useAxios";

const Patients = () => {
  const axios = useAxios();
  const [isAddPatient, setIsAddPatient] = useState(false);

  const [patientList, setPatientList] = useState([]);

  const fetchPatientList = async (controller) => {
    const result = await axios
      .get("patient/patient-list", controller)
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      const list = result?.data?.result || [];
      const formattedList = list.map((item, index) => ({
        key: index + 1,
        name: `${item.first_name} ${item.last_name}`,
        ...item,
      }));
      setPatientList(formattedList);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchPatientList({ signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="p-10">
      {isAddPatient && (
        <AddPatient fetchPatientList={fetchPatientList} open={isAddPatient} close={() => setIsAddPatient(false)} />
      )}
      <div className="flex flex-col">
        <div className="pb-3 flex justify-between items-center">
          <h1 className="font-semibold text-xl">Patients</h1>
          <button onClick={() => setIsAddPatient(true)} className="btn">
            <UserCircleIcon width={20} fill="#ffffff" className="mr-1" /> Add
            Patient
          </button>
        </div>
        <div>
          <PatientList data={patientList} />
        </div>
      </div>
    </div>
  );
};

export default Patients;
