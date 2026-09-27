import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface AuditTrailProps {
  caseId: string;
}

interface TimelineEvent {
  id: string;
  label: string;
  detail: string;
  timestamp: string | null;
  kind: "load" | "detect" | "decision" | "motor" | "declaration";
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const KIND_COLOR: Record<TimelineEvent["kind"], string> = {
  load: "#6a8abf",
  detect: "#6abf99",
  decision: "#bf9a6a",
  motor: "#3d3530",
  declaration: "#7a4a7a",
};

const KIND_ICON: Record<TimelineEvent["kind"], string> = {
  load: "↑",
  detect: "◎",
  decision: "✎",
  motor: "⚙",
  declaration: "✦",
};

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("es-MX", {
    dateStyle: "medium",
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
  }
  return String(result);
}

export default function AuditTrail({ caseId }: AuditTrailProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [mapsRes, motorRes, declRes] = await Promise.all([
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

        const map = mapsRes.data?.[0];
        const motor = motorRes.data?.[0];
        const decl = declRes.data?.[0];

        const nodes: Array<{ kind?: string }> = map?.mapa_json?.nodes ?? [];
        const decisions: Array<{
          entityId: string;
          originalLevel: number;
          overrideLevel: number;
          reason: string;
          timestamp?: number;
        }> =
          map?.author_decisions_json ??
          map?.mapa_json?.author_decisions ??
          [];

        const built: TimelineEvent[] = [];

        // (1) Documentos cargados
        built.push({
          id: "load",
          kind: "load",
          label: "Documentos cargados",
          detail: `Mapa de evidencia registrado en Supabase`,
          timestamp: map?.created_at ?? null,
        });

        // (2) Evidencia detectada
        built.push({
          id: "detect",
          kind: "detect",
          label: "Evidencia detectada",
          detail: `${nodes.length} nodo${nodes.length !== 1 ? "s" : ""} encontrado${nodes.length !== 1 ? "s" : ""} — actores: ${nodes.filter((n) => n.kind === "concept" || !n.kind).length}, actos: ${nodes.filter((n) => n.kind === "formulation").length}, condiciones: ${nodes.filter((n) => n.kind === "method").length}`,
          timestamp: map?.created_at ?? null,
        });

        // (3) Decisiones del analista — una por AuthorDecision
        for (const d of decisions) {
          built.push({
            id: `decision-${d.entityId}`,
            kind: "decision",
            label: `Decisión de autor — ${d.entityId}`,
            detail: `E${d.originalLevel} → E${d.overrideLevel}: "${d.reason}"`,
            timestamp: d.timestamp ? new Date(d.timestamp).toISOString() : map?.created_at ?? null,
          });
        }

        // (4) Motor calculó
        built.push({
          id: "motor",
          kind: "motor",
          label: "Motor calculó",
          detail: `Fórmula: ${motor?.formula ?? "—"} · R* = ${extractRStar(motor?.result)}`,
          timestamp: motor?.created_at ?? null,
        });

        // (5) Declaración generada
        built.push({
          id: "declaration",
          kind: "declaration",
          label: "Declaración generada",
          detail: `Tipo ${decl?.type ?? "—"} — ${decl?.text?.slice(0, 80) ?? "sin texto"}…`,
          timestamp: decl?.generated_at ?? null,
        });

        // Sort chronologically (nulls last)
        built.sort((a, b) => {
          if (!a.timestamp) return 1;
          if (!b.timestamp) return -1;
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        });

        setEvents(built);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error al cargar la auditoría");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [caseId]);

  if (loading) {
    return (
      <div style={{ padding: "24px", textAlign: "center", color: "#8a7e72", fontSize: "13px" }}>
        Cargando auditoría…
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ padding: "24px", color: "#7a1a1a", fontSize: "13px" }}>{error}</div>
    );
  }

  return (
    <div style={{ maxWidth: "640px", padding: "32px 0", fontFamily: "system-ui, sans-serif" }}>
      <h2
        style={{
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#8a7e72",
          borderBottom: "1px solid #e8e3db",
          paddingBottom: "8px",
          marginBottom: "28px",
          fontWeight: "600",
        }}
      >
        Auditoría del análisis
      </h2>

      <div style={{ position: "relative", paddingLeft: "32px" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "11px",
            top: "0",
            bottom: "0",
            width: "2px",
            background: "#e8e3db",
          }}
        />

        {events.map((ev, i) => {
          const color = KIND_COLOR[ev.kind];
          const icon = KIND_ICON[ev.kind];
          return (
            <div
              key={ev.id}
              style={{
                position: "relative",
                marginBottom: i < events.length - 1 ? "28px" : "0",
                pageBreakInside: "avoid",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-28px",
                  top: "2px",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                {icon}
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#2c2820" }}>
                    {ev.label}
                  </span>
                  <span style={{ fontSize: "11px", color: "#8a7e72" }}>
                    {formatDate(ev.timestamp)}
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "#5a5248", lineHeight: "1.5" }}>
                  {ev.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
