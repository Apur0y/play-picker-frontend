"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "@/redux/api/auth/auth";
import Button from "@/conponents/Reuseable/Button";
import { BsGoogle } from "react-icons/bs";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/features/hook";

export default function SignIn() {
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch=useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await login(formData).unwrap();
      if (res.success) {
        dispatch(setUser({
  user: res.data,
  token: res.accessToken
}));
        router.push("/"); // redirect after login
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin({}).unwrap();
      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
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
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-start  text-sm">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}

          <Button className="w-full" type="submit" disabled={isLoading}>
            {" "}
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t" />
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border py-3 cursor-pointer rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition"
        >
          <BsGoogle /> Continue with Google
        </button>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
