const { chromium } = require(process.argv[2] || "playwright");
const fs = require("node:fs");
const shots = process.argv[3] || "/tmp/morrow-shots";
fs.mkdirSync(shots, { recursive: true });
let activeBrowser;
(async () => {
  const browser = (activeBrowser = await chromium.launch({ headless: true }));
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1080 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  const routes = [
    ["overview", "/"],
    ["items", "/items"],
    ["detail", "/items/welcome-kit"],
    ["settings", "/settings"],
    ["components", "/components"],
  ];
  for (const [name, path] of routes) {
    const r = await page.goto("http://localhost:3440" + path);
    if (r.status() !== 200) throw Error(path + " HTTP " + r.status());
    await page.locator("h1").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: shots + "/" + name + ".png",
      fullPage: true,
    });
    console.log("PASS route " + path);
  }
  await page.goto("http://localhost:3440/items");
  await page.getByRole("textbox", { name: "Search tasks" }).fill("welcome");
  if ((await page.locator(".task-row").count()) !== 1) throw Error("search");
  await page.getByRole("textbox", { name: "Search tasks" }).fill("no-match");
  await page.getByRole("heading", { name: "Nothing on this list" }).waitFor();
  await page.getByRole("textbox", { name: "Search tasks" }).fill("");
  await page.getByRole("button", { name: "Completed", exact: true }).click();
  if ((await page.locator(".task-row").count()) !== 2) throw Error("filter");
  await page
    .getByRole("button", { name: "New task", exact: true })
    .first()
    .click();
  await page.getByRole("dialog").waitFor();
  await page
    .getByRole("textbox", { name: "Task title" })
    .fill("Prepare a fictional studio picnic");
  await page.getByRole("button", { name: "Create task", exact: true }).click();
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await page.getByText("Prepare a fictional studio picnic").waitFor();
  await page.getByText("Give the welcome kit a fresh look").click();
  await page
    .getByRole("button", { name: "Mark complete", exact: true })
    .click();
  await page.getByRole("button", { name: "Completed", exact: true }).waitFor();
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await page
    .getByRole("switch", { name: "Task updates", exact: true })
    .uncheck();
  await page.getByRole("button", { name: "Save preferences" }).click();
  await page
    .getByText("Workspace preferences saved for this session.")
    .waitFor();
  await page
    .getByRole("link", { name: "All work", exact: false })
    .first()
    .click();
  await page
    .getByRole("button", { name: "New task", exact: true })
    .first()
    .click();
  await page.keyboard.press("Escape");
  if ((await page.getByRole("dialog").count()) !== 0) throw Error("Escape");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3440/");
  await page.locator("h1").waitFor();
  await page.screenshot({ path: shots + "/mobile.png", fullPage: true });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw Error("mobile overflow");
  if (errors.length) throw Error(JSON.stringify(errors));
  console.log(
    "PASS interactions, keyboard dismissal, mobile layout; console errors: 0",
  );
  fs.writeFileSync(
    shots + "/browser-results.json",
    JSON.stringify(
      {
        routes: routes.map((x) => x[1]),
        consoleErrors: errors,
        interactions: "passed",
      },
      null,
      2,
    ),
  );
  await browser.close();
})().catch(async (e) => {
  console.error(e);
  await activeBrowser?.close();
  process.exit(1);
});
