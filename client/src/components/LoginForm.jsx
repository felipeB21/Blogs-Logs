"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import LoadingIcon from "./icons/LoadingIcon";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, isAuthenticated, errors: apiErrors } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);

    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      signIn(data);
    } catch (error) {
      console.error("API error:", error);
    }
  });

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex flex-col justify-center items-center min-h-screen">
        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <LoadingIcon />
          </div>
        ) : (
          <div>
            <form className="flex flex-col" onSubmit={onSubmit}>
              <label htmlFor="email">Email</label>
              <input type="email" {...register("email", { required: true })} />
              {errors?.email && <div className="error">Email is required</div>}
              {apiErrors?.email && (
                <div className="error">{apiErrors.email.msg}</div>
              )}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
              />
              {errors?.password && (
                <div className="error">Password is required</div>
              )}
              {apiErrors?.password && (
                <div className="error">{apiErrors.password.msg}</div>
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
        )}
      </div>
    </div>
  );
}
