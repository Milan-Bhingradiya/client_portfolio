"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface SidebarProps {
  isOpen: boolean; // Flag indicating whether the sidebar is open
  toggleSidebar: () => void; // Function to toggle the sidebar's visibility
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = React.createRef<HTMLDivElement>();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const toggleServicesMenu = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent click from bubbling to sidebar
    setIsServicesOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (sidebarRef.current) {
        const element = sidebarRef.current as HTMLElement;
        // Only close if click is outside the sidebar and not on any sidebar child
        if (!element.contains(event.target)) {
          toggleSidebar();
        }
      }
    };
    if (typeof window !== "undefined" && isOpen) {
      setTimeout(() => {
        window.addEventListener("mousedown", handleClickOutside);
      }, 0); // Delay to avoid immediate close on open
    } else if (typeof window !== "undefined") {
      window.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [isOpen, sidebarRef, toggleSidebar]);
  return (
    <div
      ref={sidebarRef}
      className={`fixed z-30 top-0 right-0 h-full w-[17rem] bg-white shadow-xl transition-transform transform ${
        isOpen ? "-translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 mb-2">
        <h5 className="text-xl font-semibold text-blue-gray-900 m-4 ml-0">
          Menu
        </h5>
      </div>
      <nav className="p-2 text-base font-normal text-blue-gray-700">
        <div className="flex flex-col gap-1">
          {/* <Link
            href={"/work"}
            className="p-3 hover:bg-blue-gray-50"
            role="button"
            onClick={toggleSidebar}
          >
            Work
          </Link> */}

          <Link
            href={"/blogs"}
            className="p-3 hover:bg-blue-gray-50"
            role="button"
            onClick={toggleSidebar}
          >
            Blogs
          </Link>
          <div
            className="p-3 hover:bg-blue-gray-50"
            role="button"
            onClick={toggleServicesMenu}
          >
            <span>Services</span>
            {isServicesOpen ? <ExpandLess /> : <ExpandMore />}
          </div>

          {isServicesOpen && (
            <div className="flex flex-col top-full left-0 border-1 border-blue-gray-300 bg-white shadow-md rounded-md w-full overflow-hidden">
              <Link
                href="/service/design"
                className="p-3 hover:bg-blue-gray-50"
                onClick={toggleSidebar}
              >
                Design
              </Link>
              <Link
                href="/service/technology"
                className="p-3 hover:bg-blue-gray-50"
                onClick={toggleSidebar}
              >
                Technology
              </Link>
              <Link
                href="/service/marketing"
                className="p-3 hover:bg-blue-gray-50"
                onClick={toggleSidebar}
              >
                Marketing
              </Link>
              <Link
                href="/service/consultancy"
                className="p-3 hover:bg-blue-gray-50"
                onClick={toggleSidebar}
              >
                Consultancy
              </Link>
            </div>
          )}

          <Link
            href={"/clients"}
            className="p-3 hover:bg-blue-gray-50"
            role="button"
            onClick={toggleSidebar}
          >
            Clients
          </Link>
          <Link
            href={"/aboutus"}
            className="p-3 hover:bg-blue-gray-50"
            role="button"
            onClick={toggleSidebar}
          >
            About
          </Link>
          <Link
            href={"/contactus"}
            className="p-3 hover:bg-blue-gray-50"
            role="button"
            onClick={toggleSidebar}
          >
            ContactUs
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
