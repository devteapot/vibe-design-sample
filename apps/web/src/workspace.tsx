"use client";

import React, { useState, createContext, useContext } from "react";
import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";
import {
  Button,
  Badge,
  Card,
  TextField,
  Avatar,
  Tabs,
  Switch,
  Dialog,
  Alert,
  Select,
  EmptyState,
  Sidebar,
  icons,
} from "@morrow/ui";
import { tasks as initialTasks } from "./fixtures";
const { Plus, ArrowUpRight, ArrowRight, Calendar, Check, Layers } = icons;
type WorkspaceState = { tasks: typeof initialTasks; onNew: () => void; onComplete: (id: string) => void; onSave: () => void };
const WorkspaceContext = createContext<WorkspaceState | null>(null);
function useWorkspace() {
  const state = useContext(WorkspaceContext);
  if (!state) throw Error("Missing workspace provider");
  return state;
}
export function Workspace({ children }: { children: React.ReactNode }) {
  const router = useRouter(), pathname = usePathname();
  const navigate = (path: string) => router.push(path);
  const [tasks, setTasks] = useState(initialTasks),
    [open, setOpen] = useState(false),
    [title, setTitle] = useState(""),
    [notice, setNotice] = useState("");
  const add = () => {
    if (!title.trim()) return;
    setTasks([
      ...tasks,
      {
        ...initialTasks[0],
        id: "task-" + (tasks.length + 1),
        title: title.trim(),
        status: "Planned",
        tone: "purple",
      },
    ]);
    setOpen(false);
    setTitle("");
    setNotice("Your task is ready.");
    navigate("/items");
  };
  if (pathname === "/components") return children;
  return (
    <WorkspaceContext.Provider value={{ tasks, onNew: () => setOpen(true),
      onComplete: (id) => {
        setTasks(tasks.map((t) => t.id === id ? { ...t, status: "Completed", tone: "green" } : t));
        setNotice("Task marked complete.");
      },
      onSave: () => setNotice("Workspace preferences saved for this session.")
    }}>
    <div className="app">
      <Sidebar
        active={
          pathname.startsWith("/items") ? "/items" : pathname
        }
        onNavigate={navigate}
      />
      <div className="shell">
        <header className="topbar">
          <span>
            Workspace <span className="slash">/</span>{" "}
            {pathname === "/settings"
              ? "Settings"
              : pathname.startsWith("/items")
                ? "All work"
                : "Overview"}
          </span>
          <div className="topbar-right">
            <span className="live-dot" />
            All changes saved <Avatar name="Ada Finch" size="sm" />
          </div>
        </header>
        <main>
          {notice && (
            <div className="notice">
              <Alert tone="success" title={notice} />
              <Button variant="ghost" size="sm" onClick={() => setNotice("")}>
                Dismiss
              </Button>
            </div>
          )}
          {children}
          <footer>
            Morrow sample · Fictional people, real room for good work.
          </footer>
        </main>
      </div>
      <Dialog
        open={open}
        title="A new piece of work"
        onClose={() => setOpen(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
        >
          <TextField
            label="Task title"
            value={title}
            onChange={setTitle}
            placeholder="What would you like to work on?"
          />
          <p className="form-hint">
            Added to Studio essentials. Changes stay in this session.
          </p>
          <div className="actions">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Create task
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
    </WorkspaceContext.Provider>
  );
}
function Heading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
function Rows({ tasks }: { tasks: typeof initialTasks }) {
  return (
    <div className="task-list">
      {tasks.map((t) => (
        <Link href={"/items/" + t.id} className="task-row" key={t.id}>
          <span
            className={"task-check " + (t.status === "Completed" ? "done" : "")}
          >
            {t.status === "Completed" && <Check size={12} />}
          </span>
          <div className="task-name">
            <strong>{t.title}</strong>
            <small>{t.project}</small>
          </div>
          <Badge tone={t.tone}>{t.status}</Badge>
          <span className="task-date">{t.date}</span>
          <Avatar
            name={t.owner}
            size="sm"
            color={
              t.owner === "Nora Vale"
                ? "lavender"
                : t.owner === "Milo Reed"
                  ? "clay"
                  : "sage"
            }
          />
          <ArrowUpRight size={15} />
        </Link>
      ))}
    </div>
  );
}
function Overview({
  tasks,
  onNew,
}: {
  tasks: typeof initialTasks;
  onNew: () => void;
}) {
  return (
    <>
      <Heading
        eyebrow="FRIDAY, NOVEMBER 6"
        title="A good day to make something."
        description="Welcome back, Ada. Here's what's taking shape at the studio."
        action={
          <Button onClick={onNew}>
            <Plus size={16} />
            New task
          </Button>
        }
      />
      <div className="hero">
        <div>
          <Badge tone="green">YOUR WEEK, AT A GLANCE</Badge>
          <h2>
            Less busywork.
            <br />
            More good work.
          </h2>
          <p>
            A shared place for small ideas and the plans
            <br />
            that turn them into something.
          </p>
          <Link href="/items">
            <Button variant="secondary" size="sm">
              Explore your work <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit" />
          <div className="art-card back">
            <Layers size={30} />
          </div>
          <div className="art-card front">
            <span className="art-line" />
            <span className="art-line short" />
            <div className="art-check">
              <Check size={18} />
            </div>
            <span className="art-label">A little progress, every day.</span>
          </div>
          <span className="art-star">✳</span>
        </div>
      </div>
      <div className="stats">
        {[
          [
            "Active tasks",
            tasks.filter((t) => t.status !== "Completed").length,
            "A few things in motion",
            "amber",
          ],
          [
            "Completed",
            tasks.filter((t) => t.status === "Completed").length,
            "Room for the next idea",
            "green",
          ],
          ["Studio projects", "3", "Made better together", "purple"],
        ].map(([label, value, sub, tone]) => (
          <Card key={label}>
            <div className="stat-label">
              {label}
              <Badge tone={tone as "amber"}>This week</Badge>
            </div>
            <div className="stat-value">
              {value}
              <ArrowUpRight size={18} />
            </div>
            <small>{sub}</small>
          </Card>
        ))}
      </div>
      <div className="section-heading">
        <h2>On your radar</h2>
        <Link href="/items">
          View all work <ArrowRight size={14} />
        </Link>
      </div>
      <Card padding="sm">
        <Rows tasks={tasks.slice(0, 3)} />
      </Card>
      <div className="section-heading">
        <h2>Around the studio</h2>
        <span className="muted">A little context for your day</span>
      </div>
      <div className="project-grid">
        {[
          [
            "Studio essentials",
            "The little things that help us do our best.",
            "sage",
          ],
          ["Autumn collection", "Warm materials. Thoughtful details.", "clay"],
          ["Field notes", "Ideas gathered out in the world.", "lavender"],
        ].map(([title, description, color], i) => (
          <Link key={title} href="/items">
            <Card>
              <div className={"project-icon " + color}>
                <Layers size={21} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="project-bottom">
                <span>2 tasks</span>
                <Avatar
                  name={["Ada Finch", "Milo Reed", "Nora Vale"][i]}
                  size="sm"
                  color={color as "sage"}
                />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
function Work({
  tasks,
  onNew,
}: {
  tasks: typeof initialTasks;
  onNew: () => void;
}) {
  const [tab, setTab] = useState("All work"),
    [search, setSearch] = useState("");
  const filtered = tasks.filter(
    (t) =>
      (tab === "All work" || t.status === tab) &&
      t.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <Heading
        eyebrow="A PLACE FOR EVERY IDEA"
        title="All work"
        description="Small steps, shared progress. Keep track of what matters."
        action={
          <Button onClick={onNew}>
            <Plus size={16} />
            New task
          </Button>
        }
      />
      <div className="filters">
        <Tabs value={tab} onChange={setTab} />
        <TextField
          label="Search tasks"
          value={search}
          onChange={setSearch}
          placeholder="Find a piece of work…"
        />
      </div>
      <Card padding="sm">
        {filtered.length ? (
          <Rows tasks={filtered} />
        ) : (
          <EmptyState
            title="Nothing on this list"
            description="Try another search or add a new task."
          >
            <Button onClick={onNew}>New task</Button>
          </EmptyState>
        )}
      </Card>
      <p className="list-meta">{filtered.length} tasks · Local sample data</p>
    </>
  );
}
function Detail({
  tasks,
  onComplete,
}: {
  tasks: typeof initialTasks;
  onComplete: (id: string) => void;
}) {
  const { id } = useParams();
  const t = tasks.find((t) => t.id === id);
  if (!t)
    return (
      <EmptyState
        title="Task not found"
        description="This sample task doesn't exist."
      >
        <Link href="/items">
          <Button>Back to all work</Button>
        </Link>
      </EmptyState>
    );
  return (
    <>
      <Link className="back-link" href="/items">
        ← Back to all work
      </Link>
      <Heading
        eyebrow={t.project.toUpperCase()}
        title={t.title}
        description="A little intention behind every task."
        action={
          <Button
            disabled={t.status === "Completed"}
            onClick={() => onComplete(t.id)}
          >
            <Check size={16} />
            {t.status === "Completed" ? "Completed" : "Mark complete"}
          </Button>
        }
      />
      <div className="detail-grid">
        <div>
          <Card padding="lg">
            <Badge tone={t.tone}>{t.status}</Badge>
            <h2 className="detail-title">The idea</h2>
            <p className="prose">{t.description}</p>
            <h3>What good looks like</h3>
            <ul className="checklist">
              <li>
                <Check size={16} />A clear first draft to share with the team
              </li>
              <li>
                <Check size={16} />
                Thoughtful details, without extra complexity
              </li>
              <li>
                <Check size={16} />A final review before we call it done
              </li>
            </ul>
            <div className="note">
              <Avatar name="Nora Vale" size="sm" />
              <div>
                <strong>
                  Nora Vale <small>· Yesterday</small>
                </strong>
                <p>
                  Let's leave a little space for something unexpected. I added a
                  few sketches to our studio notes.
                </p>
              </div>
            </div>
          </Card>
        </div>
        <Card>
          <h3>Task details</h3>
          <div className="property">
            <small>Assignee</small>
            <span>
              <Avatar name={t.owner} size="sm" />
              {t.owner}
            </span>
          </div>
          <div className="property">
            <small>Due date</small>
            <span>
              <Calendar size={16} />
              {t.date}, 2026
            </span>
          </div>
          <div className="property">
            <small>Project</small>
            <span>{t.project}</span>
          </div>
          <Badge tone="neutral">Normal priority</Badge>
        </Card>
      </div>
    </>
  );
}
function SettingsPage({ onSave }: { onSave: () => void }) {
  const [name, setName] = useState("Juniper Studio"),
    [email, setEmail] = useState(true),
    [digest, setDigest] = useState(false),
    [priority, setPriority] = useState("Normal");
  return (
    <>
      <Heading
        eyebrow="MAKE IT YOURS"
        title="Workspace settings"
        description="A few simple preferences for how your studio works."
      />
      <div className="settings">
        <Card padding="lg">
          <h2>Studio profile</h2>
          <p className="muted">
            This is how your workspace appears to your team.
          </p>
          <div className="studio-profile">
            <Avatar name="Juniper Studio" size="lg" />
            <Badge tone="green">Sample workspace</Badge>
          </div>
          <TextField
            label="Workspace name"
            value={name}
            onChange={setName}
            hint="Use a name your team will recognize."
          />
          <div className="settings-field">
            <Select
              label="Default task priority"
              value={priority}
              onChange={setPriority}
            />
          </div>
        </Card>
        <Card padding="lg">
          <h2>Keep in the loop</h2>
          <p className="muted">
            Only the updates you want, when you want them.
          </p>
          <div className="switch-row">
            <Switch label="Task updates" checked={email} onChange={setEmail} />
            <small>When someone makes progress on your work</small>
          </div>
          <div className="switch-row">
            <Switch
              label="Weekly studio digest"
              checked={digest}
              onChange={setDigest}
            />
            <small>A quiet summary at the end of the week</small>
          </div>
          <Alert title="This is a sample workspace">
            Preferences are in memory. Refreshing restores the fictional
            defaults.
          </Alert>
        </Card>
        <div className="actions">
          <Button onClick={onSave}>Save preferences</Button>
        </div>
      </div>
    </>
  );
}

export function OverviewPage() { const { tasks, onNew } = useWorkspace(); return <Overview tasks={tasks} onNew={onNew} />; }
export function ItemsPage() { const { tasks, onNew } = useWorkspace(); return <Work tasks={tasks} onNew={onNew} />; }
export function DetailPage() { const { tasks, onComplete } = useWorkspace(); return <Detail tasks={tasks} onComplete={onComplete} />; }
export function PreferencesPage() { const { onSave } = useWorkspace(); return <SettingsPage onSave={onSave} />; }
