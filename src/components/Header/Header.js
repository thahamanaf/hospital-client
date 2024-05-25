import React, { useState } from "react";
import Avatar from "../Avatar";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import Sidebar from "../Sidebar";
import OptionDropdows from "../OptionDropdown";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSidebar] = useState(false);
  const toggleSideBar = () => {
    setIsSidebar((prev) => !prev);
  };
  const user = useSelector((state) => state.auth.profile);
  const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`;

  const logout = async () => {
    axios.post("auth/logout").then(() => {
      navigate("/", { replace: true });
    });
  };

  const menuOptions = [
    {
      title: "Logout",
      icon: <img src="/images/logout-icon.svg" />,
      action: logout,
    },
  ];
  return (
    <div className="border shadow-sm h-16 bg-white sticky top-0 z-50 w-dvw md:w-[calc(100dvw-97px)]">
      <SlidingPane
        className="sliding-panel-sidebar"
        shouldCloseOnEsc={true}
        from="left"
        isOpen={isSideBarOpen}
        onRequestClose={() => setIsSidebar(false)}
      >
        <Sidebar open={true} toggleSideBar={toggleSideBar} />
      </SlidingPane>

      <div className="flex justify-between items-center h-full">
        <div>
          <button className="md:hidden" type="button" onClick={toggleSideBar}>
            <ListBulletIcon width={25} className="mx-5" />
          </button>
        </div>
        <div className="flex items-center justify-end h-full px-5">
          <span className="font-medium text-sm px-2">{fullName}</span>

          <OptionDropdows
            menuBtn={
              <div>
                <Avatar />
              </div>
            }
            menuList={menuOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
