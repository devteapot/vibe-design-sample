"use client";

import React, { useId, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./button";
type Content = { children?: React.ReactNode };
export function Dialog({
  open = false,
  title = "Create a task",
  children,
  onClose,
}: Content & { open?: boolean; title?: string; onClose?: () => void }) {
  const id = useId(),
    ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (open && !d?.open) d?.showModal();
    if (!open && d?.open) d?.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="mw-dialog"
      aria-labelledby={id}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose?.();
      }}
    >
      <div className="dialog-heading">
        <h2 id={id}>{title}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={18} />
          <span className="mw-sr">Close dialog</span>
        </Button>
      </div>
      {children}
    </dialog>
  );
}
