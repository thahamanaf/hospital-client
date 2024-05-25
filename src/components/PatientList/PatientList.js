import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import OptionDropdown from "../OptionDropdown";

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

const PatientList = ({ data }) => {
  const navigate = useNavigate();

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
      responsive: ["lg"],

    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
      responsive: ["lg"],
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
      title: "Options",
      dataIndex: "options",
      key: "options",
      render: (_, item) => (
        <OptionDropdown
          menuList={[
            {
              title: "History",
              icon: "",
              action: () => navigate(`/dashboard/patients-history/${item.id}`),
            },
          ]}
        />
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default PatientList;
