"use client";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageCommunity from "../../public/509shots_so.png";

export default function Community() {
  const { getAllUsers, allUsers, errors } = useAuth();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    let progress = 0;
    const duration = 1400;
    let interval = null;

    const animateCount = () => {
      const startCount = userCount;
      const endCount = allUsers.length;
      const startTime = new Date().getTime();
      const updateInterval = () => {
        const now = new Date().getTime();
        progress = now - startTime;
        const increment = Math.floor(
          (endCount - startCount) * (progress / duration)
        );
        setUserCount(startCount + increment);
        if (progress >= duration) clearInterval(interval);
        else
          interval = setTimeout(
            updateInterval,
            100 + 100 * (progress / duration)
          );
      };
      interval = setTimeout(updateInterval, 100);
    };

    if (userCount < allUsers.length) {
      animateCount();
    }

    return () => clearInterval(interval);
  }, [userCount, allUsers.length]);

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="mt-32 w-[1000px] mx-auto">
        <div className="grid grid-cols-2 animate-fade-up animate-duration-[2000ms]">
          <div>
            <div>
              <h3 className="text-3xl font-bold ">Join our community</h3>
            </div>
            <div className="animate-fade-up animate-duration-[2000ms] animate-delay-[500ms]">
              <p>Help others, learn, and share your knowledge.</p>
              <p>
                We are <strong>{userCount}</strong> users, join us for helping
                our community!
              </p>
            </div>
          </div>
          <div>
            <Image
              className="w-auto h-auto"
              src={ImageCommunity}
              width={2000}
              height={2000}
              alt="Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
