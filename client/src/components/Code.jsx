"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCode } from "@/app/context/CodeContext";
import { CiCalendar } from "react-icons/ci";

export default function Code() {
  const { getCode, code } = useCode();

  useEffect(() => {
    getCode();
  }, []);

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="w-[1000px] mx-auto">
        <div className="mt-32">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Code's</h2>
            <Link
              className="p-2 rounded bg-sky-500 font-medium text-white hover:bg-sky-600"
              href="/code/create"
            >
              Upload code
            </Link>
          </div>
          <div className="mt-5">
            <ul className="grid grid-cols-3 gap-5">
              {code.map((code) => (
                <li
                  key={code._id}
                  className="bg-neutral-100 p-5 rounded-md shadow-lg"
                >
                  <div>
                    <div className="flex items-center gap-1">
                      <CiCalendar />
                      <p className="text-sm text-neutral-600">
                        {code.createdAt.slice(0, 10)}
                      </p>
                    </div>
                    <h3 className="text-2xl font-bold">{code.title}</h3>
                    <p className="py-1">{code.description}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    {code.tags.map((tag, i) => (
                      <div
                        className="bg-neutral-700/90 w-max rounded-md py-1 px-2 mt-8"
                        key={i}
                      >
                        <p className="text-white text-xs">{tag}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link
                      className="text-blue-500 bg-sky-100 hover:bg-sky-200 p-2 rounded-md"
                      href={`/code/${code._id}`}
                    >
                      Show more
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
