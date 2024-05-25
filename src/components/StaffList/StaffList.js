import React from "react";
import { Table, Tag } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    responsive: ["lg"],
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (_, item) => {
      return <Tag>{item.role}</Tag>;
    },
    responsive: ["md"],
  },
  {
    title: "Account Status",
    dataIndex: "accountStatus",
    key: "accountStatus",
    render: (_, item) => {
      let status;
      if (Number(item.accountStatus) === 1) {
        status = {
          title: "Active",
          color: "green",
        };
      } else if (Number(item.accountStatus) === 2) {
        status = {
          title: "Pending",
          color: "yellow",
        };
      } else {
        status = {
          title: "In Active",
          color: "red",
        };
      }
      return <Tag color={status.color}>{status.title}</Tag>;
    },
    responsive: ["lg"],
  },
];

const StaffList = ({ data }) => {
  return <Table dataSource={data} columns={columns} />;
};

export default StaffList;
