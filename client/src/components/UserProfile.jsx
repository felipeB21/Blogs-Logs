"use client";
import { useAuth } from "@/app/context/AuthContext";
import React, { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const { getProfile, userProfile, errors } = useAuth();
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      getProfile(username);
    }
  }, [username]);

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="w-[1000px] mx-auto mt-32">
        {userProfile && (
          <>
            <h3 className="text-3xl font-bold">{userProfile.username}</h3>
            <div className="flex items-center gap-1 text-sm text-neutral-600 mt-3">
              <CiCalendar />
              <p>Joined {userProfile.createdAt.slice(0, 10)}</p>
            </div>
          </>
        )}
        {errors && <p>{errors}</p>}
      </div>
    </div>
  );
}
