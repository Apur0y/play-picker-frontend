"use client";
import Button from "@/conponents/Reuseable/Button";
import LogoPP from "@/conponents/shared/LogoPP";
import { useCreateuserMutation } from "@/redux/api/users/users";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
};

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const [register, { isLoading }] = useCreateuserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      try {
        const response = await register(formData).unwrap();
        if (response.success) {
          router.push("/");
          toast.success("Successfully register");
          console.log(response);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log("Error:", err);
        setError(err?.data?.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-gray-900 ">
      <div className="h-screen w-1/2 hidden md:flex items-center justify-center py-8 ">
        <Image
          src="/login3.png"
          alt="Login Image"
          width={2000}
          height={2000}
          className="h-full w-auto object-contain rounded-md"
        />
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-xl ">
        <LogoPP />

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-center">
            Create your account
          </h2>
          <p className="text-center text-sm font-normal">
            Welcome! Please enter your details to register
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone & Address Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Error / Success */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {success && <p className="text-green-600 text-sm">{success}</p>}

          {/* Submit Button */}
          <Button className="w-full" type="submit" disabled={loading}>
            {isLoading ? "Registering..." : "Sign Up"}
          </Button>
        </form>
        <p className="py-6 text-center text-sm">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/signin")}
            className="text-primary cursor-pointer hover:underline font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
