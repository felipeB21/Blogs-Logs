import CodeId from "@/components/CodeId";
import React from "react";
import { CodeProvider } from "@/app/context/CodeContext";

export default function page() {
  return (
    <CodeProvider>
      <CodeId />
    </CodeProvider>
  );
}
