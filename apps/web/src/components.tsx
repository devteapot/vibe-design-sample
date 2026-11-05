"use client";
import React from "react";
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
} from "@morrow/ui";
export default function ComponentCatalog() { return (
  <div className="catalog">
    <header>
      <small>DESIGN SYSTEM / 1.0</small>
      <h1>Morrow UI</h1>
      <p>Quiet colors. Clear controls. A little room for good work.</p>
      <a href="/">Back to the product →</a>
    </header>
    <div className="catalog-grid">
      <Card>
        <h2>Button</h2>
        <div className="samples">
          {(["primary", "secondary", "ghost", "danger"] as const).map(
            (variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ),
          )}
        </div>
        <div className="samples">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Card>
      <Card>
        <h2>Badge & Avatar</h2>
        <div className="samples">
          {(["neutral", "green", "amber", "purple", "red"] as const).map(
            (tone) => (
              <Badge key={tone} tone={tone}>
                {tone}
              </Badge>
            ),
          )}
        </div>
        <div className="samples">
          <Avatar name="Ada Finch" size="sm" />
          <Avatar name="Milo Reed" color="clay" />
          <Avatar name="Nora Vale" color="lavender" size="lg" />
        </div>
      </Card>
      <Card>
        <h2>TextField & Select</h2>
        <TextField label="Task title" placeholder="A fresh idea" />
        <div className="samples">
          <Select />
        </div>
        <TextField
          label="Invalid field"
          error
          hint="Please add a task title."
        />
      </Card>
      <Card>
        <h2>Tabs & Switch</h2>
        <Tabs />
        <div className="samples">
          <Switch checked label="Task updates" />
          <Switch disabled label="Disabled" />
        </div>
      </Card>
      <Card>
        <h2>Alert</h2>
        <Alert tone="success" title="Your work is saved">
          Everyone is up to date.
        </Alert>
        <div className="samples">
          <Alert tone="warning" title="A quick reminder">
            Review the details before you continue.
          </Alert>
        </div>
      </Card>
      <Card>
        <h2>Card & EmptyState</h2>
        <EmptyState
          title="Room for a new idea"
          description="Add your first piece of work."
        >
          <Button size="sm">New task</Button>
        </EmptyState>
      </Card>
      <Card>
        <h2>Dialog</h2>
        <p>
          A native modal with keyboard focus containment and Escape dismissal.
        </p>
        <Button
          onClick={() => window.dispatchEvent(new Event("show-sample-dialog"))}
        >
          Preview dialog
        </Button>
        <SampleDialog />
      </Card>
      <Card>
        <h2>Sidebar</h2>
        <div className="sidebar-preview">
          <Sidebar active="/items" />
        </div>
      </Card>
    </div>
  </div>
); }
function SampleDialog() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("show-sample-dialog", show);
    return () => window.removeEventListener("show-sample-dialog", show);
  }, []);
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      title="A new piece of work"
    >
      <p>Make room for your next idea.</p>
      <Button onClick={() => setOpen(false)}>Done</Button>
    </Dialog>
  );
}
