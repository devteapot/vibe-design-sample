"use client";

import React from "react";
type Content = { children?: React.ReactNode };
export function Badge({
  tone = "neutral",
  children,
}: Content & { tone?: "neutral" | "green" | "amber" | "purple" | "red" }) {
  return <span className={`mw-badge ${tone}`}>{children}</span>;
}
