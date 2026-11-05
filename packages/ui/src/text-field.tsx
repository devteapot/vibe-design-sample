"use client";

import React, { useId } from "react";
export function TextField({
  label = "Name",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  error = false,
  hint,
}: {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="mw-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={error}
        aria-describedby={hint ? id + "-hint" : undefined}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {hint && <small id={id + "-hint"}>{hint}</small>}
    </div>
  );
}
