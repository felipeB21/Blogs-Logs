"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { loginRequest } from "@/api/auth";

export default function LoginForm() {
  const router = useRouter();
  const { register: login, handleSubmit } = useForm();

  const [errors, setErrors] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginRequest(data);
      console.log(response);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  });

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div>
          <form className="flex flex-col" onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" {...login("email", { required: true })} />
            {errors?.email && (
              <div className="text-red-500">{errors.email.msg}</div>
            )}
            <label htmlFor="password">Password</label>
            <input type="password" {...login("password", { required: true })} />
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
