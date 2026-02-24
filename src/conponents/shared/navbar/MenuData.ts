import React from "react";
import {
  FaFootballBall,
  FaVolleyballBall,
  FaBasketballBall,
  FaFutbol,
  FaHockeyPuck,
} from "react-icons/fa";

/* =========================
   SPORTS ICONS
========================= */

export const sportsIcons: { [key: string]: React.ReactNode } = {
  Football: React.createElement(FaFootballBall, { className: "inline mr-2 text-orange-500" }),
  Lacrosse: React.createElement(FaHockeyPuck, { className: "inline mr-2 text-orange-500" }),
  Soccer: React.createElement(FaFutbol, { className: "inline mr-2 text-orange-500" }),
  Volleyball: React.createElement(FaVolleyballBall, { className: "inline mr-2 text-orange-500" }),
  Basketball: React.createElement(FaBasketballBall, { className: "inline mr-2 text-orange-500" }),
};

/* =========================
   MAIN MENU LINKS
========================= */

export const menuLinks = [
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

/* =========================
   PROFILE LINKS
========================= */

export const profileLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/dashboard" },
  { name: "Settings", href: "/settings" },
  { name: "Logout", href: "/logout" },
];