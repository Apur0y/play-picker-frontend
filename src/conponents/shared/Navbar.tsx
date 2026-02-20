"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFootballBall,
  FaVolleyballBall,
  FaBasketballBall,
  FaFutbol,
  FaHockeyPuck,
} from "react-icons/fa";

const sportsIcons: { [key: string]: React.ReactNode } = {
  Football: <FaFootballBall className="inline mr-2 text-orange-500" />,
  Lacrosse: <FaHockeyPuck className="inline mr-2 text-orange-500" />, // no exact lacrosse icon in FA
  Soccer: <FaFutbol className="inline mr-2 text-orange-500" />,
  Volleyball: <FaVolleyballBall className="inline mr-2 text-orange-500" />,
  Basketball: <FaBasketballBall className="inline mr-2 text-orange-500" />,
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const menuLinks = [
    { name: "Home", href: "/" },
    {
      name: "Sports",
      href: "/sports",
      sports: [
        { name: "Football", href: "/sports?sport=football" },
        { name: "Lacrosse", href: "/sports?sport=lacrosse" },
        { name: "Soccer", href: "/sports?sport=soccer" },
        { name: "Volleyball", href: "/sports?sport=volleyball" },
        { name: "Basketball", href: "/sports?sport=basketball" },
      ],
    },
    { name: "Packages", href: "/packages" },
    { name: "About", href: "/about-us" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/contact" },
  ];

  const profileLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/dashboard" },
    { name: "Settings", href: "/settings" },
    { name: "Logout", href: "/logout" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const sportsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const sportsItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav
      className={` top-0 left-0 w-full z-50 transition-all duration-700 bg-white text-black sticky shadow-md
  `}
    >
      <div className=" mx-auto px-6 flex justify-between items-center h-18">
        {/* Logo */}
        <Link href="/" className="text-4xl font-bold tracking-wide flex ">
          <Image
            src="/pplogo.png"
            alt="Logo"
            width={400}
            height={400}
            className="w-20 h-20 object-contain"
          />
          <div className="text-2xl flex items-center uppercase">
            {/* <span className="bg-gradient-to-t from-blue-400 to-blue-600 bg-clip-text text-transparent font-bold">
              Play
            </span>
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent font-bold">
              Picker
            </span> */}
            <span className=" ">Play</span>
            <span className=" ">Picker</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-2 xl:gap-6 items-center font-poppins">
          {menuLinks.map((link, index) => (
            <li
              key={link.name}
              className="relative uppercase text-sm font-medium flex items-center group"
            >
              <Link
                href={link.href}
                className=" hover:text-orange-600 hover:underline transition"
              >
                {link.name}
              </Link>

              {/* Sports Dropdown */}
              {link.sports && (
                <ul className="absolute top-full left-0 mt-3 w-auto bg-white/30 backdrop-blur-xl text-black rounded-lg shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-white/30">
                  {link.sports.map((sport, index) => (
                    <li
                      key={sport.name}
                      className={`${index !== link.sports.length - 1 ? "border-b border-white/20" : ""}`}
                    >
                      <Link
                        href={sport.href}
                        className="flex items-center px-4 py-2 hover:bg-orange-100 hover:text-orange-600 transition"
                      >
                        {sportsIcons[sport.name]} {sport.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {index < menuLinks.length - 1 && (
                <span className="ml-5 text-gray-400">|</span>
              )}
            </li>
          ))}

          {/* Profile Icon */}
          <li className="relative ">
            <button
              onClick={toggleProfile}
              className="flex items-center gap-2 hover:text-orange-400 transition cursor-pointer"
            >
              <FaUserCircle size={28} />
            </button>

            {profileOpen && (
              <ul
                ref={menuRef}
                className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50 border border-gray-300"
              >
                {profileLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="block px-4 py-2 hover:bg-gray-200 transition"
                      onClick={() => setProfileOpen(false)} // <-- close the dropdown
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleProfile} className="relative">
            <FaUserCircle size={28} />
            {profileOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden animate-fadeIn">
                {profileLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="block px-4 py-2 hover:bg-gray-200 transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </button>

          <button onClick={toggleMenu} className="relative w-8 h-8">
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <FaTimes size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <FaBars size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white text-black px-6 pb-4 space-y-2 overflow-hidden"
          >
            {menuLinks.map((link) => (
              <motion.li
                key={link.name}
                variants={menuItemVariants}
                className="transition border-b border-gray-300"
              >
                {link.name === "Sports" ? (
                  <>
                    <div
                      className="flex justify-between items-center py-2"
                      onClick={() => setSportsOpen(!sportsOpen)}
                    >
                      <span>{link.name}</span>

                      {/* Animated Arrow */}
                      <motion.span
                        animate={{ rotate: sportsOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <RiArrowDropDownLine className="size-7" />
                      </motion.span>
                    </div>

                    {/* Sports Submenu */}
                    <AnimatePresence>
                      {sportsOpen && (
                        <motion.ul
                          variants={sportsVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="pl-4 overflow-hidden"
                        >
                          {link.sports?.map((sport) => (
                            <motion.li
                              key={sport.name}
                              variants={sportsItemVariants}
                            >
                              <Link
                                href={sport.href}
                                onClick={() => setMenuOpen(false)}
                                className="block px-4 py-2 border-b border-white/10 hover:text-orange-400 transition"
                              >
                                {sport.name}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
//  ${
// scrolled
//   ? "md:bg-white md:text-black md:shadow-lg md:sticky"
//   : "md:absolute md:bg-transparent md:text-white md:shadow-none"}
