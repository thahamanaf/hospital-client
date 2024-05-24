import React from "react";
import WidgetCard from "../../components/WidgetCard";

const Dashboard = () => {
  return (
    <div className="p-10">
      <div className="flex flex-wrap justify-around">
        <WidgetCard />
        <WidgetCard />
        <WidgetCard />
        <WidgetCard />
      </div>
    </div>
  );
};

export default Dashboard;
