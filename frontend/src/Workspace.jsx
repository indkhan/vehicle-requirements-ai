import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  X,
  Check,
  SlidersHorizontal,
  Layers,
  ScanLine,
  Globe2,
  GitBranch,
  RotateCcw,
} from "lucide-react";
import scenarios from "../../contracts/scenarios.json";

const fixture = scenarios.deep_dive_partial.payloads;
const finding = fixture.FindingsPage.items[0];
const evidence = fixture.EvidenceList.items[0];
const initialProposal = fixture.Proposals.changes[0];

function Modal({ title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const panel = ref.current;
    panel.querySelector("button, input, select, textarea")?.focus();
    function keydown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const items = [
          ...panel.querySelectorAll(
            "button:not(:disabled), input, select, textarea, a[href]",
          ),
        ];
        const first = items[0],
          last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="dialog"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <button className="close" aria-label="Close dialog" onClick={onClose}>
          <X />
        </button>
        <h2 id="dialog-title">{title}</h2>
        {children}
      </section>
    </div>
  );
}

function Vehicle({ view, model }) {
  return (
    <img
      className={`vehicle-photo ${model ? "vehicle-photo-bmw" : ""}`}
      src={
        model ? model.image : "/images/demo-sedan-studio.png"
      }
      alt={
        model
          ? `${model.name}, front three-quarter view`
          : view === "detail"
            ? "Detail view of an illustrative graphite sedan"
            : "Studio concept of an unbranded graphite sedan, front three-quarter view"
      }
      width="1536"
      height="1024"
      fetchPriority="high"
    />
  );
}

function Setup({ onClose, onCreate, model }) {
  const [deep, setDeep] = useState(false),
    [mode, setMode] = useState("autonomous");
  const [files, setFiles] = useState([]),
    [error, setError] = useState("");
  function choose(event) {
    const picked = [...event.target.files];
    const invalid = picked.find(
      (file) =>
        !/\.(xlsx|csv|pdf)$/i.test(file.name) ||
        file.size > 20 * 1024 * 1024 ||
        file.size === 0,
    );
    if (invalid) {
      setError("Choose non-empty XLSX, CSV or PDF files up to 20 MB each.");
      return;
    }
    setError("");
    setFiles(picked);
  }
  return (
    <Modal title="Start with a question." onClose={onClose}>
      <p>
        Configure a vehicle analysis. This preview uses the shared synthetic
        evidence package.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreate({ deep, mode });
        }}
      >
        <label className="field">
          Vehicle
          <select defaultValue={model?.id || "vehicle_demo"}>
            <option value={model?.id || "vehicle_demo"}>
              {model?.name || "Demo sedan · illustrative studio concept"}
            </option>
          </select>
        </label>
        <label className="field">
          Participation mode
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="autonomous">Autonomous</option>
            <option value="guided">Guided</option>
          </select>
        </label>
        <label className="check-field">
          <input
            type="checkbox"
            checked={deep}
            onChange={(e) => setDeep(e.target.checked)}
          />
          Deep Dive
        </label>
        <label className="upload">
          Preview your evidence package
          <input
            type="file"
            multiple
            accept=".xlsx,.csv,.pdf"
            onChange={choose}
          />
        </label>
        {files.map((file, index) => (
          <div className="file-row" key={index}>
            <span>{file.name}</span>
            <button
              type="button"
              aria-label={`Remove ${file.name}`}
              onClick={() => setFiles(files.filter((_, i) => i !== index))}
            >
              <X />
            </button>
          </div>
        ))}
        {error && (
          <p className="upload-error" role="alert">
            {error}
          </p>
        )}
        <p className="panel-note">
          Files stay on this device and are not analyzed in demo mode. The demo
          run always uses the contract fixture; live uploads require backend
          integration.
        </p>
        <button className="pill blue" type="submit">
          Create demo run
          <ArrowUpRight />
        </button>
      </form>
    </Modal>
  );
}

export default function Workspace({ selectedModel, onBack }) {
  const [section, setSection] = useState("Workspace"),
    [tab, setTab] = useState("Findings");
  const [modal, setModal] = useState(null),
    [view, setView] = useState("perspective");
  const [config, setConfig] = useState({ mode: "autonomous", deep: false });
  const [proposal, setProposal] = useState(initialProposal.outcome),
    [draft, setDraft] = useState(""),
    [editing, setEditing] = useState(false);
  const [version, setVersion] = useState(1),
    [history, setHistory] = useState([
      "Synthetic demo loaded from shared contract fixtures.",
    ]);
  const workspace = useRef(null);
  function navigate(next) {
    setSection(next);
    workspace.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }
  const counts = fixture.FindingsPage.counts;
  function save() {
    if (!draft.trim()) return;
    setProposal(draft.trim());
    setVersion(version + 1);
    setEditing(false);
    setHistory([...history, `PM edited proposal: ${draft.trim()}`]);
  }
  function create(next) {
    setConfig(next);
    setProposal(initialProposal.outcome);
    setVersion(1);
    setEditing(false);
    setHistory([
      `Demo run created · ${next.mode} · Deep Dive ${next.deep ? "on" : "off"}.`,
    ]);
    setModal(null);
    setSection("Workspace");
    setTab("Findings");
  }
  return (
    <div className="app-shell">
      {onBack && (
        <button className="workspace-back" onClick={onBack}>
          ← Back to the BMW journey
        </button>
      )}
      <header className="header">
        <a className="brand" href="#" aria-label="FORM home">
          FORM<span className="brand-slash">/</span>
          <small>Vehicle intelligence</small>
        </a>
        <nav aria-label="Main navigation">
          {["Workspace", "Evidence graph", "History"].map((item) => (
            <button
              key={item}
              className={`nav-button ${section === item ? "active" : ""}`}
              onClick={() => navigate(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <button className="pill" onClick={() => setModal("setup")}>
          <Plus />
          New analysis
        </button>
      </header>
      <main>
        <section className="hero" aria-label="Vehicle analysis overview">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              Vehicle requirements workspace
            </div>
            <h1>
              See the signal.
              <br />
              Shape the drive.
            </h1>
            <p>
              {selectedModel?.description ||
                "A closer look at what customers need, and what your next vehicle could become."}
            </p>
            <div className="vehicle-identity">
              <span className="vehicle-icon">
                <ScanLine />
              </span>
              <div>
                <strong>{selectedModel?.name || "Demo sedan"}</strong>
                <small>US market · Synthetic evidence</small>
              </div>
              <span className="vehicle-version">v1.0</span>
            </div>
            <button className="text-button" onClick={() => setModal("setup")}>
              Configure analysis
              <SlidersHorizontal />
            </button>
          </div>
          <div className={`scene ${view === "detail" ? "scene-detail" : ""}`}>
            <div className="scene-label">
              <span className="status-dot" />
              {selectedModel ? "Selected model" : "Baseline concept"}
              <span className="scene-badge">
                {selectedModel ? "BMW imagery" : "Illustrative"}
              </span>
            </div>
            <Vehicle view={view} model={selectedModel} />
            <button
              className="hotspot"
              aria-label="Inspect seat comfort"
              onClick={() => setModal("finding")}
            >
              1
            </button>
            <button
              className="marker-label"
              onClick={() => setModal("finding")}
            >
              <span className="marker-dot" />
              Seat comfort<small>1 linked finding</small>
              <ArrowUpRight />
            </button>
            <div className="scene-bottom">
              <span>
                <ScanLine />
                Explore the vehicle
              </span>
              <div className="view-controls" aria-label="Vehicle image view">
                <button
                  className={view === "perspective" ? "selected" : ""}
                  aria-pressed={view === "perspective"}
                  onClick={() => setView("perspective")}
                >
                  Overview
                </button>
                <button
                  className={view === "detail" ? "selected" : ""}
                  aria-pressed={view === "detail"}
                  onClick={() => setView("detail")}
                >
                  Detail
                </button>
                <button
                  aria-label="Reset vehicle view"
                  onClick={() => setView("perspective")}
                >
                  <RotateCcw />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="workspace" ref={workspace} id="workspace">
          <div className="workspace-heading">
            <div>
              <h2>
                {section === "Workspace"
                  ? "From signal to requirement."
                  : section === "Evidence graph"
                    ? "Follow the evidence."
                    : "Every decision, in context."}
              </h2>
              <p>1 feedback record · US market · Synthetic evidence package</p>
            </div>
            <div className="run-meta">
              <span className="chip">
                {config.mode === "autonomous" ? "Autonomous" : "Guided"}
              </span>
              <span className="chip">
                Deep Dive {config.deep ? "on" : "off"}
              </span>
              <span className="chip success">Proposals ready</span>
            </div>
          </div>
          <div className="workspace-grid">
            <div className="main-panel">
              {section === "Workspace" ? (
                <>
                  <div
                    className="tabs"
                    role="group"
                    aria-label="Analysis panels"
                  >
                    {["Findings", "Proposals", "Evidence"].map((item) => (
                      <button
                        key={item}
                        className={tab === item ? "active" : ""}
                        aria-pressed={tab === item}
                        onClick={() => setTab(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  {tab === "Findings" && (
                    <>
                      <button
                        className="finding"
                        onClick={() => setModal("finding")}
                      >
                        <div className="finding-top">
                          <span className="number">01</span>
                          <span className="tag">Low evidence</span>
                        </div>
                        <h3>Long-journey seat comfort</h3>
                        <p>
                          {finding.customer_need}. Explore the seat-comfort
                          signal and the requirement it informs.
                        </p>
                        <div className="finding-footer">
                          <span>
                            <i className="negative-dot" />
                            {finding.counts.negative_records} of{" "}
                            {finding.counts.total_records} negative record
                          </span>
                          <span>
                            Seat · US
                            <ArrowUpRight />
                          </span>
                        </div>
                      </button>
                      <p className="panel-note">
                        Final fixture counts. One record is a signal, not a
                        population estimate.
                      </p>
                    </>
                  )}
                  {tab === "Proposals" && (
                    <div className="proposal">
                      <span className="tag">Needs validation</span>
                      <h3>{proposal}</h3>
                      <p>
                        AI-originated proposal · version {version} · target
                        horizon {initialProposal.horizon}
                        <br />
                        Baseline and target require validation. Validation
                        method: scoped customer study.
                      </p>
                      {editing ? (
                        <>
                          <label htmlFor="outcome" className="section-label">
                            Proposed outcome
                          </label>
                          <textarea
                            id="outcome"
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            maxLength={2000}
                          />
                          <button
                            className="pill blue"
                            disabled={!draft.trim()}
                            onClick={save}
                          >
                            Save proposal
                            <Check />
                          </button>
                          <button
                            className="text-button save-hint"
                            onClick={() => setEditing(false)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="text-button"
                          onClick={() => {
                            setDraft(proposal);
                            setEditing(true);
                          }}
                        >
                          Edit proposal
                          <SlidersHorizontal />
                        </button>
                      )}
                      <p className="panel-note">
                        Edits are local to this demo session. Customer evidence
                        stays unchanged.
                      </p>
                    </div>
                  )}
                  {tab === "Evidence" && (
                    <div className="evidence-card">
                      <span className="chip">Customer evidence</span>
                      <blockquote>{evidence.excerpt}</blockquote>
                      <p>
                        Feedback_Explorer · row 2 · cells A2, G2
                        <br />
                        source_version_demo · US market
                      </p>
                      <span className="tag">
                        Synthetic source · original file unavailable
                      </span>
                    </div>
                  )}
                </>
              ) : section === "Evidence graph" ? (
                <>
                  <div className="section-label">
                    Linked source to proposed outcome
                  </div>
                  <div className="graph">
                    <span>Feedback record · record_demo</span>
                    <i />
                    <button onClick={() => setModal("finding")}>
                      Seat comfort · finding_demo
                      <ArrowUpRight />
                    </button>
                    <i />
                    <span>{proposal}</span>
                  </div>
                  <p className="panel-note">
                    Stable part ID: part_seat. Every proposal can be traced to
                    its source evidence.
                  </p>
                </>
              ) : (
                <>
                  <div className="section-label">
                    Session audit · proposal version {version}
                  </div>
                  {history.map((entry, i) => (
                    <div className="history-entry" key={i}>
                      {entry}
                      <small>
                        Event {i + 1} ·{" "}
                        {i === 0 ? "System fixture" : "PM instruction"} · local
                        demo session
                      </small>
                    </div>
                  ))}
                  <p className="panel-note">
                    Proposed does not mean validated or approved.
                  </p>
                </>
              )}
            </div>
            <aside className="pipeline">
              <div className="section-label">Analysis progress</div>
              {[
                ["Evidence package", "Shared synthetic feedback fixture", true],
                ["Customer findings", "1 finding linked to its source", true],
                ["Requirements", "1 proposal · validation needed", true],
                ["Concept visualization", "Concept annotations only", false],
              ].map(([title, sub, done]) => (
                <div
                  className={`pipeline-step ${done ? "" : "pending"}`}
                  key={title}
                >
                  <span className="step-icon">
                    {done ? <Check /> : <Layers />}
                  </span>
                  <div>
                    {title}
                    <small>{sub}</small>
                  </div>
                </div>
              ))}
              <button
                className="text-button"
                onClick={() => setModal("render")}
              >
                Reimagine
                <ArrowUpRight />
              </button>
              {config.deep && (
                <div className="research">
                  <span className="tag">Research partial</span>
                  <p>
                    Synthetic retrieval budget exhausted before counterevidence.
                    The finding remains available.
                  </p>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>
      <footer className="footer">
        <span>FORM / VEHICLE INTELLIGENCE</span>
        <span>DEMO ENVIRONMENT · NO LIVE ANALYSIS CONNECTED</span>
      </footer>
      {modal === "setup" && (
        <Setup
          onClose={() => setModal(null)}
          onCreate={create}
          model={selectedModel}
        />
      )}
      {modal === "finding" && (
        <Modal title="Seat comfort" onClose={() => setModal(null)}>
          <p>{finding.customer_need}. Part: part_seat · cohort: US.</p>
          <div className="detail-stats">
            <div>
              {finding.counts.negative_records}
              <small>Negative record</small>
            </div>
            <div>
              {finding.counts.total_records}
              <small>Feedback denominator</small>
            </div>
            <div>
              {finding.counts.negative_share * 100}%
              <small>Negative share</small>
            </div>
          </div>
          <span className="tag">Low evidence · final synthetic counts</span>
          <blockquote>{evidence.excerpt}</blockquote>
          <p>
            Feedback_Explorer · row 2 · cells A2, G2
            <br />
            Source version: source_version_demo
          </p>
          <div className="notice">
            Synthetic fixture; no population inference. No opposing evidence is
            included. The original customer file is unavailable in this demo.
          </div>
          <div className="research">
            <h3>Proposed requirement</h3>
            <p>{proposal}</p>
            <p>Needs validation · target horizon 2030</p>
          </div>
          {config.deep && (
            <div className="research">
              <h3>Deep Dive · partial</h3>
              <p>{fixture.ResearchPage.items[0].claims[0].text}</p>
              <p>
                Synthetic competitor example, not a verified real-world claim.
                Counterevidence was not retrieved.
              </p>
            </div>
          )}
          <button
            className="pill blue"
            onClick={() => {
              setModal(null);
              setTab("Proposals");
              navigate("Workspace");
            }}
          >
            Review proposal
            <ArrowRight />
          </button>
        </Modal>
      )}
      {modal === "render" && (
        <Modal title="A concept, with context." onClose={() => setModal(null)}>
          <p>
            Proposal version {version} can be inspected through its seat
            annotation. This demo supports annotations only.
          </p>
          <div className="notice">
            Photorealistic generation, geometry changes and authoritative
            exports require the backend renderer. No rendered concept or
            approval is implied.
          </div>
          <button className="pill blue" onClick={() => setModal("finding")}>
            Inspect annotation
            <ScanLine />
          </button>
        </Modal>
      )}
    </div>
  );
}
