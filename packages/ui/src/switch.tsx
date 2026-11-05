"use client";

import React from "react";
export function Switch({
  label = "Email updates",
  checked = false,
  disabled = false,
  onChange,
}: {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label className="mw-switch">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="track" />
      <span>{label}</span>
    </label>
  );
}
