import React from "react";

interface TraceStep {
  step: string;
  value?: unknown;
  [key: string]: unknown;
}

interface CalculationTraceProps {
  formula: string;
  inputs: unknown;
  result: unknown;
  trace: TraceStep[] | unknown;
  taxonomyId?: string;
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "number") return v.toFixed(4);
  if (Array.isArray(v)) return `[${v.map(formatValue).join(", ")}]`;
  if (typeof v === "object") {
    const obj = v as Record<string, unknown>;
    if ("numerator" in obj && "denominator" in obj) {
      const n = Number(obj.numerator);
      const d = Number(obj.denominator);
      return d !== 0 ? `${n}/${d} ≈ ${(n / d).toFixed(4)}` : `${n}/0`;
    }
    return JSON.stringify(v);
  }
  return String(v);
}

export default function CalculationTrace({
  formula,
  inputs,
  result,
  trace,
  taxonomyId,
}: CalculationTraceProps) {
  const steps = Array.isArray(trace) ? trace : [];

  return (
    <div style={{ fontFamily: "monospace", fontSize: "13px", color: "#2c2820" }}>
      <div style={{ marginBottom: "12px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <span style={{ background: "#3d3530", color: "#fff", padding: "3px 10px", borderRadius: "4px", fontSize: "12px" }}>
          {formula}
        </span>
        {taxonomyId && (
          <span style={{ background: "#e8e3db", color: "#5a5248", padding: "3px 10px", borderRadius: "4px", fontSize: "12px" }}>
            {taxonomyId}
          </span>
        )}
      </div>

      <div style={{ background: "#faf9f7", border: "1px solid #e8e3db", borderRadius: "8px", padding: "12px", marginBottom: "10px" }}>
        <div style={{ color: "#8a7e72", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
          Entradas
        </div>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all", color: "#4a4238", fontSize: "12px" }}>
          {JSON.stringify(inputs, null, 2)}
        </pre>
      </div>

      {steps.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <div style={{ color: "#8a7e72", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
            Traza ({steps.length} pasos)
          </div>
          <div style={{ borderLeft: "2px solid #e8e3db", paddingLeft: "12px" }}>
            {steps.map((s, i) => (
              <div key={i} style={{ marginBottom: "6px", display: "flex", gap: "8px" }}>
                <span style={{ color: "#b0a898", minWidth: "20px" }}>{i + 1}.</span>
                <span style={{ color: "#5a5248", flex: 1 }}>
                  <strong>{s.step}</strong>
                  {s.value !== undefined && (
                    <span style={{ color: "#8a7e72", marginLeft: "8px" }}>→ {formatValue(s.value)}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: "#3d3530", color: "#fff", borderRadius: "8px", padding: "12px" }}>
        <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#b0a898", marginBottom: "6px" }}>
          Resultado R*
        </div>
        <div style={{ fontSize: "18px", fontWeight: "700" }}>{formatValue(result)}</div>
      </div>
    </div>
  );
}
