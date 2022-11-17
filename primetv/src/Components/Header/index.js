import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import logo from "../../Images/prime-video-logo.png";
import user from "../../Images/user-icon.png";
import { BsSearch } from "react-icons/bs";
import { navItems } from "../NavItems";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

function Header() {
  const [navBar, setNavBar] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  return (
    <div>
      <header className="fixed top-0 z-50  bg-regal-blue w-[100vw] flex justify-between items-center px-6 sm:px-10 py-4">
        <nav className="flex gap-8 sm:gap-20">
          {/* Logo */}
          <NavLink to="/">
            <img
              className="w-[102px] sm:w-32 cursor-pointer"
              src={logo}
              alt="logo"
            />
          </NavLink>

          <div>
            <ul className="hidden md:flex items-center">
              {navItems.map((item) => {
                return (
                  <li
                    key={item.id}
                    className=" text-yellow-400 p-2 text-xl mr-7"
                  >
                    <NavLink to={item.path}> {item.title} </NavLink>
                  </li>
                );
              })}
            </ul>

            <div
              className="text-gray-400 sm:text-xl md:hidden flex items-center"
              onClick={() => setDropdown(!dropdown)}
            >
              Browse
              <span className="mt-2 ml-1.5">
                {navBar ? (
                  <AiFillCaretUp size="16px" />
                ) : (
                  <AiFillCaretDown size="16px" />
                )}
              </span>
            </div>
          </div>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center gap-2 absolute md:static right-10">
          <NavLink to={"/search"}>
            <span className="cursor-pointer">
              <BsSearch color="white" size="22px" />
            </span>
          </NavLink>

          {/* User-Icon */}
          <img
            className="w-[24px] sm:w-[32px]   ml-2.5 sm:ml-5 cursor-pointer"
            src={user}
            alt="user-icon"
          />
        </div>
      </header>

      {dropdown && (
        <ul className="dropdown-menu absolute z-[60] top-12 translate-x-[-50%] bg-regal-blue  ">
          {navItems.map((item) => {
            return (
              <li
                id={item.id}
                className="w-[100vw] p-2 text-lg text-gray-200 font-medium text-center"
                onClick={() => setDropdown(false)}
              >
                <NavLink to={item.path}> {item.title} </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Header;
