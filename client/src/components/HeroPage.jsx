"use client";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function HeroPage() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center animate-fade-up animate-duration-[2000ms]">
        <h2 className="text-4xl ">Welcome to</h2>
        <h1 className="text-5xl font-bold">Blogs & Logs</h1>
        <div className="py-3 flex flex-col items-center">
          <p className="text-neutral-800 text-lg animate-fade-up animate-duration-[3000ms] animate-delay-100">
            Share your thoughts
          </p>
          <p className="text-neutral-800 text-lg animate-fade-up animate-duration-[3000ms] animate-delay-150">
            Share your code problems
          </p>
        </div>
        <Link
          className="animate-fade-up animate-duration-[3000ms] animate-delay-200 mt-2"
          href={isAuthenticated ? "/community" : "/login"}
        >
          <button className="py-3 px-6 bg-sky-500 text-white font-medium rounded-md hover:bg-sky-600">
            Join our community
          </button>
        </Link>
      </div>
    </div>
  );
}
