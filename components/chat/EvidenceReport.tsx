import React from "react";

interface EvidenceReportProps {
  type: "A" | "B" | "C" | "D";
  text: string;
  caseId: string;
  loading?: boolean;
}

const TYPE_CONFIG = {
  A: {
    label: "Declaración A — Convergencia conclusiva",
    bg: "#f0faf5",
    border: "#6abf99",
    badge: "#1a7a50",
    badgeBg: "#d4f0e4",
    icon: "●",
  },
  B: {
    label: "Declaración B — Convergencia probable",
    bg: "#f5faf0",
    border: "#9abf6a",
    badge: "#4a7a1a",
    badgeBg: "#e4f0d4",
    icon: "◑",
  },
  C: {
    label: "Declaración C — Convergencia ambigua",
    bg: "#fdf8f0",
    border: "#bfa06a",
    badge: "#7a5a1a",
    badgeBg: "#f0e4d4",
    icon: "◔",
  },
  D: {
    label: "Declaración D — Evidencia insuficiente",
    bg: "#fdf5f5",
    border: "#bf8a8a",
    badge: "#7a1a1a",
    badgeBg: "#f0d4d4",
    icon: "○",
  },
};

export default function EvidenceReport({
  type,
  text,
  caseId,
  loading,
}: EvidenceReportProps) {
  const cfg = TYPE_CONFIG[type];

  if (loading) {
    return (
      <div style={{ padding: "24px", textAlign: "center", color: "#8a7e72", fontSize: "13px" }}>
        Generando declaración...
      </div>
    );
  }

  return (
    <div
      style={{
        background: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          borderBottom: `1px solid ${cfg.border}`,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            background: cfg.badgeBg,
            color: cfg.badge,
            padding: "3px 10px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.05em",
          }}
        >
          {cfg.icon} TIPO {type}
        </span>
        <span style={{ color: cfg.badge, fontSize: "12px", fontWeight: "500" }}>
          {cfg.label.split("—")[1]?.trim()}
        </span>
        <span style={{ marginLeft: "auto", color: "#b0a898", fontSize: "11px", fontFamily: "monospace" }}>
          {caseId.slice(0, 8)}…
        </span>
      </div>

      <div style={{ padding: "16px 20px" }}>
        <div
          style={{
            fontSize: "14px",
            lineHeight: "1.75",
            color: "#2c2820",
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
