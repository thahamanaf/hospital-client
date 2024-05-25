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
import { userRoles } from "../../config/userRoles";
import { useSelector } from "react-redux";

const menuItems = [
  {
    name: "Home",
    icon: <HomeIcon width={60} height={40} />,
    link: "/dashboard",
    allowedRoles: [userRoles.admin, userRoles.doctor, userRoles.nurse],
  },
  {
    name: "OP",
    icon: <Squares2X2Icon width={60} height={40} />,
    link: "out-patient",
    allowedRoles: [userRoles.admin, userRoles.doctor, userRoles.nurse],
  },
  {
    name: "Patients",
    icon: <UserCircleIcon width={60} height={40} />,
    link: "patients",
    allowedRoles: [userRoles.admin, userRoles.doctor, userRoles.nurse],
  },
  {
    name: "Staffs",
    icon: <UserGroupIcon width={60} height={40} />,
    link: "staffs",
    allowedRoles: [userRoles.admin],
  },
];
const Sidebar = ({ open, toggleSideBar }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.profile);

  return (
    <div
      className={`${
        open ? "flex" : "hidden w-24"
      } border md:flex flex-col items-center py-3 gap-3  bg-teal-600 text-white border-r-gray-300 min-h-dvh h-full`}
    >
      <HospitalLogo className="w-16" />
      {menuItems.map((menu, index) => {
        const isActiveRoute =
          location?.pathname === menu?.link ||
          location?.pathname?.split("/")?.[2] === menu?.link;
        const isAllowedRole = menu.allowedRoles.includes(Number(user.role_id));
        if (!isAllowedRole) {
          return;
        }
        return (
          <Link
            onClick={() => {
              if (open && toggleSideBar) {
                toggleSideBar();
              }
            }}
            key={`${index}_menu_item_sidebar`}
            to={menu.link}
            className={`border border-gray-800 rounded-md shadow-md  mx-2 ${
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
