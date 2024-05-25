import React, { useState, useEffect } from "react";
import OutPatientList from "../../components/OutPatientList";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import NewOP from "../../components/NewOP";
import moment from "moment";
import useAxios from "../../hooks/useAxios";
import AddPatient from "../../components/AddPatient";

const OutPatient = () => {
  const axios = useAxios();
  const today = moment().format("YYYY-MM-DD");
  const [isNewOP, setIsNewOP] = useState(false);
  const [opList, setOpList] = useState([]);
  const [isAddPatient, setAddPatient] = useState(false);

  const fetchOPList = async (controller) => {
    const result = await axios
      .get(`patient/op-list?date=${today}`, controller)
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      setOpList(result?.data?.result);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchOPList({ signal: controller.signal });
    return () => {
      controller.abort();
    };
  }, []);

  const handleOpenNewPatient = () => {
    setIsNewOP(false);
    setAddPatient(true);
  };
  return (
    <div className="p-10">
      {isAddPatient && (
        <AddPatient open={isAddPatient} close={() => setAddPatient(false)} />
      )}
      {isNewOP && (
        <NewOP
          handleOpenNewPatient={handleOpenNewPatient}
          open={isNewOP}
          close={() => setIsNewOP(false)}
        />
      )}
      <div className="flex justify-between items-center">
        <h1 className="font-semibold md:text-xl">Out Patients({today})</h1>
        <button onClick={() => setIsNewOP(true)} type="button" className=" btn">
          <DocumentTextIcon width={20} fill="#ffffff" className="mr-1" />
          New OP
        </button>
      </div>
      <div className="py-3">
        <OutPatientList fetchOPList={fetchOPList} data={opList} />
      </div>
    </div>
  );
};

export default OutPatient;
