import React, { useState } from "react";
import CalculationTrace from "./CalculationTrace";
import EvidenceReport from "./EvidenceReport";
import AuthorDecisionPanel, {
  AuthorDecision,
  EvidenceNode,
  EvidenceLevel,
} from "./AuthorDecisionPanel";

type Step = "input" | "decisions" | "trace" | "declaration";

interface MotorOutput {
  formula: string;
  result: unknown;
  trace: unknown;
  inputs?: unknown;
  taxonomy_id?: string;
}

interface DeclarationOutput {
  type: "A" | "B" | "C" | "D";
  text: string;
  case_id: string;
}

const G = "#3d3530";
const btn: React.CSSProperties = {
  padding: "10px 22px",
  background: G,
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
  fontWeight: "500",
};
const bSec: React.CSSProperties = {
  ...btn,
  background: "transparent",
  color: G,
  border: `1.5px solid ${G}`,
};

function buildNodes(raw: string): EvidenceNode[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => {
      const match = line.match(/^(.+?)\s+E(\d)$/i);
      if (match) {
        return {
          id: `node_${i}`,
          label: match[1].trim(),
          level: Math.min(8, Math.max(0, Number(match[2]))) as EvidenceLevel,
        };
      }
      return { id: `node_${i}`, label: line, level: 6 as EvidenceLevel };
    });
}

export default function Constructor() {
  const [step, setStep] = useState<Step>("input");
  const [nodesRaw, setNodesRaw] = useState("");
  const [discipline, setDiscipline] = useState("universal");
  const [nodes, setNodes] = useState<EvidenceNode[]>([]);
  const [decisions, setDecisions] = useState<AuthorDecision[]>([]);
  const [motorOutput, setMotorOutput] = useState<MotorOutput | null>(null);
  const [declaration, setDeclaration] = useState<DeclarationOutput | null>(null);
  const [caseId, setCaseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function applyDecisionsToNodes(base: EvidenceNode[], dec: AuthorDecision[]): EvidenceNode[] {
    return base.map((n) => {
      const d = dec.find((d) => d.entityId === n.id);
      return d ? { ...n, level: d.overrideLevel } : n;
    });
  }

  async function runCalculation(base: EvidenceNode[], dec: AuthorDecision[]) {
    setLoading(true);
    setError("");
    try {
      const effective = applyDecisionsToNodes(base, dec);
      const mapaOutput = { nodes: effective };
      const id = caseId || crypto.randomUUID();
      if (!caseId) setCaseId(id);

      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ case_id: id, mapa_output: mapaOutput, discipline }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? `HTTP ${res.status}`);
      }

      const data = await res.json();
      setMotorOutput({ ...data, inputs: mapaOutput });
      setStep("trace");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de cálculo");
    } finally {
      setLoading(false);
    }
  }

  async function generateDeclaration() {
    if (!caseId) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate-declaration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ case_id: caseId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? `HTTP ${res.status}`);
      }

      const data = await res.json();
      setDeclaration(data);
      setStep("declaration");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al generar declaración");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep("input");
    setNodes([]);
    setDecisions([]);
    setMotorOutput(null);
    setDeclaration(null);
    setCaseId("");
    setError("");
  }

  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #e8e3db",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "20px",
  };

  const label: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "#8a7e72",
    marginBottom: "6px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #e8e3db",
    borderRadius: "8px",
    fontSize: "13px",
    color: G,
    background: "#faf9f7",
    boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "700", color: G, margin: 0 }}>
          Constructor Prometeo
        </h1>
        <p style={{ fontSize: "13px", color: "#8a7e72", marginTop: "6px" }}>
          Motor de convergencia causal · Declaraciones A / B / C / D
        </p>
      </div>

      {/* Steps indicator */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "28px" }}>
        {(["input", "decisions", "trace", "declaration"] as Step[]).map((s, i) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: "3px",
              borderRadius: "2px",
              background:
                step === s
                  ? G
                  : ["input", "decisions", "trace", "declaration"].indexOf(step) > i
                  ? "#b0a898"
                  : "#e8e3db",
            }}
          />
        ))}
      </div>

      {error && (
        <div style={{ background: "#fdf5f5", border: "1px solid #bf8a8a", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px", fontSize: "13px", color: "#7a1a1a" }}>
          {error}
        </div>
      )}

      {/* Step: input */}
      {step === "input" && (
        <div style={card}>
          <div style={{ marginBottom: "16px" }}>
            <label style={label}>Nodos de evidencia</label>
            <textarea
              value={nodesRaw}
              onChange={(e) => setNodesRaw(e.target.value)}
              placeholder={"Formato: nombre del nodo E1–E8 (un nodo por línea)\nEj: Contrato firmado E1\n    Testimonio único E8"}
              rows={7}
              style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
            />
            <div style={{ fontSize: "11px", color: "#b0a898", marginTop: "4px" }}>
              Sufija cada línea con E0–E8 para asignar nivel. Sin sufijo se asume E6.
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={label}>Disciplina</label>
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              style={inputStyle}
            >
              <option value="universal">Universal</option>
              <option value="legal.civil_liability">Legal — Responsabilidad civil</option>
            </select>
          </div>

          <button
            style={btn}
            disabled={!nodesRaw.trim()}
            onClick={() => {
              const parsed = buildNodes(nodesRaw);
              setNodes(parsed);
              setDecisions([]);
              setStep("decisions");
            }}
          >
            Continuar →
          </button>
        </div>
      )}

      {/* Step: author decisions */}
      {step === "decisions" && (
        <div style={card}>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: G, marginBottom: "4px" }}>
              Decisiones de autor
            </div>
            <div style={{ fontSize: "13px", color: "#8a7e72", marginBottom: "16px" }}>
              Opcional: ajusta el nivel de evidencia de cualquier nodo antes del cálculo.
            </div>
            <AuthorDecisionPanel
              nodes={nodes}
              decisions={decisions}
              onChange={setDecisions}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button style={bSec} onClick={() => setStep("input")}>← Anterior</button>
            <button
              style={btn}
              disabled={loading}
              onClick={() => runCalculation(nodes, decisions)}
            >
              {loading ? "Calculando…" : "Calcular →"}
            </button>
          </div>
        </div>
      )}

      {/* Step: trace */}
      {step === "trace" && motorOutput && (
        <div>
          <div style={card}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: G, marginBottom: "16px" }}>
              Traza del cálculo
            </div>
            <CalculationTrace
              formula={motorOutput.formula}
              inputs={motorOutput.inputs}
              result={motorOutput.result}
              trace={motorOutput.trace}
              taxonomyId={motorOutput.taxonomy_id}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button style={bSec} onClick={() => setStep("decisions")}>← Ajustar decisiones</button>
            <button
              style={btn}
              disabled={loading}
              onClick={generateDeclaration}
            >
              {loading ? "Generando…" : "Generar declaración →"}
            </button>
          </div>
        </div>
      )}

      {/* Step: declaration */}
      {step === "declaration" && declaration && (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <EvidenceReport
              type={declaration.type}
              text={declaration.text}
              caseId={declaration.case_id}
              loading={loading}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button style={bSec} onClick={() => setStep("trace")}>← Ver traza</button>
            <button style={btn} onClick={reset}>Nuevo análisis</button>
          </div>
        </div>
      )}
    </div>
  );
}
