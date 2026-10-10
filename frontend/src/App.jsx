import React, { useEffect, useState } from "react";
import Journey from "./Journey.jsx";
import Workspace from "./Workspace.jsx";
import { models } from "./journeyData.js";
export default function App() {
  const [workspace, setWorkspace] = useState(
    () => window.location.hash === "#workspace",
  );
  const [selected, setSelected] = useState(models[0]);
  useEffect(() => {
    const sync = () => setWorkspace(window.location.hash === "#workspace");
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);
  function open(model) {
    setSelected(model);
    history.pushState(null, "", "#workspace");
    setWorkspace(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function back() {
    history.pushState(null, "", window.location.pathname);
    setWorkspace(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  return workspace ? (
    <Workspace selectedModel={selected} onBack={back} />
  ) : (
    <Journey onOpen={open} />
  );
}
