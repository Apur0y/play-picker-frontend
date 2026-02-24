import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg"| "au";
  className?: string;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...rest
  } = props;

  const baseStyles =
    "inline-flex items-center justify-center  rounded-md transition duration-200 focus:outline-none";

  const variants = {
    primary: "bg-orange-600 text-white hover:bg-gray-700  border-bg-orange-600 hover:border-gray-200  ",
    secondary: "border text-white hover:bg-gray-800",
    outline: "border border-white text-white hover:bg-white hover:text-black",
  } as const;

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-2 py-3 text-sm md:px-6 md:py-3 md:text-base",
    lg: "px-8 py-4 text-lg",
    au: "px-5 py-2 text-md",
  } as const;

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} cursor-pointer`}
      {...rest}
    >
      {children}
    </button>
  );
}