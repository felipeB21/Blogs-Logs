"use client";
import { createContext, useContext, useState } from "react";
import { codePostRequest, codeGetRequest } from "@/api/code";

const CodeContext = createContext();

export const useCode = () => {
  const context = useContext(CodeContext);

  if (!context) {
    throw new Error("useCode must be used within an CodeProvider");
  }

  return context;
};

export function CodeProvider({ children }) {
  const [code, setCode] = useState([]);
  const [errors, setErrors] = useState(null);

  const getCode = async () => {
    try {
      const response = await codeGetRequest();
      setCode(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createCode = async (code) => {
    try {
      const response = await codePostRequest(code);
      console.log(response);
    } catch (error) {
      console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
    }
  };
  return (
    <CodeContext.Provider
      value={{
        code,
        createCode,
        getCode,
        errors,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
}
