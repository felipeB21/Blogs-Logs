"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3030/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        router.push("/");
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            {errors?.email && (
              <div className="text-red-500">{errors.email.msg}</div>
            )}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
            {errors?.password && (
              <div className="text-red-500">{errors.password.msg}</div>
            )}
            <button className="submit" type="submit">
              Sign in
            </button>
          </form>
          <div className="mt-3">
            <p>
              Don't have an account?{" "}
              <Link
                className="text-blue-500 hover:underline"
                href={"/register"}
              >
                Sign Up
              </Link>
            </p>
          </div>
          <div className="border-b mt-6">{""}</div>

          <div className="mt-6 flex flex-col">
            <button className="py-2 border font-medium rounded-md ">
              Sign in with Google
            </button>
            <button className="py-2 bg-neutral-900 border text-white font-medium rounded-md mt-2">
              Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
