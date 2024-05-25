import React, { useEffect, useState } from "react";
import StaffList from "../../components/StaffList";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import AddStaff from "../../components/AddStaff";
import useAxios from "../../hooks/useAxios";

const Staff = () => {
  const [isAddStaff, setIsAddStaff] = useState(false);
  const axios = useAxios();
  const [staffList, setStaffList] = useState([]);

  const fetchStaffList = async (controller) => {
    const result = await axios
      .get("auth/staff-list", controller)
      .then((res) => res)
      .catch((err) => err);
    if (result?.data?.status) {
      const list = result?.data?.result || [];
      const formattedList = list.map((item, index) => ({
        key: index + 1,
        name: `${item.first_name} ${item.last_name}`,
        email: item.email,
        role: item.role_name,
        accountStatus: item.is_active
      }));
      setStaffList(formattedList)
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchStaffList({ signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="p-10">
      {isAddStaff && (
        <AddStaff fetchStaffList={fetchStaffList} open={isAddStaff} close={() => setIsAddStaff(false)} />
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
        <StaffList data={staffList} />
      </div>
    </div>
  );
};

export default Staff;
