import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface FinalReportProps {
  caseId: string;
}

interface CaseRow {
  id: string;
  discipline?: string;
  description?: string;
  status?: string;
  created_at?: string;
}

interface EvidenceMapRow {
  id: string;
  mapa_json?: {
    nodes?: Array<{ id: string; label?: string; level?: number; kind?: string }>;
    works?: Array<{ name?: string; pages?: number; sha256?: string }>;
    author_decisions?: Array<{
      entityId: string;
      originalLevel: number;
      overrideLevel: number;
      reason: string;
      timestamp?: number;
    }>;
  };
  author_decisions_json?: Array<{
    entityId: string;
    originalLevel: number;
    overrideLevel: number;
    reason: string;
    timestamp?: number;
  }>;
  created_at?: string;
}

interface MotorOutputRow {
  id: string;
  formula?: string;
  inputs?: unknown;
  result?: unknown;
  trace?: unknown;
  created_at?: string;
}

interface DeclarationRow {
  id: string;
  type?: "A" | "B" | "C" | "D";
  text?: string;
  generated_at?: string;
}

interface ReportData {
  case: CaseRow | null;
  evidenceMap: EvidenceMapRow | null;
  motorOutput: MotorOutputRow | null;
  declaration: DeclarationRow | null;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TYPE_COLORS: Record<string, string> = {
  A: "#1a7a50",
  B: "#4a7a1a",
  C: "#7a5a1a",
  D: "#7a1a1a",
};
const TYPE_BG: Record<string, string> = {
  A: "#d4f0e4",
  B: "#e4f0d4",
  C: "#f0e4d4",
  D: "#f0d4d4",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "40px", pageBreakInside: "avoid" }}>
      <h2
        style={{
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#8a7e72",
          borderBottom: "1px solid #e8e3db",
          paddingBottom: "8px",
          marginBottom: "16px",
          fontWeight: "600",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div style={{ marginBottom: "8px", display: "flex", gap: "12px" }}>
      <span style={{ fontSize: "12px", color: "#8a7e72", minWidth: "130px" }}>{label}</span>
      <span style={{ fontSize: "13px", color: "#2c2820" }}>{value ?? "—"}</span>
    </div>
  );
}

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

function extractRStar(result: unknown): string {
  if (result === null || result === undefined) return "—";
  if (typeof result === "number") return result.toFixed(4);
  if (Array.isArray(result)) return Number(result[0]).toFixed(4);
  if (typeof result === "object") {
    const r = result as Record<string, unknown>;
    if ("numerator" in r && "denominator" in r) {
      const n = Number(r.numerator);
      const d = Number(r.denominator);
      return d !== 0 ? (n / d).toFixed(4) : "∞";
    }
    const vals = Object.values(r);
    if (vals.length > 0) return Number(vals[0]).toFixed(4);
  }
  return String(result);
}

function extractTraceField(trace: unknown, key: string): string {
  if (!trace || typeof trace !== "object") return "—";
  const t = trace as Record<string, unknown>;
  if (key in t) return String(t[key]);
  if (Array.isArray(trace)) {
    const step = (trace as Array<Record<string, unknown>>).find(
      (s) => s.step?.toString().toLowerCase().includes(key.toLowerCase())
    );
    return step?.value !== undefined ? String(step.value) : "—";
  }
  return "—";
}

export default function FinalReport({ caseId }: FinalReportProps) {
  const [data, setData] = useState<ReportData>({
    case: null,
    evidenceMap: null,
    motorOutput: null,
    declaration: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [casesRes, mapsRes, motorRes, declRes] = await Promise.all([
          supabase.from("cases").select("*").eq("id", caseId).single(),
          supabase
            .from("evidence_maps")
            .select("*")
            .eq("case_id", caseId)
            .order("created_at", { ascending: false })
            .limit(1),
          supabase
            .from("motor_outputs")
            .select("*")
            .eq("case_id", caseId)
            .order("created_at", { ascending: false })
            .limit(1),
          supabase
            .from("declarations")
            .select("*")
            .eq("case_id", caseId)
            .order("generated_at", { ascending: false })
            .limit(1),
        ]);

        setData({
          case: casesRes.data ?? null,
          evidenceMap: mapsRes.data?.[0] ?? null,
          motorOutput: motorRes.data?.[0] ?? null,
          declaration: declRes.data?.[0] ?? null,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error al cargar el expediente");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [caseId]);

  if (loading) {
    return (
      <div style={{ padding: "48px", textAlign: "center", color: "#8a7e72", fontSize: "13px" }}>
        Cargando expediente…
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ padding: "24px", color: "#7a1a1a", fontSize: "13px" }}>
        {error}
      </div>
    );
  }

  const { case: c, evidenceMap, motorOutput, declaration } = data;
  const nodes = evidenceMap?.mapa_json?.nodes ?? [];
  const works = evidenceMap?.mapa_json?.works ?? [];
  const decisions =
    evidenceMap?.author_decisions_json ??
    evidenceMap?.mapa_json?.author_decisions ??
    [];

  const actors = nodes.filter((n) => n.kind === "concept" || !n.kind);
  const acts = nodes.filter((n) => n.kind === "formulation");
  const conditions = nodes.filter((n) => n.kind === "method");

  const levelDist: Record<number, number> = {};
  for (const n of nodes) {
    const l = n.level ?? 0;
    levelDist[l] = (levelDist[l] ?? 0) + 1;
  }

  const decType = declaration?.type;

  return (
    <div
      id="final-report"
      style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "48px 40px",
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: "#2c2820",
        lineHeight: "1.6",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "48px", borderBottom: "2px solid #3d3530", paddingBottom: "24px" }}>
        <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8a7e72", marginBottom: "8px" }}>
          Motor de Convergencia Causal Prometeo
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#3d3530", margin: 0 }}>
          Expediente de análisis
        </h1>
        <div style={{ fontSize: "12px", color: "#8a7e72", marginTop: "8px", fontFamily: "monospace" }}>
          ID: {caseId}
        </div>
      </div>

      {/* Sección 1 — Caso */}
      <Section title="1. Caso">
        <Field label="Disciplina" value={c?.discipline} />
        <Field label="Descripción" value={c?.description} />
        <Field label="Fecha" value={formatDate(c?.created_at)} />
        <Field label="Estado" value={c?.status} />
      </Section>

      {/* Sección 2 — Documentos */}
      <Section title="2. Documentos analizados">
        {works.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#8a7e72", fontStyle: "italic" }}>
            Sin documentos registrados.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e8e3db" }}>
                {["Nombre", "Páginas", "SHA-256"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: "#8a7e72", fontWeight: "600", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {works.map((w, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0ece6" }}>
                  <td style={{ padding: "7px 8px" }}>{w.name ?? "—"}</td>
                  <td style={{ padding: "7px 8px" }}>{w.pages ?? "—"}</td>
                  <td style={{ padding: "7px 8px", fontFamily: "monospace", fontSize: "11px", color: "#8a7e72" }}>
                    {w.sha256 ? w.sha256.slice(0, 16) + "…" : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>

      {/* Sección 3 — Mapa de evidencia */}
      <Section title="3. Mapa de evidencia">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }}>
          {[
            { label: "Actores", count: actors.length, sub: "kind: concept" },
            { label: "Actos", count: acts.length, sub: "kind: formulation" },
            { label: "Condiciones", count: conditions.length, sub: "kind: method" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#faf9f7", border: "1px solid #e8e3db", borderRadius: "8px", padding: "12px 14px" }}>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "#3d3530" }}>{item.count}</div>
              <div style={{ fontSize: "12px", color: "#5a5248", fontWeight: "600" }}>{item.label}</div>
              <div style={{ fontSize: "11px", color: "#b0a898" }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {Object.keys(levelDist).length > 0 && (
          <div>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#8a7e72", marginBottom: "8px" }}>
              Distribución E0–E8
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((l) =>
                levelDist[l] ? (
                  <div key={l} style={{ background: "#f0ece6", borderRadius: "4px", padding: "4px 10px", fontSize: "12px" }}>
                    <strong>E{l}</strong>
                    <span style={{ color: "#8a7e72", marginLeft: "4px" }}>{levelDist[l]}</span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
      </Section>

      {/* Sección 4 — Decisiones del analista */}
      <Section title="4. Decisiones del analista">
        {decisions.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#8a7e72", fontStyle: "italic" }}>Sin ajustes de autor registrados.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e8e3db" }}>
                {["Entidad", "E original", "E ajustado", "Justificación", "Timestamp"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: "#8a7e72", fontWeight: "600", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {decisions.map((d, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0ece6" }}>
                  <td style={{ padding: "7px 8px", fontFamily: "monospace", fontSize: "11px" }}>{d.entityId}</td>
                  <td style={{ padding: "7px 8px" }}>E{d.originalLevel}</td>
                  <td style={{ padding: "7px 8px", fontWeight: "600" }}>E{d.overrideLevel}</td>
                  <td style={{ padding: "7px 8px" }}>{d.reason}</td>
                  <td style={{ padding: "7px 8px", fontSize: "11px", color: "#8a7e72" }}>
                    {d.timestamp ? formatDate(new Date(d.timestamp).toISOString()) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Section>

      {/* Sección 5 — Cálculo */}
      <Section title="5. Cálculo">
        <Field label="Fórmula" value={motorOutput?.formula} />
        <Field label="R* (resultado)" value={extractRStar(motorOutput?.result)} />
        <Field label="S (estabilidad)" value={extractTraceField(motorOutput?.trace, "s")} />
        <Field label="α (alpha)" value={extractTraceField(motorOutput?.trace, "alpha")} />
        <Field label="Δ (delta)" value={extractTraceField(motorOutput?.trace, "delta")} />
        <Field label="P(Hijos)" value={extractTraceField(motorOutput?.trace, "p_hijos")} />
        <Field
          label="Tipo de declaración"
          value={decType ? `Tipo ${decType}` : "—"}
        />
        <Field label="Calculado" value={formatDate(motorOutput?.created_at)} />
      </Section>

      {/* Sección 6 — Declaración */}
      <Section title="6. Declaración">
        {!declaration ? (
          <p style={{ fontSize: "13px", color: "#8a7e72", fontStyle: "italic" }}>Declaración no generada.</p>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span
                style={{
                  background: decType ? TYPE_BG[decType] : "#f0ece6",
                  color: decType ? TYPE_COLORS[decType] : "#8a7e72",
                  padding: "4px 14px",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "0.06em",
                }}
              >
                TIPO {declaration.type}
              </span>
              <span style={{ fontSize: "12px", color: "#8a7e72" }}>
                {formatDate(declaration.generated_at)}
              </span>
            </div>
            <div
              style={{
                fontSize: "14px",
                lineHeight: "1.8",
                color: "#2c2820",
                background: "#faf9f7",
                border: "1px solid #e8e3db",
                borderRadius: "8px",
                padding: "20px 24px",
                whiteSpace: "pre-wrap",
              }}
            >
              {declaration.text}
            </div>
          </>
        )}
      </Section>

      {/* Sección 7 — Metodología */}
      <Section title="7. Metodología">
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#4a4238", maxWidth: "600px" }}>
          Este análisis fue producido por el Motor de Convergencia Causal Prometeo.
          El modelo de lenguaje es un narrador formal: presenta los resultados del motor
          en el lenguaje ontológico del Paradigma. La inteligencia analítica reside en
          el motor y en el Paradigma, no en el modelo de lenguaje. Toda declaración es
          falsificable y puede auditarse paso a paso.
        </p>
      </Section>

      {/* Botón export */}
      <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #e8e3db" }}>
        <button
          className="no-print"
          onClick={() => window.print()}
          style={{
            padding: "10px 24px",
            background: "#3d3530",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Exportar PDF
        </button>
      </div>
    </div>
  );
}
