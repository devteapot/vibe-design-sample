"use client";

import React from "react";
import { Layers, LayoutDashboard, ListTodo, Settings } from "lucide-react";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
export function Sidebar({
  active = "/",
  onNavigate,
}: {
  active?: string;
  onNavigate?: (path: string) => void;
}) {
  return (
    <aside className="mw-sidebar">
      <a
        className="brand"
        href="/"
        onClick={(e) => {
          if (onNavigate) {
            e.preventDefault();
            onNavigate("/");
          }
        }}
      >
        <span className="brand-symbol">
          <Layers size={23} />
        </span>
        morrow<span className="brand-dot">·</span>
      </a>
      <div className="workspace">
        <Avatar name="Juniper Studio" size="sm" />
        <div>
          <strong>Juniper Studio</strong>
          <small>Team workspace</small>
        </div>
      </div>
      <small className="nav-label">WORKSPACE</small>
      <nav aria-label="Main navigation">
        {[
          ["/", "Overview", LayoutDashboard],
          ["/items", "All work", ListTodo],
          ["/settings", "Settings", Settings],
        ].map(([path, label, Icon]) => {
          const I = Icon as typeof Layers;
          return (
            <a
              key={path as string}
              href={path as string}
              aria-current={active === path ? "page" : undefined}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(path as string);
                }
              }}
            >
              <I size={18} />
              {label as string}
              {path === "/items" && <span className="nav-count">6</span>}
            </a>
          );
        })}
      </nav>
      <div className="sidebar-note">
        <span className="tiny-sun">✳</span>
        <h4>Make room for focus.</h4>
        <p>Good work starts with a little breathing space.</p>
        <Badge tone="green">Sample workspace</Badge>
      </div>
      <div className="profile">
        <Avatar name="Ada Finch" />
        <div>
          <strong>Ada Finch</strong>
          <small>Workspace owner</small>
        </div>
      </div>
    </aside>
  );
}
