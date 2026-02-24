/* =========================
   MOBILE MENU ANIMATION
========================= */

export const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0, x: -20 },
};

/* =========================
   MOBILE MENU ITEM
========================= */

export const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

/* =========================
   SPORTS DROPDOWN ANIMATION
========================= */

export const sportsVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.06,
    },
  },
};

/* =========================
   SPORTS ITEM ANIMATION
========================= */

export const sportsItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};