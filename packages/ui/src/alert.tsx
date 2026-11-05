"use client";

import React from "react";
import { Check } from "lucide-react";
type Content = { children?: React.ReactNode };
export function Alert({
  tone = "info",
  title = "A small update",
  children,
}: Content & { tone?: "info" | "success" | "warning"; title?: string }) {
  return (
    <div role="status" className={`mw-alert ${tone}`}>
      <Check size={18} />
      <div>
        <strong>{title}</strong>
        {children && <p>{children}</p>}
      </div>
    </div>
  );
}
