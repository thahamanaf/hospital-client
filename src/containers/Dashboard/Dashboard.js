import React, { useEffect, useState } from "react";
import WidgetCard from "../../components/WidgetCard";
import useAxios from "../../hooks/useAxios";

const colors = ["#ec407a", "#43a047", "#2e87ec", "#37373d", "#fa9714"];

const Dashboard = () => {
  const axios = useAxios();
  const [statitics, setStatitics] = useState([
    {
      key: "total_doctor_count",
      title: "Total Count of Doctors",
      value: "0",
    },
    {
      key: "total_nurse_count",
      title: "Total Count of Nurse",
      value: "0",
    },
    {
      key: "total_patient_count",
      title: "Total Count of Patients",
      value: "0",
    },
    {
      key: "op_patient_count",
      title: "Count of Out Patients (today)",
      value: "0",
    },
    {
      key: "active_doctor_count",
      title: "Active Doctors",
      value: "0",
    },
  ]);
  const fetchStatitics = async (control) => {
    const result = await axios
      .get("auth/statitics", control)
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      const data = result?.data?.result[0] || {};
      setStatitics((prev) =>
        prev.map((item) => {
          const getValue = data[item.key];
          return {
            ...item,
            value: getValue || item.value,
          };
        })
      );
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchStatitics({ signal: controller.signal });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className="p-10">
      <div className="flex flex-wrap gap-5 justify-around">
        {statitics.map((item, index) => (
          <WidgetCard
            key={index}
            style={{
              backgroundColor: colors[index],
              color: "#ffffff",
            }}
          >
            <div
              className="flex font-medium flex-col text-sm justify-center items-center"
              key={`${index + 2}_widget card`}
            >
              <span className="text-white ">{item.title}</span>
              <span className="text-white">Count: {item.value}</span>
            </div>
          </WidgetCard>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
