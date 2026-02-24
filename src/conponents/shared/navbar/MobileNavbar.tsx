"use client";

import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import {
  mobileMenuVariants,
  menuItemVariants,
  sportsVariants,
  sportsItemVariants,
} from "./animations";
import { menuLinks, profileLinks } from "./MenuData";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  profileOpen: boolean;
  setProfileOpen: (val: boolean) => void;
  handleLogout: () => void;
  profileRef: React.RefObject<HTMLDivElement>;
}


export default function MobileNavbar({
  user,
  profileOpen,
  setProfileOpen,
  handleLogout,
  profileRef,
}: Props) {

  
  const [menuOpen, setMenuOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);

  return (
    <>
      {/* Bottom Bar */}
      <div className="md:hidden flex justify-between items-center px-6 h-12">
        <Link href="/">
          <GoHomeFill className="size-6" />
        </Link>

        {/* Profile */}
        {user && (
          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen(!profileOpen)}>
              <FaUserCircle size={24} />
            </button>

            {profileOpen && (
              <ul className="absolute bottom-10 bg-white text-black rounded shadow w-40">
                {profileLinks.map((link) => (
                  <li key={link.name}>
                    {link.name === "Logout" ? (
                      <button
                        onClick={handleLogout}
                        className="block w-full text-center px-4 py-2 hover:bg-orange-100"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="block px-4 py-2 hover:bg-orange-100"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Animated Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white text-black px-6 pb-4 space-y-2 absolute bottom-12 w-full"
          >
            {menuLinks.map((link) => (
              <motion.li key={link.name} variants={menuItemVariants}>
                {link.sports ? (
                  <>
                    <div
                      className="flex justify-between items-center py-2"
                      onClick={() => setSportsOpen(!sportsOpen)}
                    >
                      {link.name}
                      <motion.span
                        animate={{ rotate: sportsOpen ? 180 : 0 }}
                      >
                        <RiArrowDropDownLine />
                      </motion.span>
                    </div>

                    <AnimatePresence>
                      {sportsOpen && (
                        <motion.ul
                          variants={sportsVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="pl-4"
                        >
                          {link.sports.map((sport) => (
                            <motion.li
                              key={sport.name}
                              variants={sportsItemVariants}
                            >
                              <Link
                                href={sport.href}
                                onClick={() => setMenuOpen(false)}
                                className="block py-2"
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
                    onClick={() => setMenuOpen(false)}
                    className="block py-2"
                  >
                    {link.name}
                  </Link>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}