"use client";

import React from "react";
import { Inbox } from "lucide-react";
type Content = { children?: React.ReactNode };
export function EmptyState({
  title = "A fresh start",
  description = "There is nothing here yet.",
  children,
}: Content & { title?: string; description?: string }) {
  return (
    <div className="mw-empty">
      <Inbox size={32} />
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </div>
  );
}
