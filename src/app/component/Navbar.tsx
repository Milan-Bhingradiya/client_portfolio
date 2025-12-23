"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/logo.svg";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuSelect = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [servicesClicked, setServicesClicked] = useState(false);

  const openServicesMenu = () => setIsServicesOpen(true);
  const closeServicesMenu = () => setIsServicesOpen(false);

  const handleServicesClick = () => {
    setServicesClicked(true);
    setIsServicesOpen(true);
    handleMenuSelect("Services");
  };

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const toggleAboutMenu = () => setIsAboutOpen(!isAboutOpen);

  const pathname = usePathname();

  // Detect if current page has dark background
  const isDarkPage = pathname.startsWith("/work");

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic classes based on dark page and scroll state
  const navbarBg = isDarkPage
    ? isScrolled
      ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
      : "bg-transparent"
    : isScrolled
    ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
    : "bg-transparent";

  const textColor = isDarkPage ? "text-white" : "text-gray-800";
  const textHoverColor = isDarkPage
    ? "hover:text-violet-300"
    : "hover:text-violet-600";
  const activeColor = isDarkPage ? "text-violet-400" : "text-violet-600";

  const dropdownBg = isDarkPage
    ? "bg-gray-900/95 backdrop-blur-xl border border-white/10"
    : "bg-white/95 backdrop-blur-xl border border-gray-200";
  const dropdownText = isDarkPage ? "text-white" : "text-gray-800";
  const dropdownHover = isDarkPage ? "hover:bg-white/10" : "hover:bg-gray-100";

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 h-[80px] w-full flex items-center transition-all duration-300",
        navbarBg
      )}
    >
      <div className="mx-5 sm:mx-20 md:mx-26 lg:mx-32 w-full flex flex-row justify-between items-center">
        {/* Logo */}
        <Link href={"/"} className="m-2 text-2xl superBold">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
              "transition-all duration-300",
              isDarkPage && "brightness-0 invert" // Invert logo colors for dark pages
            )}
          >
            <Image src={logo} alt="Logo" width={100} height={100} />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:block">
          <div className="flex flex-row gap-4 md:gap-8 lg:gap-10 items-center">
            {/* Work Link */}
            <Link
              href={"/work"}
              className={clsx(
                "relative py-2 font-medium transition-all duration-300",
                textColor,
                textHoverColor,
                pathname.startsWith("/work") && activeColor,
                pathname.startsWith("/work") && "font-semibold"
              )}
              onClick={() => handleMenuSelect("Work")}
            >
              Work
              {pathname.startsWith("/work") && (
                <motion.div
                  layoutId="activeIndicator"
                  className={clsx(
                    "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full",
                    isDarkPage ? "bg-violet-400" : "bg-violet-600"
                  )}
                />
              )}
            </Link>

            {/* Blog Link */}
            <Link
              href={"/blogs"}
              className={clsx(
                "relative py-2 font-medium transition-all duration-300",
                textColor,
                textHoverColor,
                pathname.startsWith("/blogs") && activeColor,
                pathname.startsWith("/blogs") && "font-semibold"
              )}
              onClick={() => handleMenuSelect("Blog")}
            >
              Blogs
              {pathname.startsWith("/blogs") && (
                <motion.div
                  layoutId="activeIndicator"
                  className={clsx(
                    "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full",
                    isDarkPage ? "bg-violet-400" : "bg-violet-600"
                  )}
                />
              )}
            </Link>

            {/* Services Dropdown */}
            <div
              onMouseEnter={openServicesMenu}
              onMouseLeave={closeServicesMenu}
              onClick={handleServicesClick}
              className={clsx(
                "relative py-2 cursor-pointer font-medium transition-all duration-300",
                textColor,
                textHoverColor,
                pathname.startsWith("/service") && activeColor,
                pathname.startsWith("/service") && "font-semibold"
              )}
            >
              <span className="flex items-center gap-1">
                Services
                <svg
                  className={clsx(
                    "w-4 h-4 transition-transform duration-200",
                    isServicesOpen && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>

              {pathname.startsWith("/service") && (
                <motion.div
                  layoutId="activeIndicator"
                  className={clsx(
                    "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full",
                    isDarkPage ? "bg-violet-400" : "bg-violet-600"
                  )}
                />
              )}

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={clsx(
                      "absolute z-50 top-full mt-2 left-0 rounded-xl w-48 overflow-hidden shadow-xl",
                      dropdownBg
                    )}
                  >
                    <li>
                      <Link
                        href={"/service/building"}
                        className={clsx(
                          "block px-4 py-3 transition-colors",
                          dropdownText,
                          dropdownHover,
                          pathname === "/service/building" && activeColor
                        )}
                      >
                        Brand Building
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/service/marketing"}
                        className={clsx(
                          "block px-4 py-3 transition-colors",
                          dropdownText,
                          dropdownHover,
                          pathname === "/service/marketing" && activeColor
                        )}
                      >
                        Marketing Strategy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/service/d2c"}
                        className={clsx(
                          "block px-4 py-3 transition-colors",
                          dropdownText,
                          dropdownHover,
                          pathname === "/service/d2c" && activeColor
                        )}
                      >
                        Cracking D2C
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/service/automation"}
                        className={clsx(
                          "block px-4 py-3 transition-colors",
                          dropdownText,
                          dropdownHover,
                          pathname === "/service/automation" && activeColor
                        )}
                      >
                        Marketing Automation
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Clients Link */}
            <Link
              href={"/clients"}
              className={clsx(
                "relative py-2 font-medium transition-all duration-300",
                textColor,
                textHoverColor,
                pathname === "/clients" && activeColor,
                pathname === "/clients" && "font-semibold"
              )}
              onClick={() => handleMenuSelect("Clients")}
            >
              Clients
              {pathname === "/clients" && (
                <motion.div
                  layoutId="activeIndicator"
                  className={clsx(
                    "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full",
                    isDarkPage ? "bg-violet-400" : "bg-violet-600"
                  )}
                />
              )}
            </Link>

            {/* About Dropdown */}
            <div
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
              onClick={() => handleMenuSelect("About")}
              className={clsx(
                "relative py-2 cursor-pointer font-medium transition-all duration-300",
                textColor,
                textHoverColor,
                (pathname === "/aboutus" ||
                  pathname === "/aboutteam" ||
                  pathname === "/career") &&
                  activeColor
              )}
            >
              <span className="flex items-center gap-1">
                About
                <svg
                  className={clsx(
                    "w-4 h-4 transition-transform duration-200",
                    isAboutOpen && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>

              <AnimatePresence>
                {isAboutOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={clsx(
                      "absolute z-50 top-full mt-2 left-0 rounded-xl w-40 overflow-hidden shadow-xl",
                      dropdownBg
                    )}
                  >
                    <li>
                      <Link
                        href={"/aboutus"}
                        className={clsx(
                          "block px-4 py-3 transition-colors",
                          dropdownText,
                          dropdownHover,
                          pathname === "/aboutus" && activeColor
                        )}
                      >
                        About us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/aboutteam"}
                        className={clsx(
                          "block px-4 py-3 transition-colors",
                          dropdownText,
                          dropdownHover,
                          pathname === "/aboutteam" && activeColor
                        )}
                      >
                        Team
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/career"}
                        className={clsx(
                          "block px-4 py-3 transition-colors",
                          dropdownText,
                          dropdownHover,
                          pathname === "/career" && activeColor
                        )}
                      >
                        Career
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Button */}
            <Link href={"/contactus"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={clsx(
                  "font-semibold py-2.5 px-6 rounded-full transition-all duration-300",
                  isDarkPage
                    ? "bg-white text-gray-900 hover:bg-violet-100"
                    : "bg-gray-900 text-white hover:bg-violet-600"
                )}
              >
                Contact
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={clsx(
            "m-2 block sm:hidden cursor-pointer p-2 rounded-lg transition-colors",
            isDarkPage
              ? "text-white hover:bg-white/10"
              : "text-gray-800 hover:bg-gray-100"
          )}
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 sm:hidden"
              onClick={toggleSidebar}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 sm:hidden bg-white shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Image src={logo} alt="Logo" width={80} height={40} />
                <button onClick={toggleSidebar} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4 overflow-y-auto h-[calc(100%-72px)]">
                <div className="space-y-1">
                  <Link
                    href="/work"
                    onClick={toggleSidebar}
                    className="block py-3 px-4 rounded-lg text-gray-800 hover:bg-gray-100 font-medium"
                  >
                    Work
                  </Link>
                  <Link
                    href="/blogs"
                    onClick={toggleSidebar}
                    className="block py-3 px-4 rounded-lg text-gray-800 hover:bg-gray-100 font-medium"
                  >
                    Blogs
                  </Link>
                  <Link
                    href="/clients"
                    onClick={toggleSidebar}
                    className="block py-3 px-4 rounded-lg text-gray-800 hover:bg-gray-100 font-medium"
                  >
                    Clients
                  </Link>
                </div>
                <div className="mt-6">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase mb-2">
                    Services
                  </p>
                  <Link
                    href="/service/marketing"
                    onClick={toggleSidebar}
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Marketing Strategy
                  </Link>
                  <Link
                    href="/service/building"
                    onClick={toggleSidebar}
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Brand Building
                  </Link>
                  <Link
                    href="/service/automation"
                    onClick={toggleSidebar}
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Automation
                  </Link>
                  <Link
                    href="/service/d2c"
                    onClick={toggleSidebar}
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cracking D2C
                  </Link>
                </div>
                <div className="mt-6">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase mb-2">
                    Company
                  </p>
                  <Link
                    href="/aboutus"
                    onClick={toggleSidebar}
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/aboutteam"
                    onClick={toggleSidebar}
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Team
                  </Link>
                  <Link
                    href="/career"
                    onClick={toggleSidebar}
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Career
                  </Link>
                </div>
                <div className="mt-6">
                  <Link
                    href="/contactus"
                    onClick={toggleSidebar}
                    className="block py-3 px-4 bg-gray-900 text-white text-center rounded-full font-semibold"
                  >
                    Contact
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
