"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useCode } from "@/app/context/CodeContext";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useRouter } from "next/navigation";

export default function CodeForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createCode, errors: apiErrors } = useCode();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);

  const options = [
    { value: "NodeJS", label: "NodeJS" },
    { value: "Express", label: "Express" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "NextJS", label: "NextJS" },
    { value: "React", label: "React" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "CSS", label: "CSS" },
    { value: "HTML", label: "HTML" },
    { value: "Python", label: "Python" },
    { value: "C++", label: "C++" },
    { value: "Java", label: "Java" },
    { value: "C#", label: "C#" },
    { value: "PHP", label: "PHP" },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  const onSubmit = handleSubmit((data) => {
    createCode(data);
  });

  const handleNextStep = () => {
    if (step === 1) {
      setStep(step + 1);
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold max-w-[300px]">Blogs&Logs</h2>
          <span className="font-bold">Code</span>
        </div>
        <form className="flex flex-col relative" onSubmit={onSubmit}>
          {step === 1 && (
            <>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                autoFocus
              />
              {errors.title && <p className="error">Title is required</p>}
              <label htmlFor="description">Description</label>
              <textarea
                className="bg-white rounded border outline-0 text-black p-2 text-sm"
                {...register("description", {
                  required: "Description is required",
                })}
                rows={10}
                cols={29.9}
              ></textarea>
              {errors.description && (
                <p className="error">Description is required</p>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <label htmlFor="code">Code</label>
              <textarea
                className="bg-white rounded border outline-0 text-black p-2 text-sm"
                {...register("code", { required: "Code is required" })}
                rows={10}
                cols={29.9}
              ></textarea>
              {errors.code && <p className="error">Code is required</p>}
              <label htmlFor="tags">Tags</label>
              <Select
                className="w-[300px]"
                isMulti
                options={options}
                {...register("tags", {
                  required: "At least one tag is required",
                })}
                name="tags"
                onChange={(selectedOption) => {
                  const selectedValues = selectedOption
                    ? selectedOption.map((option) => option.value)
                    : [];
                  setValue("tags", selectedValues);
                }}
              />{" "}
              {errors.tags && (
                <p className="error">At least one tag is required</p>
              )}
              {apiErrors?.title && (
                <p className="error">{apiErrors.title.msg}</p>
              )}
              {apiErrors?.description && (
                <p className="error">{apiErrors.description.msg}</p>
              )}
            </>
          )}
          <div className="flex justify-between mt-3">
            <button
              className="py-2 px-6 bg-sky-500 text-white font-medium rounded-md hover:bg-sky-600"
              type="button"
              onClick={handleNextStep}
            >
              {step === 1 ? "Next" : "Back"}
            </button>

            {step === 2 && (
              <button
                className="py-2 px-6 bg-sky-500 text-white font-medium rounded-md hover:bg-sky-600"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
