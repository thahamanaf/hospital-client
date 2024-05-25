import React, { useState } from "react";
import { Table } from "antd";
import OptionDropdown from "../OptionDropdown";
import moment from "moment";
import ViewPrescription from "../ViewPrescription/ViewPrescription";

const OutPatientList = ({ data, fetchOPList }) => {
  const [prescription, setPrescription] = useState();
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patient_name",
      key: "patient_name",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctor_name",
      key: "doctor_name",
      responsive: ["md"],
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      responsive: ["md"],
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      responsive: ["lg"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["lg"],
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
      responsive: ["lg"],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.date).format("DD-MM-YYYY HH:MM A")}</span>
      ),
      responsive: ["lg"],
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
    <>
      {prescription && (
        <ViewPrescription
          isEdit={true}
          fetchOPList={fetchOPList}
          open={!!prescription}
          close={() => setPrescription(null)}
          data={prescription}
        />
      )}
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default OutPatientList;
