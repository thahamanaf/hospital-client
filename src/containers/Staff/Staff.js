import React, { useState } from "react";
import StaffList from "../../components/StaffList";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import AddStaff from "../../components/AddStaff";

const Staff = () => {
  const [isAddStaff, setIsAddStaff] = useState(false);
  return (
    <div className="p-10">
      {isAddStaff && (
        <AddStaff open={isAddStaff} close={() => setIsAddStaff(false)} />
      )}
      <div className="flex flex-col">
        <div className="pb-3 flex justify-between items-center">
          <h1 className="font-semibold text-xl">Staff List</h1>
          <button
            type="button"
            onClick={() => setIsAddStaff(true)}
            className="btn "
          >
            <UserGroupIcon width={20} fill="#ffffff" className="mr-1" /> Add
            Staff
          </button>
        </div>
        <StaffList />
      </div>
    </div>
  );
};

export default Staff;
