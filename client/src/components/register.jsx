"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isAuthenticated, errors: apiErrors } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await signUp(data); // Handle data in your API endpoint
    } catch (error) {
      console.error("API error:", error);
    }
  });

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form className="flex flex-col" onSubmit={onSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" {...register("username", { required: true })} />
          {errors?.username && (
            <div className="error">Username is required</div>
          )}
          {apiErrors?.username && (
            <div className="error">{apiErrors.username.msg}</div>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: true,
            })}
          />
          {errors?.email && <div className="error">Email is required</div>}
          {apiErrors?.email && (
            <div className="error">{apiErrors.email.msg}</div>
          )}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors?.password && (
            <div className="error">Password is required</div>
          )}
          {apiErrors?.password && (
            <div className="error">{apiErrors.password.msg}</div>
          )}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
            })}
          />
          {apiErrors?.confirmPassword && (
            <div className="error">{apiErrors.confirmPassword.msg}</div>
          )}

          <button className="submit" type="submit">
            Register
          </button>
        </form>
        <div className="mt-3">
          <p>Already have an account?</p>
          <Link className="text-blue-600 hover:underline" href="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
