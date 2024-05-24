import React from "react";
import HospitalLogo from "../HospitalLogo";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  UserCircleIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "Home",
    icon: <HomeIcon width={60} height={40} />,
    link: "/dashboard",
    allowedRoles: [],
  },
  {
    name: "OP",
    icon: <Squares2X2Icon width={60} height={40} />,
    link: "out-patient",
    allowedRoles: [],
  },
  {
    name: "Patients",
    icon: <UserCircleIcon width={60} height={40} />,
    link: "patients",
    allowedRoles: [],
  },
  {
    name: "Staffs",
    icon: <UserGroupIcon width={60} height={40} />,
    link: "staffs",
    allowedRoles: [],
  },
];
const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="border flex flex-col items-center py-3 gap-3 w-24 bg-teal-600 text-white border-r-gray-300 min-h-dvh h-full">
      <HospitalLogo className="w-16" />
      {menuItems.map((menu, index) => {
        const isActiveRoute =
          location?.pathname === menu?.link ||
          location?.pathname?.split("/")?.[2] === menu?.link;
        return (
          <Link
            key={`${index}_menu_item_sidebar`}
            to={menu.link}
            className={`border rounded-md shadow-md  mx-2 ${
              isActiveRoute && "bg-white text-black"
            } hover:bg-white hover:text-black`}
          >
            <div className="flex flex-col items-center">
              {menu.icon}
              <span className="font-semibold text-center text-sm hover:text-black cursor-pointer">
                {menu.name}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
