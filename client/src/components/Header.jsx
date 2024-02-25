"use client";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingIcon from "./icons/LoadingIcon";

const links = [
  { name: "Blogs", href: "/blogs" },
  { name: "Code", href: "/code" },
  { name: "Community", href: "/community" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const { user, isAuthenticated, loading } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(!loading);
  }, [loading]);

  useEffect(() => {
    setIsLoaded(true);
  }, [isAuthenticated]);

  return (
    <header className="fixed top-0 w-full py-4 bg-white/40 backdrop-blur-3xl">
      <div className="w-[1000px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link className="text-lg font-bold" href="/">
            Blogs&Logs
          </Link>
          <nav>
            <ul className="flex gap-5">
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <p className="text-neutral-700 hover:text-black">
                      {link.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          {isLoaded ? (
            isAuthenticated ? (
              <p className="py-2">
                Welcome, {""}
                <Link href={`/user/${user.id}`}>
                  <strong>{user.username}</strong>
                </Link>
              </p>
            ) : (
              <Link href="/login">
                <button className="py-2 px-6 border font-medium rounded-md hover:bg-neutral-200">
                  Sign in
                </button>
              </Link>
            )
          ) : (
            <div className="py-1.5">
              <LoadingIcon />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
