import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import OptionDropdown from "../OptionDropdown";

const items = [
  {
    // label: <Link to={`/`}>"Prescriptions"</Link>,
    key: "0",
  },
  {
    label: "2nd option",
    key: "1",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

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

const PatientList = () => {
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
      render: (_, item) => (
        <OptionDropdown
          menuList={[
            {
              title: "History",
              icon: "",
              action:() => navigate(`/dashboard/patients-history/${item.id}`),
            },
          ]}
        />
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default PatientList;
