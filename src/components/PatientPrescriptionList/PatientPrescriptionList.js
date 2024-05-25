import React, { useEffect, useState } from "react";
import PatientOPCard from "../PatientOPCard";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "antd";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import AddPrescription from "../AddPrescription";
import ViewPrescription from "../ViewPrescription";
import useAxios from "../../hooks/useAxios";
import moment from "moment";
import OptionDropdown from "../OptionDropdown";

const PatientPrescription = () => {
  const axios = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAddPrescription, setIsAddPrescription] = useState(false);
  const [history, setHistory] = useState([]);
  const [patient] = history;
  const [prescription, setPrescription] = useState();
  const fetchPatientMedicalHistory = async (control) => {
    const result = await axios
      .get(`patient/medical-history/${id}`, control)
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      setHistory(result.data.result);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchPatientMedicalHistory({ signal: controller.signal });
    return () => {
      controller.abort();
    };
  }, [id]);

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "doctor_name",
      key: "doctor_name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.date).format("DD-MM-YYYY HH:MM A")}</span>
      ),
    },

    {
      title: "Options",
      dataIndex: "options",
      key: "options",
      render: (_, item) => (
        <OptionDropdown
          menuList={[
            {
              title: "View Prescription",
              icon: "",
              action: () => setPrescription(item),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="p-10">
      {isAddPrescription && (
        <AddPrescription
          open={isAddPrescription}
          close={() => setIsAddPrescription(false)}
        />
      )}
      {prescription && (
        <ViewPrescription
          open={!!prescription}
          close={() => setPrescription(null)}
          data={prescription}
        />
      )}
      <div className="flex justify-between">
        <button
          className="underline hover:text-teal-600"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
        <button className="btn " onClick={() => setIsAddPrescription(true)}>
          <DocumentPlusIcon width={25} fill="#ffffff" className="mr-1" />
          New OP
        </button>
      </div>
      <div className="py-5">
        <div className="flex justify-center">
          <PatientOPCard data={patient} />
        </div>
        <div className="py-3">
          <Table dataSource={history} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default PatientPrescription;
