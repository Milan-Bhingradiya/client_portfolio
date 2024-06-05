"use client";

import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { red } from "@mui/material/colors";
import { start } from "repl";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./SIdebar";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/logo.svg";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState("");

  const handleMenuSelect = (menuName: string) => {
    setSelectedMenu(menuName);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleServicesMenu = () => setIsServicesOpen(!isServicesOpen);

  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const toggleAboutMenu = () => setIsAboutOpen(!isAboutOpen);

  // const showAboutMenu = () => setIsAboutOpen(true);
  // const hideAboutMenu = () => setIsAboutOpen(true);
  return (
    <div className="h-[90px] w-[100%] items-center flex ">
      <div className=" mx-5 sm:mx-20 md:mx-26 lg:mx-32  w-[100%]   flex flex-row justify-between items-center">
        <Link href={"/"} className="m-2  text-2xl superBold">
          <Image src={logo} alt="Logo" width={100} height={100}></Image>
        </Link>

        <div className="hidden sm:block  ">
          <div className="flex flex-row gap-4 md:gap-8 lg:gap-10  items-center">
            <Link
              href={"/work"}
              className={selectedMenu === "Work" ? "font-bold" : ""}
              onClick={() => handleMenuSelect("Work")}
            >
              Work
            </Link>
            <div
              onMouseEnter={toggleServicesMenu}
              onMouseLeave={toggleServicesMenu}
              onClick={() => handleMenuSelect("Services")}
              className={
                selectedMenu === "Work"
                  ? "font-bold"
                  : "" +
                    `relative  p-2 rounded-lg ${
                      isServicesOpen ? "text-blue-700" : "text-gray-700"
                    }`
              }
            >
              Services
              {isServicesOpen && (
                <ul className="absolute z-10   top-full text-black left-0 bg-white shadow-md rounded-md w-40 overflow-hidden">
                  <Link href={"/service/design"}>
                    <li className="px-4 py-2 hover:bg-gray-200">Design</li>
                  </Link>
                  <Link href={"/service/technology"}>
                    <li className="px-4 py-2 hover:bg-gray-200">Technology</li>
                  </Link>
                  <Link href={"/service/marketing"}>
                    <li className="px-4 py-2 hover:bg-gray-200">Marketing</li>
                  </Link>
                  <Link href={"/service/consultancy"}>
                    <li className="px-4 py-2 hover:bg-gray-200">Consultancy</li>
                  </Link>
                </ul>
              )}
            </div>
            <Link
              href={"/clients"}
              className={selectedMenu === "Clients" ? "font-bold" : ""}
              onClick={() => handleMenuSelect("Clients")}
            >
              Clients
            </Link>

            <div
              onMouseEnter={toggleAboutMenu}
              onMouseLeave={toggleAboutMenu}
              onClick={() => handleMenuSelect("About")}
              className={`relative ${
                isAboutOpen
                  ? "text-blue-700"
                  : "text-gray-700" + selectedMenu === "About"
                  ? "font-bold"
                  : " "
              }`}
            >
              About
              {isAboutOpen && (
                <ul className="absolute top-full text-black left-0 bg-white shadow-md rounded-md w-40 overflow-hidden">
                  <Link href={"/aboutus"}>
                    <li className="px-4 py-2 hover:bg-gray-200">About us</li>
                  </Link>
                  <Link href={"/aboutteam"}>
                    <li className="px-4 py-2 hover:bg-gray-200">Team</li>
                  </Link>
                  <Link href={"/career"}>
                    <li className="px-4 py-2 hover:bg-gray-200">Career</li>
                  </Link>
                </ul>
              )}
            </div>

            <Link href={"/contactus"}>
              <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Contact
              </button>
            </Link>
          </div>
        </div>

        <div className="m-2  block sm:hidden" onClick={toggleSidebar}>
          <MenuIcon></MenuIcon>
        </div>
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}></Sidebar>
    </div>
  );
};

export default Navbar;
