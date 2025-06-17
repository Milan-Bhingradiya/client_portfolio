"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean; // Flag indicating whether the sidebar is open
  toggleSidebar: () => void; // Function to toggle the sidebar's visibility
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
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
  const services = [
    { label: "Brand Building", href: "/service/building", color: "bg-[#E94772]/10 text-[#E94772]" },
    { label: "Marketing Strategy", href: "/service/marketing", color: "bg-[#5A87C5]/10 text-[#5A87C5]" },
    { label: "D2C Expert Services", href: "/service/d2c", color: "bg-[#219F89]/10 text-[#219F89]" },
    { label: "Marketing Automation", href: "/service/automation", color: "bg-gradient-to-r from-[#E94772]/10 via-[#5A87C5]/10 to-[#219F89]/10 text-[#5A87C5]" },
  ];
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


        {/* Main menu close button */}
        <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 z-20 text-[#E94772] hover:text-[#219F89] text-2xl font-bold bg-white/80 rounded-full px-3 py-1 shadow border border-[#E94772]/20"
        aria-label="Close menu"
      >
        &times;
      </button>
      
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

          <AnimatePresence>
            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col top-full left-0 bg-white rounded-md w-full overflow-hidden"
              >
                <div className="mt-1 ml-4 bg-white/80 rounded-lg  px-2">
                  {services.map((s) => (
                    <motion.div
                      key={s.href}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={s.href}
                        className={`block p-4 rounded-md m-2 font-semibold ${s.color} hover:scale-105 transition-all duration-200 border border-transparent hover:border-[#5A87C5]/30 ${
                          pathname === s.href
                            ? "ring-1 ring-[#219F89] bg-[#219F89]/10 text-[#219F89]"
                            : ""
                        }`}
                      >
                        {s.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
