"use client";

import React from "react";
export function Tabs({
  items = ["All work", "In progress", "Completed"],
  value = "All work",
  onChange,
}: {
  items?: string[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="mw-tabs" aria-label="Filter work">
      {items.map((item) => (
        <button
          key={item}
          aria-pressed={item === value}
          onClick={() => onChange?.(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
