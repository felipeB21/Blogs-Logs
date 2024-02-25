"use client";
import { useCode } from "@/app/context/CodeContext";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CiCalendar } from "react-icons/ci";
import Link from "next/link";

export default function CodeId() {
  const { code, getCodeById } = useCode();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function getCode() {
      try {
        await getCodeById(id);
      } catch (error) {
        // Catch the error and log it
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getCode();
  }, [id]);

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="w-[1000px] mx-auto">
        <div className="mt-32">
          {code && code.code && (
            <>
              <h3 className="text-3xl font-bold">{code.code.title}</h3>
              <p className="text-neutral-800 py-2">{code.code.description}</p>
              <div className="bg-yellow-50/90 p-5 rounded-md">
                <p>{code.code.code}</p>
              </div>
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-1 text-neutral-600 mt-6 text-sm">
                  <CiCalendar />
                  <p>{code.code.createdAt.slice(0, 10)}</p>
                </div>
                <div>
                  <Link href={`/user/${code.code.user._id}`}>
                    <p className="text-blue-500 hover:text-blue-600">
                      By {code.code.user.username}
                    </p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
