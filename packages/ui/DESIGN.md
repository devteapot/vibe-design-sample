---
version: "1.0"
name: Morrow UI
package: "@morrow/ui"
---
# Morrow UI

A fictional design system for a small creative studio. All example people, projects, and copy are invented.

## Principles
Keep work readable. Give primary actions a clear hierarchy. Use restrained color and generous space rather than decorative density. Controls must have visible keyboard focus, labels, and a disabled state where applicable.

## Tokens
The sibling tokens.json is the source inventory. CSS ships the same custom properties. White cards sit on warm gray paper. Sage identifies actions, amber means in progress, purple means planned, and green means complete. Pair every status color with text. Inter is bundled through @fontsource and licensed under OFL-1.1. Body text is 14px, labels 12px, and page headings 30px. Spacing uses 4px increments; cards use 12px corners. CSS and font files need no external network.

## Components
### Button
Use primary for the main action, secondary for alternatives, ghost for low emphasis, and danger for destructive actions. Do keep labels explicit. Do not use color alone to describe consequences. Sizes are sm, md, and lg; disabled blocks activation.

### Badge
Use neutral, green, amber, purple, or red for compact text statuses. Do include a label. Do not use as a button.

### Card
Use sm, md, or lg padding to group related content. Elevated adds a light shadow. Do group one topic. Do not nest cards without a reason.

### TextField
Use a visible label and an optional hint; error marks invalid values. Do explain errors in the hint. Do not replace labels with placeholders.

### Avatar
Use initials for fictional people. Sizes sm, md, lg and sage, clay, lavender backgrounds distinguish teams. Do pass a full name. Do not use initials as the only accessible name.

### Tabs
Use for local filtering, with pressed buttons showing the active choice. Do update value after onChange. Do not use these filter buttons as ARIA tabs with missing tab panels.

### Switch
Use for immediate binary preferences. Do provide a short label and controlled checked state. Do not use for mutually exclusive choices.

### Dialog
Use open to show a native modal dialog, with a named heading, Escape dismissal and browser focus containment. Do provide onClose and an explicit cancel action. Do not force open in product screens. Capture recipes force open only to preview the component.

### Alert
Use info, success, or warning for in-page feedback with a status announcement. Do provide a specific title. Do not use transient feedback for essential instructions.

### Select
Use a labeled native select for short lists of text options. Do provide a value present in options. Do not use it for navigation.

### EmptyState
Use a heading, explanation and optional action when a collection is empty. Do explain how to continue. Do not blame the user.

### Sidebar
Use for workspace navigation; anchors work without callbacks, onNavigate enables client routing. Do set active to the current section. Do not hide the active destination.
