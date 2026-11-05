"use client";

import React from "react";
export function Avatar({
  name = "Ada Finch",
  size = "md",
  color = "sage",
}: {
  name?: string;
  size?: "sm" | "md" | "lg";
  color?: "sage" | "clay" | "lavender";
}) {
  return (
    <span
      className={`mw-avatar ${size} ${color}`}
      aria-label={name}
      title={name}
    >
      {name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}
