"use client";

import { useEffect, useRef, useState } from "react";
import {
  useGetMeQuery,
  useLogoutMutation,
} from "@/redux/api/auth/auth";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { logoutUser, setUser } from "@/redux/features/authSlice";
import { toast } from "sonner";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { data } = useGetMeQuery({});
  const [logout] = useLogoutMutation();

  const user = useAppSelector((state) => state.auth?.user);

  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  /* ===============================
     LOGOUT
  =============================== */

  const handleLogout = async () => {
    dispatch(logoutUser());
    await logout({});
    toast("Logout Successful!");
  };

  /* ===============================
     SET USER FROM API
  =============================== */

  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  /* ===============================
     SCROLL EFFECT
  =============================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===============================
     OUTSIDE CLICK CLOSE PROFILE
  =============================== */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <nav
      className={`fixed bottom-0 left-0 md:sticky md:top-0 w-full z-50 bg-gray-900/95 text-white shadow-md transition-all duration-300`}
    >
      <DesktopNavbar
        user={user}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        handleLogout={handleLogout}
        profileRef={profileRef}
      />

      <MobileNavbar
        user={user}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        handleLogout={handleLogout}
        profileRef={profileRef}
      />
    </nav>
  );
}