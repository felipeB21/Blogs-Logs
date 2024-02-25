"use client";
import { createContext, useContext, useState } from "react";
import {
  codePostRequest,
  codeGetRequest,
  codeGetRequestById,
} from "@/api/code";

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

  const getCodeById = async (id) => {
    try {
      const response = await codeGetRequestById(id);
      setCode(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createCode = async (code) => {
    try {
      const response = await codePostRequest(code);
      setCode(response.data);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };
  return (
    <CodeContext.Provider
      value={{
        code,
        createCode,
        getCode,
        getCodeById,
        errors,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
}
