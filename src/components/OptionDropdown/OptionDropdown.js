import React, { Fragment } from "react";
import {
  Menu,
  Transition,
  MenuItem,
  MenuButton,
  MenuItems,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

const OptionDropdown = ({ menuList, menuBtn }) => {
  const menu = Array.isArray(menuList) ? menuList : [];
  return (
    <Menu as="div" className="relative inline-block text-left select-none">
      <div>
        <MenuButton className="inline-flex w-full justify-center py-2 text-sm  text-gray-700 hover:bg-gray-50">
          { menuBtn || <EllipsisVerticalIcon width={25} />}
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none select-none">
          <div className="py-1">
            {menu.map((item, index) => (
              <MenuItem key={`${index}_option_dropdown_${item.title}`}>
                <div
                  onClick={item.action}
                  className={
                    "text-gray-700  flex cursor-pointer hover:font-medium p-3 gap-2 hover:bg-gray-100"
                  }
                >
                  {item.icon}
                  {item.title}
                </div>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default OptionDropdown;
