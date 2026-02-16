"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 px-4">
      
      {/* Big 404 */}
      <h1 className="text-6xl font-extrabold text-rose-600 mb-4 sm:text-7xl">
        404
      </h1>

      {/* Message */}
      <p className="text-lg sm:text-xl text-rose-700 mb-6 text-center max-w-md">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Optional Illustration */}
      <div className="mb-6">
        <svg
          className="w-40 h-40 text-rose-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v-4h6v4m2 0H7m7-7V7m0 0l-3 3m3-3l3 3"
          />
        </svg>
      </div>

      {/* Back to Home Button */}
      <button
        onClick={() => router.push("/")}
        className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg font-medium transition"
      >
        Go Home
      </button>
    </div>
  );
}
