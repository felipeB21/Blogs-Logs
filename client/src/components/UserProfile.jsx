"use client";
import { useAuth } from "@/app/context/AuthContext";
import React, { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { useParams } from "next/navigation";
import Link from "next/link";
import LoadingIcon from "./icons/LoadingIcon";

export default function UserProfile() {
  const { getProfile, userProfile } = useAuth();
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      getProfile(username).then(() => setLoading(false));
    }
  }, [username]);

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="w-[1000px] mx-auto mt-32">
        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <LoadingIcon />
          </div>
        ) : userProfile ? (
          <>
            <h3 className="text-3xl font-bold">{userProfile.username}</h3>
            <div className="flex items-center gap-1 text-sm text-neutral-600 mt-3">
              <CiCalendar />
              <p>Joined {userProfile.createdAt.slice(0, 10)}</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h3 className="text-3xl font-bold">
              Sorry, this user does not exist.
            </h3>
            <p>
              The link you followed may be broken, or the user may have been
              deleted.{" "}
              <Link href={"/"} className="text-blue-500">
                Go back to Blogs&Logs
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
