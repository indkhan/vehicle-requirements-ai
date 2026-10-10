import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test } from "vitest";
import App from "./Workspace.jsx";
afterEach(cleanup);
test("a vehicle marker opens its linked source evidence", async () => {
  render(<App />);
  await userEvent.click(
    screen.getByRole("button", { name: "Inspect seat comfort" }),
  );
  expect(
    screen.getByText("Synthetic: the seat is uncomfortable on long journeys."),
  ).toBeTruthy();
  expect(screen.getByText(/A2/)).toBeTruthy();
});
test("demo setup keeps selected settings and labels the result synthetic", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: /New analysis/ }));
  await userEvent.click(screen.getByLabelText("Deep Dive"));
  await userEvent.selectOptions(
    screen.getByLabelText("Participation mode"),
    "guided",
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Create demo run" }),
  );
  expect(screen.getByText("Guided")).toBeTruthy();
  expect(screen.getByText("Deep Dive on")).toBeTruthy();
  expect(screen.getAllByText(/Synthetic/).length).toBeGreaterThan(0);
});
test("proposal edits retain the original customer evidence", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: "Proposals" }));
  await userEvent.click(screen.getByRole("button", { name: "Edit proposal" }));
  await userEvent.clear(screen.getByLabelText("Proposed outcome"));
  await userEvent.type(
    screen.getByLabelText("Proposed outcome"),
    "Validate adjustable seat support",
  );
  await userEvent.click(screen.getByRole("button", { name: "Save proposal" }));
  expect(screen.getByText("Validate adjustable seat support")).toBeTruthy();
  await userEvent.click(screen.getByRole("button", { name: "Evidence" }));
  expect(
    screen.getByText("Synthetic: the seat is uncomfortable on long journeys."),
  ).toBeTruthy();
});

test("unsupported files show an actionable error without entering the package", async () => {
  const user = userEvent.setup({ applyAccept: false });
  render(<App />);
  await user.click(screen.getByRole("button", { name: /New analysis/ }));
  await user.upload(
    screen.getByLabelText("Preview your evidence package"),
    new File(["hello"], "notes.exe", { type: "application/octet-stream" }),
  );
  expect(screen.getByRole("alert").textContent).toContain("XLSX, CSV or PDF");
  expect(screen.queryByRole("button", { name: "Remove notes.exe" })).toBeNull();
});

test("Escape closes the modal and restores focus to its trigger", async () => {
  const user = userEvent.setup();
  render(<App />);
  const trigger = screen.getByRole("button", { name: /New analysis/ });
  await user.click(trigger);
  expect(screen.getByRole("dialog")).toBeTruthy();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(document.activeElement).toBe(trigger);
});
