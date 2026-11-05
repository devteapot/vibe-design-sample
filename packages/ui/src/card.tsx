"use client";

import React from "react";
type Content = { children?: React.ReactNode };
export function Card({
  children,
  padding = "md",
  elevated = false,
}: Content & { padding?: "sm" | "md" | "lg"; elevated?: boolean }) {
  return (
    <section className={`mw-card pad-${padding} ${elevated ? "elevated" : ""}`}>
      {children}
    </section>
  );
}
