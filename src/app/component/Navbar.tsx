"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
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

  const pathname = usePathname();

  // Detect if current page has dark background
  const isDarkPage = pathname.startsWith("/work");

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text and styling based on theme
  const textColor = isDarkPage ? "text-white/90" : "text-gray-700";
  const textHoverColor = isDarkPage
    ? "hover:text-white"
    : "hover:text-gray-900";
  const activeColor = isDarkPage ? "text-white" : "text-violet-600";

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "py-2" : "py-4"
        )}
      >
        {/* Glass Container */}
        <div
          className={clsx(
            "mx-4 sm:mx-8 md:mx-12 lg:mx-20 rounded-2xl transition-all duration-500",
            isScrolled
              ? isDarkPage
                ? "bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
              : "bg-transparent"
          )}
        >
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={clsx(
                  "transition-all duration-300",
                  isDarkPage && "brightness-0 invert"
                )}
              >
                <Image src={logo} alt="Logo" width={90} height={90} />
              </motion.div>
              {/* Glow effect on hover */}
              <div
                className={clsx(
                  "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10",
                  isDarkPage ? "bg-violet-500/20" : "bg-violet-500/10"
                )}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-1">
              {/* Nav Links Container */}
              <div className="flex items-center gap-1">
                {/* Work Link */}
                <NavLink
                  href="/work"
                  label="Work"
                  isActive={pathname.startsWith("/work")}
                  isDarkPage={isDarkPage}
                  textColor={textColor}
                  textHoverColor={textHoverColor}
                  activeColor={activeColor}
                />

                {/* Blog Link */}
                <NavLink
                  href="/blogs"
                  label="Blogs"
                  isActive={pathname.startsWith("/blogs")}
                  isDarkPage={isDarkPage}
                  textColor={textColor}
                  textHoverColor={textHoverColor}
                  activeColor={activeColor}
                />

                {/* Services Dropdown */}
                <div
                  onMouseEnter={openServicesMenu}
                  onMouseLeave={closeServicesMenu}
                  className="relative"
                >
                  <motion.button
                    onClick={handleServicesClick}
                    className={clsx(
                      "flex items-center gap-1.5 px-4 py-2 font-medium transition-all duration-300",
                      pathname.startsWith("/service")
                        ? isDarkPage
                          ? "text-white"
                          : "text-violet-600"
                        : textColor,
                      !pathname.startsWith("/service") && textHoverColor
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Services
                    <motion.svg
                      animate={{ rotate: isServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4"
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
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={clsx(
                          "absolute top-full mt-2 left-0 w-56 rounded-2xl overflow-hidden",
                          isDarkPage
                            ? "bg-gray-900/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            : "bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                        )}
                      >
                        <div className="p-2">
                          <DropdownLink
                            href="/service/building"
                            label="Brand Building"
                            icon="🎨"
                            isActive={pathname === "/service/building"}
                            isDarkPage={isDarkPage}
                          />
                          <DropdownLink
                            href="/service/marketing"
                            label="Marketing Strategy"
                            icon="📈"
                            isActive={pathname === "/service/marketing"}
                            isDarkPage={isDarkPage}
                          />
                          <DropdownLink
                            href="/service/d2c"
                            label="Cracking D2C"
                            icon="🛒"
                            isActive={pathname === "/service/d2c"}
                            isDarkPage={isDarkPage}
                          />
                          <DropdownLink
                            href="/service/automation"
                            label="Marketing Automation"
                            icon="⚡"
                            isActive={pathname === "/service/automation"}
                            isDarkPage={isDarkPage}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Clients Link */}
                <NavLink
                  href="/clients"
                  label="Clients"
                  isActive={pathname === "/clients"}
                  isDarkPage={isDarkPage}
                  textColor={textColor}
                  textHoverColor={textHoverColor}
                  activeColor={activeColor}
                />

                {/* About Dropdown */}
                <div
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                  className="relative"
                >
                  <motion.button
                    className={clsx(
                      "flex items-center gap-1.5 px-4 py-2 font-medium transition-all duration-300",
                      pathname === "/aboutus" ||
                        pathname === "/aboutteam" ||
                        pathname === "/career"
                        ? isDarkPage
                          ? "text-white"
                          : "text-violet-600"
                        : textColor,
                      !(
                        pathname === "/aboutus" ||
                        pathname === "/aboutteam" ||
                        pathname === "/career"
                      ) && textHoverColor
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    About
                    <motion.svg
                      animate={{ rotate: isAboutOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4"
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
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {isAboutOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={clsx(
                          "absolute top-full mt-2 right-0 w-48 rounded-2xl overflow-hidden",
                          isDarkPage
                            ? "bg-gray-900/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            : "bg-white/90 backdrop-blur-2xl border border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                        )}
                      >
                        <div className="p-2">
                          <DropdownLink
                            href="/aboutus"
                            label="About Us"
                            icon="🏢"
                            isActive={pathname === "/aboutus"}
                            isDarkPage={isDarkPage}
                          />
                          <DropdownLink
                            href="/aboutteam"
                            label="Our Team"
                            icon="👥"
                            isActive={pathname === "/aboutteam"}
                            isDarkPage={isDarkPage}
                          />
                          <DropdownLink
                            href="/career"
                            label="Careers"
                            icon="💼"
                            isActive={pathname === "/career"}
                            isDarkPage={isDarkPage}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Contact Button */}
              <Link href="/contactus" className="ml-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "relative group flex items-center gap-2 font-semibold py-2.5 px-6 rounded-full overflow-hidden transition-all duration-300",
                    isDarkPage
                      ? "bg-white text-gray-900"
                      : "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                  )}
                >
                  <span className="relative z-10">Contact</span>
                  <Sparkles className="w-4 h-4 relative z-10" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={clsx(
                "sm:hidden p-2.5 rounded-xl transition-all duration-300",
                isDarkPage
                  ? "text-white bg-white/10 hover:bg-white/20"
                  : "text-gray-700 bg-gray-100 hover:bg-gray-200"
              )}
              onClick={toggleSidebar}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden"
              onClick={toggleSidebar}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] z-50 sm:hidden bg-white/95 backdrop-blur-2xl shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <Link href="/" onClick={toggleSidebar}>
                  <Image src={logo} alt="Logo" width={80} height={40} />
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleSidebar}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>

              {/* Navigation */}
              <nav className="p-5 space-y-2 overflow-y-auto h-[calc(100%-80px)]">
                <MobileNavLink
                  href="/work"
                  label="Work"
                  onClick={toggleSidebar}
                />
                <MobileNavLink
                  href="/blogs"
                  label="Blogs"
                  onClick={toggleSidebar}
                />
                <MobileNavLink
                  href="/clients"
                  label="Clients"
                  onClick={toggleSidebar}
                />

                {/* Services Section */}
                <div className="pt-4">
                  <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Services
                  </p>
                  <MobileNavLink
                    href="/service/building"
                    label="Brand Building"
                    onClick={toggleSidebar}
                    sub
                  />
                  <MobileNavLink
                    href="/service/marketing"
                    label="Marketing Strategy"
                    onClick={toggleSidebar}
                    sub
                  />
                  <MobileNavLink
                    href="/service/d2c"
                    label="Cracking D2C"
                    onClick={toggleSidebar}
                    sub
                  />
                  <MobileNavLink
                    href="/service/automation"
                    label="Marketing Automation"
                    onClick={toggleSidebar}
                    sub
                  />
                </div>

                {/* Company Section */}
                <div className="pt-4">
                  <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Company
                  </p>
                  <MobileNavLink
                    href="/aboutus"
                    label="About Us"
                    onClick={toggleSidebar}
                    sub
                  />
                  <MobileNavLink
                    href="/aboutteam"
                    label="Our Team"
                    onClick={toggleSidebar}
                    sub
                  />
                  <MobileNavLink
                    href="/career"
                    label="Careers"
                    onClick={toggleSidebar}
                    sub
                  />
                </div>

                {/* Contact Button */}
                <div className="pt-6">
                  <Link href="/contactus" onClick={toggleSidebar}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 px-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25"
                    >
                      Get in Touch
                      <Sparkles className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Nav Link Component
function NavLink({
  href,
  label,
  isActive,
  isDarkPage,
  textColor,
  textHoverColor,
  activeColor,
}: {
  href: string;
  label: string;
  isActive: boolean;
  isDarkPage: boolean;
  textColor: string;
  textHoverColor: string;
  activeColor: string;
}) {
  return (
    <Link href={href}>
      <motion.span
        className={clsx(
          "block px-4 py-2 font-medium transition-all duration-300",
          isActive
            ? isDarkPage
              ? "text-white"
              : "text-violet-600"
            : textColor,
          !isActive && textHoverColor
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {label}
      </motion.span>
    </Link>
  );
}

// Dropdown Link Component
function DropdownLink({
  href,
  label,
  icon,
  isActive,
  isDarkPage,
}: {
  href: string;
  label: string;
  icon: string;
  isActive: boolean;
  isDarkPage: boolean;
}) {
  return (
    <Link href={href}>
      <motion.div
        className={clsx(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
          isDarkPage
            ? "text-white/80 hover:bg-white/10 hover:text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
          isActive &&
            (isDarkPage
              ? "bg-white/10 text-white"
              : "bg-violet-100 text-violet-700")
        )}
        whileHover={{ x: 4 }}
      >
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{label}</span>
      </motion.div>
    </Link>
  );
}

// Mobile Nav Link Component
function MobileNavLink({
  href,
  label,
  onClick,
  sub = false,
}: {
  href: string;
  label: string;
  onClick: () => void;
  sub?: boolean;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        className={clsx(
          "block rounded-xl transition-all duration-200",
          sub
            ? "py-2.5 px-4 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            : "py-3 px-4 text-gray-800 font-medium hover:bg-gray-100"
        )}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        {label}
      </motion.div>
    </Link>
  );
}

export default Navbar;
