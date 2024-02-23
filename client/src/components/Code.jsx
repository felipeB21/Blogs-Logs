"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Code() {
  const [showCode, setShowCode] = useState([]);
  useEffect(() => {
    const getCode = async () => {
      try {
        const response = await fetch("http://localhost:3030/api/code", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setShowCode(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getCode();
  }, []);
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="mt-32 w-[1000px] mx-auto">
        <h2 className="text-2xl font-bold">Code's</h2>
        <div className="mt-5">
          <ul className="grid grid-cols-5 gap-5">
            {showCode.map((code) => (
              <li
                key={code._id}
                className="bg-neutral-100 p-5 rounded-md shadow-lg"
              >
                <div>
                  <h3 className="text-xl font-medium">{code.title}</h3>
                  <p>{code.description}</p>
                  <p>{code.code}</p>
                </div>
                <div className="p-2 rounded bg-neutral-200">{code.tags}</div>
                <Link
                  className="text-blue-500"
                  href={`/code/${code._id}/${code.title}`}
                >
                  Show more
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
