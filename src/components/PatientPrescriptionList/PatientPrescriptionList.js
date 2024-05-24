import React, { useState } from "react";
import PatientOPCard from "../PatientOPCard";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import AddPrescription from "../AddPrescription";
import ViewPrescription from "../ViewPrescription";


const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];
const PatientPrescription = () => {
  const navigate = useNavigate();
  const [isAddPrescription, setIsAddPrescription] = useState(false)
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
    },
  ];

  return (
    <div className="p-10">
      {
        isAddPrescription && <AddPrescription open={isAddPrescription} close={() => setIsAddPrescription(false)} />
      }
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
      <div className="flex justify-center">
        <PatientOPCard />
      </div>
      <div className="py-3">
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
};

export default PatientPrescription;
