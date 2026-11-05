"use client";

import React, { useId } from "react";
export function Select({
  label = "Priority",
  options = ["Normal", "High", "Low"],
  value = "Normal",
  disabled = false,
  onChange,
}: {
  label?: string;
  options?: string[];
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="mw-field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
