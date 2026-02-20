"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IPlan } from "../packages/CustomPackage";
import Button from "../Reuseable/Button";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: IPlan | null;
  formData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      customerName: string;
      customerEmail: string;
      customerPhone: string;
    }>
  >;
  onProceed: () => void;
  isLoading: boolean;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  selectedPackage,
  formData,
  setFormData,
  onProceed,
  isLoading,
}: CheckoutModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && selectedPackage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative bg-white text-black w-full max-w-lg rounded-2xl p-8 shadow-2xl z-10"
          >
            <h2 className="text-2xl font-bold mb-4 text-black">
              Checkout - {selectedPackage.planName}
            </h2>

            <p className="text-gray-600 mb-6">
              Amount:{" "}
              <span className="font-semibold">${selectedPackage.amount}</span>
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customerName: e.target.value,
                  }))
                }
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.customerEmail}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customerEmail: e.target.value,
                  }))
                }
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="tel"
                placeholder="Phone"
                value={formData.customerPhone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customerPhone: e.target.value,
                  }))
                }
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-black cursor-pointer"
              >
                Cancel
              </button>

           
              <Button onClick={onProceed} disabled={isLoading}>
                {isLoading ? "Processing..." : "Proceed to Payment"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
