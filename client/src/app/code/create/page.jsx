import CodeForm from "@/components/CodeForm";
import React from "react";
import { CodeProvider } from "@/app/context/CodeContext";
export default function page() {
  return (
    <CodeProvider>
      <CodeForm />
    </CodeProvider>
  );
}
