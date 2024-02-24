"use client";
import Code from "@/components/Code";
import React from "react";
import { CodeProvider } from "../context/CodeContext";

export default function page() {
  return (
    <CodeProvider>
      <Code />
    </CodeProvider>
  );
}
