import React, { useState } from "react";

export type EvidenceLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface EvidenceNode {
  id: string;
  label: string;
  level: EvidenceLevel;
}

export interface AuthorDecision {
  entityId: string;
  originalLevel: EvidenceLevel;
  overrideLevel: EvidenceLevel;
  reason: string;
}

interface AuthorDecisionPanelProps {
  nodes: EvidenceNode[];
  decisions: AuthorDecision[];
  onChange: (decisions: AuthorDecision[]) => void;
}

const LEVEL_LABELS: Record<number, string> = {
  0: "0 — Sin clasificar",
  1: "1 — Documento directo",
  2: "2 — Pericial",
  3: "3 — Testimonios múltiples",
  4: "4 — Patrón documentado",
  5: "5 — Testimonio + documento parcial",
  6: "6 — Inferencia por cargo",
  7: "7 — Coincidencia",
  8: "8 — Testimonio único",
};

const G = "#3d3530";

export default function AuthorDecisionPanel({
  nodes,
  decisions,
  onChange,
}: AuthorDecisionPanelProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  function getDecision(nodeId: string): AuthorDecision | undefined {
    return decisions.find((d) => d.entityId === nodeId);
  }

  function applyOverride(
    node: EvidenceNode,
    overrideLevel: EvidenceLevel,
    reason: string
  ) {
    const existing = getDecision(node.id);
    const updated: AuthorDecision = {
      entityId: node.id,
      originalLevel: existing?.originalLevel ?? node.level,
      overrideLevel,
      reason,
    };
    const rest = decisions.filter((d) => d.entityId !== node.id);
    onChange([...rest, updated]);
  }

  function removeOverride(nodeId: string) {
    onChange(decisions.filter((d) => d.entityId !== nodeId));
  }

  if (nodes.length === 0) {
    return (
      <div style={{ color: "#8a7e72", fontSize: "13px", fontStyle: "italic" }}>
        No hay nodos de evidencia para revisar.
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: "12px", color: "#8a7e72", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
        {nodes.length} nodo{nodes.length !== 1 ? "s" : ""} · {decisions.length} decisión{decisions.length !== 1 ? "es" : ""} de autor
      </div>

      {nodes.map((node) => {
        const decision = getDecision(node.id);
        const isOpen = expanded === node.id;
        const effectiveLevel = decision?.overrideLevel ?? node.level;

        return (
          <div
            key={node.id}
            style={{
              border: `1px solid ${decision ? "#c8dcd8" : "#e8e3db"}`,
              borderRadius: "8px",
              marginBottom: "8px",
              background: decision ? "#f5faf9" : "#fff",
              overflow: "hidden",
            }}
          >
            <div
              style={{ padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              onClick={() => setExpanded(isOpen ? null : node.id)}
            >
              <div>
                <span style={{ fontWeight: "600", color: G, fontSize: "13px" }}>{node.label}</span>
                <span style={{ marginLeft: "10px", fontSize: "12px", color: "#8a7e72" }}>
                  E{effectiveLevel}
                  {decision && (
                    <span style={{ color: "#4a8a78", marginLeft: "6px" }}>
                      (era E{decision.originalLevel})
                    </span>
                  )}
                </span>
              </div>
              <span style={{ color: "#b0a898", fontSize: "12px" }}>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
              <NodeEditor
                node={node}
                decision={decision}
                onApply={(level, reason) => applyOverride(node, level, reason)}
                onRemove={() => removeOverride(node.id)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function NodeEditor({
  node,
  decision,
  onApply,
  onRemove,
}: {
  node: EvidenceNode;
  decision?: AuthorDecision;
  onApply: (level: EvidenceLevel, reason: string) => void;
  onRemove: () => void;
}) {
  const [level, setLevel] = useState<EvidenceLevel>(decision?.overrideLevel ?? node.level);
  const [reason, setReason] = useState(decision?.reason ?? "");

  const G = "#3d3530";
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #e8e3db",
    borderRadius: "6px",
    fontSize: "13px",
    color: G,
    background: "#fff",
    boxSizing: "border-box",
  };

  return (
    <div style={{ borderTop: "1px solid #e8e3db", padding: "12px 14px", background: "#faf9f7" }}>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ fontSize: "12px", color: "#8a7e72", display: "block", marginBottom: "4px" }}>
          Nivel de evidencia
        </label>
        <select
          value={level}
          onChange={(e) => setLevel(Number(e.target.value) as EvidenceLevel)}
          style={inputStyle}
        >
          {Object.entries(LEVEL_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontSize: "12px", color: "#8a7e72", display: "block", marginBottom: "4px" }}>
          Justificación del autor
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Razón para el ajuste..."
          rows={2}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => onApply(level, reason)}
          disabled={!reason.trim()}
          style={{
            padding: "7px 14px",
            background: G,
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            cursor: reason.trim() ? "pointer" : "not-allowed",
            opacity: reason.trim() ? 1 : 0.5,
          }}
        >
          Aplicar decisión
        </button>
        {decision && (
          <button
            onClick={onRemove}
            style={{
              padding: "7px 14px",
              background: "transparent",
              color: "#8a7e72",
              border: "1px solid #e8e3db",
              borderRadius: "6px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Quitar ajuste
          </button>
        )}
      </div>
    </div>
  );
}
