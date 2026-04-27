import { useState } from "react";

// ─── MAPEO INTERNO: tipos de documento → nivel E ─────────────
// Múltiples evidencias: se toma el nivel más fuerte (número más bajo)
// y el pesoMax se ajusta +0.05 por cada evidencia adicional (techo 0.95)
const TIPOS_DOCUMENTO = [
  { id: "doc_directo",          texto: "Contrato, orden escrita, correo con instrucción directa, acta firmada",                                nivel: 1, min: 0.75, max: 0.95 },
  { id: "pericial",             texto: "Dictamen pericial, análisis forense, auditoría especializada, dictamen médico",                        nivel: 2, min: 0.70, max: 0.90 },
  { id: "testimonios_multiples",texto: "Dos o más testigos que no se coordinaron, con algún documento institucional de respaldo",              nivel: 3, min: 0.45, max: 0.65 },
  { id: "patron",               texto: "Patrón histórico o estadístico documentado de conducta similar",                                       nivel: 4, min: 0.38, max: 0.58 },
  { id: "testimonio_unico_doc", texto: "Un solo testigo, con algún documento que respalda parcialmente su versión",                            nivel: 5, min: 0.28, max: 0.48 },
  { id: "inferencia_cargo",     texto: "No hay documento directo, pero su cargo y autoridad lo hacen el responsable lógico de la decisión",    nivel: 6, min: 0.18, max: 0.38 },
  { id: "coincidencia",         texto: "Solo coincidencia de fechas o lugares, sin evidencia del mecanismo causal",                            nivel: 7, min: 0.08, max: 0.28 },
  { id: "testimonio_solo",      texto: "Solo un testimonio sin ningún documento ni otro testigo",                                               nivel: 8, min: 0.03, max: 0.18 },
];

// Calcula pesoMin y pesoMax cuando hay múltiples evidencias seleccionadas
function calcularPesosMultiples(docIds) {
  if (!docIds || docIds.length === 0) return { nivel: 6, min: 0.18, max: 0.38 };
  const docs = TIPOS_DOCUMENTO.filter(d => docIds.includes(d.id));
  if (docs.length === 0) return { nivel: 6, min: 0.18, max: 0.38 };
  // Nivel más fuerte = número más bajo
  const mejor = docs.reduce((a, b) => a.nivel < b.nivel ? a : b);
  // Cada evidencia adicional sube el pesoMax 0.05, con techo en 0.95
  const adicionales = docs.length - 1;
  const maxAjustado = Math.min(0.95, mejor.max + adicionales * 0.05);
  return { nivel: mejor.nivel, min: mejor.min, max: maxAjustado };
}

// ─── PREGUNTAS PARA TIPO DE ACTOR ────────────────────────────
const PREGUNTAS_TIPO = [
  { id: "creo_condiciones", texto: "¿Tomó decisiones que crearon las reglas, protocolos o condiciones del sistema en que ocurrió el resultado? (aunque no haya estado presente en el momento del daño)" },
  { id: "realizo_acto",     texto: "¿Realizó directamente el acto que produjo el resultado?" },
  { id: "debio_actuar",     texto: "¿Tenía obligación documentada de actuar, supervisar o reportar, y no lo hizo?" },
  { id: "es_sistema",       texto: "¿Es un sistema, protocolo, formulario o herramienta sin voluntad propia?" },
];

// Marco de actuación — informa S junto con las preguntas de modo
const PREGUNTAS_MARCO = [
  { id: "dentro_mandato",  texto: "Actuó dentro de lo que el sistema, su cargo o su mandato le exigía — lo que hizo era lo esperado en esa posición" },
  { id: "fuera_mandato",   texto: "Actuó más allá o en contra de lo que su cargo o mandato le exigía — tomó decisiones que excedían o contradecían lo establecido" },
  { id: "marco_no_claro",  texto: "No está claro — el expediente no tiene información suficiente sobre su mandato" },
];

function determinarTipo(resp) {
  if (resp.es_sistema)       return "instrumental";
  if (resp.creo_condiciones) return "diseno";
  if (resp.debio_actuar)     return "omision";
  if (resp.realizo_acto)     return "ejecucion";
  return "ejecucion";
}

// ─── PREGUNTAS PARA MODO CONDUCTUAL ──────────────────────────
const PREGUNTAS_MODO = [
  { id: "procedimiento", texto: "Siguió el procedimiento establecido — hay documentos que muestran que actuó conforme al protocolo, normativa o instrucción recibida, sin desviaciones. (Ej: acta de hechos, reporte de cumplimiento, firma de conformidad)", hijo: "anteros" },
  { id: "presion_propia",texto: "Actuó para evitar consecuencias sobre sí mismo — hay correos, declaraciones o registros con lenguaje defensivo, acción tardía tras señal de riesgo personal, o precedentes documentados de sanciones a quienes se negaron en esa misma posición.", hijo: "fobos" },
  { id: "coercion",      texto: "Fue presionado o coaccionado por otro actor con autoridad — hay correos, comunicados o registros de que alguien con autoridad sobre él lo instruyó, presionó o condicionó para que actuara de esa manera específica.", hijo: "fobos" },
  { id: "paralisis",     texto: "No actuó porque el sistema no lo permitía o no era claro — hay registros de que solicitó instrucciones sin respuesta, de que el protocolo no contemplaba el caso, o de que la ambigüedad del sistema le impidió actuar.", hijo: "deimos" },
  { id: "conviccion",    texto: "Actuó por iniciativa propia, excediendo o contrariando instrucciones — hay documentos que muestran decisiones más allá de su mandato o contrarias al protocolo, con criterio propio identificable.", hijo: "potos" },
  { id: "patron",        texto: "Hay evidencia de conducta reiterada en el mismo sentido — esta no fue una conducta aislada sino un patrón documentado a lo largo del tiempo.", hijo: "anteros" },
];

function determinarHijo(modos) {
  const votos = { fobos: 0, deimos: 0, anteros: 0, potos: 0 };
  if (modos.presion_propia) votos.fobos++;
  if (modos.coercion)       votos.fobos++;
  if (modos.paralisis)      votos.deimos++;
  if (modos.conviccion)     votos.potos++;
  if (modos.procedimiento)  votos.anteros++;
  if (modos.patron)         votos.anteros++;
  const max = Math.max(...Object.values(votos));
  if (max === 0) return "anteros";
  const candidatos = Object.keys(votos).filter(k => votos[k] === max);
  return candidatos.length === 1 ? candidatos[0] : "anteros";
}

// Distribución P(Hijos) desde expediente — parcial, con incertidumbre explícita
// Potós, Eros y Harmonía no son localizables desde expediente (ECO §I)
function distribucionHijos(modos) {
  const votos = { fobos: 0, deimos: 0, anteros: 0, potos: 0 };
  if (modos.presion_propia) votos.fobos++;
  if (modos.coercion)       votos.fobos++;
  if (modos.paralisis)      votos.deimos++;
  if (modos.conviccion)     votos.potos++;
  if (modos.procedimiento)  votos.anteros++;
  if (modos.patron)         votos.anteros++;
  const total = Object.values(votos).reduce(function(s, v) { return s + v; }, 0);
  if (total === 0) return null;
  return {
    fobos:    (votos.fobos   / total).toFixed(2),
    deimos:   (votos.deimos  / total).toFixed(2),
    anteros:  (votos.anteros / total).toFixed(2),
    potos:    (votos.potos   / total).toFixed(2),
    eros:     null,
    harmonia: null,
  };
}

// ─── ACCIONES POST-EVENTO → α ─────────────────────────────────
const ACCIONES = [
  { id: "pago_multa",      texto: "Pagó una multa o indemnización",                                    nDoc: 2, nivel: 2, nDom: 1 },
  { id: "fue_despedido",   texto: "Fue despedido o suspendido",                                        nDoc: 1, nivel: 3, nDom: 1 },
  { id: "proceso_penal",   texto: "Está siendo procesado penalmente o cumplió condena",                nDoc: 2, nivel: 2, nDom: 1 },
  { id: "modifico_sistema",texto: "Modificó el protocolo o sistema que causó el daño",                 nDoc: 2, nivel: 2, nDom: 1 },
  { id: "reconocimiento",  texto: "Reconoció formalmente su posición ante autoridad o tribunal",       nDoc: 1, nivel: 3, nDom: 1 },
  { id: "excluido",        texto: "Fue inhabilitado o excluido del sector",                             nDoc: 1, nivel: 2, nDom: 1 },
  { id: "pago_parcial",    texto: "Realizó pagos parciales o acuerdos de reparación",                  nDoc: 1, nivel: 3, nDom: 1 },
];

function calcularAlpha(sel, nI) {
  if (!sel || sel.length === 0) return { integrado: false, nDoc: 0, nivelEvidencia: 0, nDom: 0, nI };
  const acc = ACCIONES.filter(a => sel.includes(a.id));
  return {
    integrado: true,
    nDoc: acc.reduce((s, a) => s + a.nDoc, 0),
    nivelEvidencia: Math.min(...acc.map(a => a.nivel)),
    nDom: Math.min(acc.reduce((s, a) => s + a.nDom, 0), nI),
    nI,
  };
}

// ─── HELPERS ─────────────────────────────────────────────────
function pct(v) { return (v * 100).toFixed(1) + "%"; }
function etiquetaTipo(t) {
  return { diseno: "Diseño institucional", ejecucion: "Ejecución directa", omision: "Omisión", instrumental: "Sistema / Protocolo" }[t] || t;
}
const TIPO_COLOR = { diseno: "#1E4C45", ejecucion: "#856a00", omision: "#a04a00", instrumental: "#3a4a8a" };
const G  = "#1E4C45";
const BG = "#faf9f7";

function chip(color, texto) {
  return (
    <span style={{ display: "inline-block", fontSize: "11px", padding: "3px 12px", borderRadius: "20px", background: color + "18", color, border: `1px solid ${color}30`, fontFamily: "Georgia, serif", whiteSpace: "nowrap" }}>
      {texto}
    </span>
  );
}

function CheckRow({ checked, onChange, children }) {
  return (
    <div onClick={onChange} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 14px", borderRadius: "10px", cursor: "pointer", background: checked ? "#f0f6f4" : "transparent", transition: "background 0.12s", marginBottom: "6px" }}>
      <div style={{ width: "20px", height: "20px", borderRadius: "5px", border: `2px solid ${checked ? G : "#d4cfc8"}`, background: checked ? G : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", transition: "all 0.15s" }}>
        {checked && <span style={{ color: "#fff", fontSize: "12px", lineHeight: 1 }}>✓</span>}
      </div>
      <span style={{ fontSize: "14px", color: "#2c2820", lineHeight: "1.65" }}>{children}</span>
    </div>
  );
}

function RadioRow({ checked, onChange, children }) {
  return (
    <div onClick={onChange} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 14px", borderRadius: "10px", cursor: "pointer", background: checked ? "#f0f6f4" : "transparent", transition: "background 0.12s", marginBottom: "6px" }}>
      <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${checked ? G : "#d4cfc8"}`, background: checked ? G : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", transition: "all 0.15s" }}>
        {checked && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fff" }} />}
      </div>
      <span style={{ fontSize: "14px", color: "#2c2820", lineHeight: "1.65" }}>{children}</span>
    </div>
  );
}

const PASOS = ["El caso", "Involucrados", "Conexiones", "Lo que ocurrió después", "Magnitud del daño", "Calcular"];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────
export default function Constructor() {
  const [paso, setPaso]         = useState(0);
  const [caso, setCaso]         = useState({ titulo: "", resultado: "" });
  const [actores, setActores]   = useState([]);
  const [conexiones, setCons]   = useState([]);
  const [acciones, setAcciones] = useState({});
  const [pagados, setPagados]   = useState({}); // monto ya pagado/sufrido por nodo

  const [formA, setFA]   = useState({ nombre: "", descripcion: "", resp: {}, modos: {}, marco: "" });
  const [errA, setErrA]  = useState("");

  const [formC, setFC]   = useState({ desde: "", hacia: "", docIds: [], descripcion: "", nula: false });
  const [errC, setErrC]  = useState("");

  const [dtotal, setDTotal] = useState({ tInvertido: "", tImpedido: "", tTrayectoria: "" });
  const [calcStatus, setCS] = useState("idle");
  const [calcData, setCD]   = useState(null);
  const [calcError, setCE]  = useState("");
  const [expStatus, setES]  = useState("idle"); // idle | generando | error
  const [narrStatus, setNS] = useState("idle"); // idle | generando | listo | error
  const [narrUsada, setNU]  = useState(false);   // solo una vez por análisis

  const nI = actores.length;

  const grafo = {
    titulo: caso.titulo,
    nodos: [
      ...actores.map(a => ({ id: a.id, nombre: a.nombre, tipo: a.tipo, hijoDominante: a.hijo, descripcion: a.descripcion })),
      { id: "nodo_final", nombre: caso.resultado || "Resultado final", tipo: "final", descripcion: caso.resultado },
    ],
    aristas: conexiones.map(c => ({ origen: c.desde, destino: c.hacia, pesoMin: c.pesoMin, pesoMax: c.pesoMax, nivelEvidencia: c.nivel, descripcionEvidencia: c.descripcion })),
    insumosAlpha: actores.map(a => ({ id: a.id, ...calcularAlpha(acciones[a.id], nI) })),
    nodosIIC: [],
  };

  const danioCalc = {
    tInvertido:   { monto: parseFloat(dtotal.tInvertido)  || 0, descripcion: "Daño emergente" },
    tImpedido:    { monto: parseFloat(dtotal.tImpedido)   || 0, descripcion: "Lucro cesante", esEstimacion: true },
    tTrayectoria: { aplica: !!(parseFloat(dtotal.tTrayectoria) > 0), montoEstimado: parseFloat(dtotal.tTrayectoria) || 0, narrativa: "Pérdida de trayectoria" },
  };

  const problemas = [
    !caso.titulo.trim()    && "Falta el título del caso.",
    !caso.resultado.trim() && "Falta describir el resultado final.",
    actores.length < 2     && "Se necesitan al menos 2 involucrados.",
    conexiones.length === 0 && "No hay conexiones causales definidas.",
    !conexiones.some(c => c.hacia === "nodo_final") && "Ningún involucrado conecta con el resultado final.",
  ].filter(Boolean);

  function nombreActor(id) {
    if (id === "nodo_final") return caso.resultado || "Resultado final";
    return actores.find(a => a.id === id)?.nombre || id;
  }

  function agregarActor() {
    if (!formA.nombre.trim()) { setErrA("El nombre es obligatorio."); return; }
    const tipo = determinarTipo(formA.resp);
    const hijo = determinarHijo(formA.modos);
    const dist = distribucionHijos(formA.modos);
    setActores(p => [...p, { id: "actor_" + Date.now(), nombre: formA.nombre.trim(), descripcion: formA.descripcion.trim(), tipo, hijo, marco: formA.marco, dist }]);
    setFA({ nombre: "", descripcion: "", resp: {}, modos: {}, marco: "" });
    setErrA("");
  }

  function agregarConexion() {
    if (!formC.desde)  { setErrC("Selecciona quién causa."); return; }
    if (!formC.hacia)  { setErrC("Selecciona el destino."); return; }
    if (formC.desde === formC.hacia) { setErrC("El origen y destino no pueden ser el mismo."); return; }
    if (!formC.nula && formC.docIds.length === 0) { setErrC("Indica qué tienes en el expediente para esta conexión."); return; }
    const pesos = calcularPesosMultiples(formC.docIds);
    setCons(p => [...p, { desde: formC.desde, hacia: formC.hacia, nivel: formC.nula ? 0 : pesos.nivel, pesoMin: formC.nula ? 0 : pesos.min, pesoMax: formC.nula ? 0 : pesos.max, descripcion: formC.descripcion, nula: formC.nula, docIds: formC.docIds }]);
    setFC({ desde: "", hacia: "", docIds: [], descripcion: "", nula: false });
    setErrC("");
  }

  async function descargarExpediente() {
    if (!calcData) return;
    setES("generando");
    try {
      // Pasar dist y marco de cada actor al grafo para que expediente.js los use
      const grafoConDist = {
        ...grafo,
        nodos: grafo.nodos.map(function(nd) {
          const actor = actores.find(function(a) { return a.id === nd.id; });
          return actor ? { ...nd, dist: actor.dist, marco: actor.marco } : nd;
        }),
      };
      const res = await fetch("/api/expediente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grafo: grafoConDist,
          insumosAlpha: grafo.insumosAlpha,
          nodosIIC: grafo.nodosIIC,
          danio: danioCalc,
          metadatos: {
            titulo: caso.titulo || "Análisis causal",
            folio: "EP-" + Date.now(),
            fecha: new Date().toLocaleDateString("es-MX"),
          },
        }),
      });
      const html = await res.text();
      const blob = new Blob([html], { type: "text/html" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = (caso.titulo || "expediente").replace(/[^a-zA-Z0-9]/g, "_") + ".html";
      a.click();
      URL.revokeObjectURL(url);
      setES("idle");
    } catch (e) {
      console.error(e);
      setES("error");
    }
  }

  async function descargarNarrativa() {
    if (narrUsada || !calcData) return;
    setNS("generando");
    try {
      const res = await fetch("/api/narrativa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resultado: calcData,
          grafo: {
            ...grafo,
            nodos: grafo.nodos.map(function(nd) {
              const actor = actores.find(function(a) { return a.id === nd.id; });
              return actor ? { ...nd, dist: actor.dist, marco: actor.marco } : nd;
            }),
          },
          metadatos: {
            titulo: caso.titulo || "Análisis causal",
            folio: "EN-" + Date.now(),
            fecha: new Date().toLocaleDateString("es-MX"),
          },
        }),
      });
      const html = await res.text();
      const blob = new Blob([html], { type: "text/html" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = (caso.titulo || "narrativa").replace(/[^a-zA-Z0-9]/g, "_") + "_narrativa.html";
      a.click();
      URL.revokeObjectURL(url);
      setNS("listo");
      setNU(true); // bloquear — solo una vez por análisis
    } catch (e) {
      console.error(e);
      setNS("error");
    }
  }

  async function calcular() {
    setCS("calculando"); setCD(null); setCE("");
    try {
      const res = await fetch("/api/calcular", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ grafo, insumosAlpha: grafo.insumosAlpha, nodosIIC: [], danio: danioCalc }) });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCD(data); setCS("listo");
    } catch (e) { setCE(e.message || "Error al conectar."); setCS("error"); }
  }

  // Estilos base
  const inp = { width: "100%", padding: "12px 16px", border: "1.5px solid #d4cfc8", borderRadius: "10px", fontSize: "14px", fontFamily: "Georgia, serif", outline: "none", color: "#2c2820", background: "#fff", boxSizing: "border-box" };
  const ta  = { ...inp, resize: "vertical", minHeight: "76px", lineHeight: "1.6" };
  const sel = { ...inp, cursor: "pointer" };
  const btn = { background: G, color: "#D9D9D9", border: "none", padding: "12px 28px", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontFamily: "Georgia, serif" };
  const bSec= { background: "#fff", color: "#5a5248", border: "1.5px solid #d4cfc8", padding: "12px 28px", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontFamily: "Georgia, serif" };
  const bDel= { background: "none", border: "none", cursor: "pointer", color: "#c4bdb5", fontSize: "22px", lineHeight: 1, padding: "2px 6px" };
  const card= { background: "#fff", border: "1.5px solid #d4cfc8", borderRadius: "12px", padding: "20px 24px", marginBottom: "12px" };
  const cAdd= { ...card, borderStyle: "dashed" };
  const lbl = { fontSize: "13px", color: "#5a5248", display: "block", marginBottom: "7px" };
  const fld = { marginBottom: "20px" };
  const row2= { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" };
  const aOk = { background: "#e8f0ee", border: "1px solid #1E4C45", borderRadius: "10px", padding: "13px 18px", marginBottom: "20px", fontSize: "13px", color: G, lineHeight: "1.6" };
  const aEr = { background: "#fdf0f0", border: "1px solid #c0392b", borderRadius: "10px", padding: "13px 18px", marginBottom: "16px", fontSize: "13px", color: "#8a1a1a", lineHeight: "1.6" };
  const divH= { height: "1px", background: "#e8e3db", margin: "24px 0" };
  const secH= { fontSize: "21px", color: G, fontWeight: "600", marginBottom: "6px" };
  const secS= { fontSize: "14px", color: "#9a9080", marginBottom: "30px", lineHeight: "1.7" };
  const cSub= { fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: G, marginBottom: "18px" };

  const colorDecl = (n) => ({ A: [G, "#e8f0ee"], B: ["#856a00", "#fef9e8"], C: ["#a04a00", "#fdf0e8"], D: ["#8a1a1a", "#fdf0f0"] }[n] || ["#5a5248", "#f0ede8"]);

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "Georgia, serif", color: "#2c2820" }}>
      <style>{`input:focus,textarea:focus,select:focus{border-color:#1E4C45!important;box-shadow:0 0 0 3px rgba(30,76,69,0.09)}`}</style>

      {/* Header */}
      <div style={{ background: G, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src="/logo.svg"
            alt="Meriadock"
            style={{ height: "38px", width: "38px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
          <span style={{ fontSize: "15px", color: "#D9D9D9", letterSpacing: "0.04em", fontWeight: "600", fontFamily: "Georgia, serif" }}>
            Análisis causal
          </span>
        </div>
        <a href="/" style={{ fontSize: "12px", color: "rgba(217,217,217,0.5)", textDecoration: "none" }}>← Inicio</a>
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e3db", display: "flex", overflowX: "auto", paddingLeft: "12px" }}>
        {PASOS.map((t, i) => (
          <button key={i} onClick={() => setPaso(i)} style={{ padding: "14px 20px", background: "none", border: "none", borderBottom: i === paso ? `2px solid ${G}` : "2px solid transparent", color: i === paso ? G : i < paso ? "#7aab9a" : "#c4bdb5", cursor: "pointer", fontSize: "13px", fontFamily: "Georgia, serif", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: i === paso ? G : i < paso ? "#e8f0ee" : "#f0ede8", color: i === paso ? "#fff" : i < paso ? G : "#c4bdb5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", flexShrink: 0 }}>
              {i < paso ? "✓" : i + 1}
            </span>
            {t}
          </button>
        ))}
      </div>

      {/* Cuerpo */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "44px 20px 80px" }}>

        {/* ── PASO 0: EL CASO ─────────────────────────────────── */}
        {paso === 0 && (
          <div>
            <div style={secH}>El caso</div>
            <div style={secS}>Describe brevemente la situación. No es necesario que sea una narración completa.</div>
            <div style={fld}>
              <label style={lbl}>Título del caso</label>
              <input style={inp} value={caso.titulo} onChange={e => setCaso(p => ({ ...p, titulo: e.target.value }))} placeholder="Ej: Acceso no autorizado a expedientes bancarios" />
            </div>
            <div style={fld}>
              <label style={lbl}>¿Cuál es el resultado adverso que se analiza?</label>
              <textarea style={ta} value={caso.resultado} onChange={e => setCaso(p => ({ ...p, resultado: e.target.value }))} placeholder="Describe el daño, el accidente, el incumplimiento o el evento que se quiere explicar causalmente." />
            </div>
          </div>
        )}

        {/* ── PASO 1: INVOLUCRADOS ─────────────────────────────── */}
        {paso === 1 && (
          <div>
            <div style={secH}>Involucrados</div>
            <div style={secS}>Agrega a cada persona, empresa o institución que pudo haber contribuido al resultado. No incluyas a la fiscalía, el juez ni auditores externos.</div>

            {actores.map((a, i) => (
              <div key={a.id} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: "600", color: G, marginBottom: "8px" }}>{a.nombre}</div>
                    {chip(TIPO_COLOR[a.tipo] || G, etiquetaTipo(a.tipo))}
                  </div>
                  <button style={bDel} onClick={() => setActores(p => p.filter((_, j) => j !== i))}>×</button>
                </div>
                {a.descripcion && <div style={{ fontSize: "13px", color: "#5a5248", marginTop: "10px", lineHeight: "1.6" }}>{a.descripcion}</div>}
                {a.marco && a.marco !== "marco_no_claro" && (
                  <div style={{ fontSize: "12px", color: "#9a9080", marginTop: "6px", fontStyle: "italic" }}>
                    {a.marco === "dentro_mandato" ? "Actuó dentro del mandato" : "Actuó fuera del mandato"}
                  </div>
                )}
                {a.dist && (
                  <div style={{ fontSize: "11px", color: "#9a9080", marginTop: "8px", background: "#f8f6f3", borderRadius: "6px", padding: "7px 12px", lineHeight: "1.8" }}>
                    <span style={{ color: G, fontWeight: "600" }}>Localización desde expediente: </span>
                    {['fobos','deimos','anteros','potos']
                      .filter(function(k){ return parseFloat(a.dist[k]) > 0; })
                      .sort(function(x,y){ return parseFloat(a.dist[y]) - parseFloat(a.dist[x]); })
                      .map(function(k){ return k.charAt(0).toUpperCase()+k.slice(1)+' '+(parseFloat(a.dist[k])*100).toFixed(0)+'%'; })
                      .join(' · ')}
                    <span style={{ color: "#c4bdb5" }}> · Eros y Harmonía: requieren entrevista directa</span>
                  </div>
                )}
              </div>
            ))}

            <div style={cAdd}>
              <div style={cSub}>Agregar involucrado</div>
              <div style={fld}>
                <label style={lbl}>Nombre</label>
                <input style={inp} value={formA.nombre} onChange={e => setFA(p => ({ ...p, nombre: e.target.value }))} placeholder="Ej: Director General, Banco XYZ, Gerente de Operaciones" />
              </div>
              <div style={fld}>
                <label style={lbl}>Descripción breve de su papel en los hechos (opcional)</label>
                <textarea style={{ ...ta, minHeight: "60px" }} value={formA.descripcion} onChange={e => setFA(p => ({ ...p, descripcion: e.target.value }))} placeholder="Qué hizo, decidió u omitió" />
              </div>
              <div style={divH} />
              <div style={{ fontSize: "13px", color: "#5a5248", marginBottom: "14px", lineHeight: "1.7" }}>¿Cuál fue su papel en los hechos? Marca todo lo que aplique según el expediente.</div>
              {PREGUNTAS_TIPO.map(p => (
                <CheckRow key={p.id} checked={!!formA.resp[p.id]} onChange={() => setFA(n => ({ ...n, resp: { ...n.resp, [p.id]: !n.resp[p.id] } }))}>
                  {p.texto}
                </CheckRow>
              ))}
              <div style={divH} />
              <div style={{ fontSize: "13px", color: "#5a5248", marginBottom: "14px" }}>¿Dentro de qué marco actuó? <span style={{ color: "#9a9080" }}>(una sola opción)</span></div>
              {PREGUNTAS_MARCO.map(p => (
                <RadioRow key={p.id} checked={formA.marco === p.id} onChange={() => setFA(n => ({ ...n, marco: n.marco === p.id ? "" : p.id }))}>
                  {p.texto}
                </RadioRow>
              ))}

              <div style={divH} />
              <div style={{ fontSize: "13px", color: "#5a5248", marginBottom: "8px" }}>¿Qué muestran los documentos sobre cómo actuó?</div>
              <div style={{ fontSize: "12px", color: "#9a9080", marginBottom: "14px", lineHeight: "1.6", background: "#f8f6f3", borderRadius: "8px", padding: "10px 14px" }}>
                Desde el expediente solo es posible identificar con certeza tres modos: actuación por presión, por parálisis o por convicción propia. Los otros modos requieren la presencia directa del actor. Marca solo lo que esté documentado.
              </div>
              {PREGUNTAS_MODO.map(p => (
                <CheckRow key={p.id} checked={!!formA.modos[p.id]} onChange={() => setFA(n => ({ ...n, modos: { ...n.modos, [p.id]: !n.modos[p.id] } }))}>
                  {p.texto}
                </CheckRow>
              ))}
              {errA && <div style={{ ...aEr, marginTop: "14px" }}>{errA}</div>}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <button style={btn} onClick={agregarActor}>Agregar</button>
              </div>
            </div>
          </div>
        )}

        {/* ── PASO 2: CONEXIONES ──────────────────────────────── */}
        {paso === 2 && (
          <div>
            <div style={secH}>Conexiones causales</div>
            <div style={secS}>Indica para cada involucrado a quién influyó causalmente, y qué tienes en el expediente para sustentarlo.</div>

            {conexiones.map((c, i) => (
              <div key={i} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "14px", marginBottom: "8px" }}>
                      <span style={{ fontWeight: "600", color: G }}>{nombreActor(c.desde)}</span>
                      <span style={{ color: "#9a9080", margin: "0 10px" }}>influyó en</span>
                      <span style={{ fontWeight: "600", color: "#856a00" }}>{nombreActor(c.hacia)}</span>
                    </div>
                    {c.nula
                      ? chip("#8a1a1a", "Sin conexión documentada")
                      : chip(c.nivel <= 2 ? G : c.nivel <= 5 ? "#856a00" : "#a04a00", (c.docIds?.length > 1 ? c.docIds.length + " tipos de evidencia · " : "") + (TIPOS_DOCUMENTO.find(d => d.nivel === c.nivel)?.texto?.slice(0, 40) + "..."))
                    }
                  </div>
                  <button style={bDel} onClick={() => setCons(p => p.filter((_, j) => j !== i))}>×</button>
                </div>
                {c.descripcion && <div style={{ fontSize: "12px", color: "#9a9080", marginTop: "8px" }}>{c.descripcion}</div>}
              </div>
            ))}

            <div style={cAdd}>
              <div style={cSub}>Agregar conexión</div>
              <div style={row2}>
                <div style={fld}>
                  <label style={lbl}>¿Quién causó o contribuyó?</label>
                  <select style={sel} value={formC.desde} onChange={e => setFC(p => ({ ...p, desde: e.target.value }))}>
                    <option value="">Seleccionar...</option>
                    {actores.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                  </select>
                </div>
                <div style={fld}>
                  <label style={lbl}>¿A quién o qué influyó directamente?</label>
                  <select style={sel} value={formC.hacia} onChange={e => setFC(p => ({ ...p, hacia: e.target.value }))}>
                    <option value="">Seleccionar...</option>
                    {[...actores, { id: "nodo_final", nombre: "→ " + (caso.resultado || "Resultado final") }].filter(a => a.id !== formC.desde).map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                  </select>
                </div>
              </div>

              <CheckRow checked={formC.nula} onChange={() => setFC(p => ({ ...p, nula: !p.nula, docId: "" }))}>
                <span style={{ color: "#8a1a1a" }}>Tengo evidencia de que entre estos dos <strong>no existe</strong> conexión causal (declaro la ausencia explícitamente)</span>
              </CheckRow>

              {!formC.nula && (
                <>
                  <div style={{ ...divH, margin: "16px 0" }} />
                  <div style={{ fontSize: "13px", color: "#5a5248", marginBottom: "14px" }}>¿Qué tienes en el expediente para sustentar esta conexión? Selecciona la descripción más precisa.</div>
                  {TIPOS_DOCUMENTO.map(d => (
                    <CheckRow key={d.id} checked={formC.docIds.includes(d.id)} onChange={() => setFC(p => ({ ...p, docIds: p.docIds.includes(d.id) ? p.docIds.filter(x => x !== d.id) : [...p.docIds, d.id] }))}>
                      {d.texto}
                    </CheckRow>
                  ))}
                  {formC.docIds.length > 1 && (() => {
                    const p = calcularPesosMultiples(formC.docIds);
                    return <div style={{ background: "#e8f0ee", borderRadius: "8px", padding: "10px 14px", marginTop: "8px", fontSize: "12px", color: "#1E4C45" }}>Múltiples evidencias — rango ajustado: [{p.min.toFixed(2)}, {p.max.toFixed(2)}] · {p.max > TIPOS_DOCUMENTO.find(d=>d.id===formC.docIds[0])?.max ? "el pesoMax aumentó por evidencia adicional" : ""}</div>;
                  })()}
                </>
              )}

              <div style={{ ...fld, marginTop: "16px" }}>
                <label style={lbl}>Referencia del documento (opcional)</label>
                <input style={inp} value={formC.descripcion} onChange={e => setFC(p => ({ ...p, descripcion: e.target.value }))} placeholder="Ej: Contrato firmado el 14 de enero, folio 2021-034" />
              </div>

              {errC && <div style={aEr}>{errC}</div>}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={btn} onClick={agregarConexion}>Agregar conexión</button>
              </div>
            </div>
          </div>
        )}

        {/* ── PASO 3: LO QUE OCURRIÓ DESPUÉS ─────────────────── */}
        {paso === 3 && (
          <div>
            <div style={secH}>Lo que ocurrió después</div>
            <div style={secS}>Para cada involucrado, indica qué acciones concretas ocurrieron después del evento. Marca solo lo documentado en el expediente.</div>
            {actores.map(a => {
              const sel = acciones[a.id] || [];
              return (
                <div key={a.id} style={card}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "600", color: G }}>{a.nombre}</span>
                    {chip(TIPO_COLOR[a.tipo] || G, etiquetaTipo(a.tipo))}
                  </div>
                  {ACCIONES.map(ac => (
                    <CheckRow key={ac.id}
                      checked={sel.includes(ac.id)}
                      onChange={() => setAcciones(p => { const c = p[a.id] || []; return { ...p, [a.id]: c.includes(ac.id) ? c.filter(x => x !== ac.id) : [...c, ac.id] }; })}>
                      {ac.texto}
                    </CheckRow>
                  ))}
                  {sel.length === 0 && <div style={{ fontSize: "12px", color: "#9a9080", fontStyle: "italic", padding: "4px 14px" }}>Si no se marca nada, se registra que este involucrado no tomó acciones documentadas posteriores al evento.</div>}

                  {sel.length > 0 && (
                    <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #e8e3db" }}>
                      <label style={lbl}>¿Cuánto pagó, fue embargado o sufrió económicamente como consecuencia? (en pesos, 0 si no aplica o no hay monto documentado)</label>
                      <input
                        style={{ ...inp, maxWidth: "260px" }}
                        type="number" min="0"
                        value={pagados[a.id] || ""}
                        onChange={e => setPagados(p => ({ ...p, [a.id]: e.target.value }))}
                        placeholder="Monto en pesos"
                      />
                      <div style={{ fontSize: "12px", color: "#9a9080", marginTop: "5px", fontStyle: "italic" }}>
                        Incluye multas ejecutadas, indemnizaciones pagadas, bienes embargados, garantías ejecutadas. No incluyas montos declarados pero no ejecutados.
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── PASO 4: MAGNITUD DEL DAÑO ─────────────────── */}
        {paso === 4 && (
          <div>
            <div style={secH}>Cuantificación del daño</div>
            <div style={secS}>Define el monto total del daño causado. El sistema calculará cuánto corresponde a cada involucrado según su peso causal.</div>

            <div style={card}>
              <div style={{ fontSize: "13px", color: "#2c2820", lineHeight: "1.8", marginBottom: "20px" }}>
                El daño tiene tres partes. Responde las que puedas documentar con el expediente. Si no tienes todas, el sistema calcula escenarios con lo que hay.
              </div>

              <div style={fld}>
                <label style={lbl}>
                  ¿Cuánto perdió directamente la víctima?
                  <span style={{ fontWeight: "400", color: "#9a9080" }}> — dinero, bienes o contratos que tenía y ya no tiene</span>
                </label>
                <input style={inp} type="number" min="0" value={dtotal.tInvertido}
                  onChange={e => setDTotal(p => ({ ...p, tInvertido: e.target.value }))}
                  placeholder="Monto en pesos" />
                <div style={{ fontSize: "12px", color: "#9a9080", marginTop: "5px", fontStyle: "italic" }}>
                  Ej: capital perdido, activos liquidados, pagos realizados de más. Documentable con estados de cuenta y facturas.
                </div>
              </div>

              <div style={fld}>
                <label style={lbl}>
                  ¿Cuánto dejó de ganar la víctima por el daño?
                  <span style={{ fontWeight: "400", color: "#9a9080" }}> — ingresos o rendimientos que habría obtenido y no obtuvo</span>
                </label>
                <input style={inp} type="number" min="0" value={dtotal.tImpedido}
                  onChange={e => setDTotal(p => ({ ...p, tImpedido: e.target.value }))}
                  placeholder="Monto en pesos (0 si no aplica o no tienes la cifra)" />
                <div style={{ fontSize: "12px", color: "#9a9080", marginTop: "5px", fontStyle: "italic" }}>
                  Ej: rendimientos proyectados según tasas de mercado, ingresos del período de afectación. Requiere proyección documentada.
                </div>
              </div>

              <div style={fld}>
                <label style={lbl}>
                  ¿Hay un daño permanente a la situación futura de la víctima?
                  <span style={{ fontWeight: "400", color: "#9a9080" }}> — pérdida de oportunidades que ya no puede recuperar</span>
                </label>
                <input style={inp} type="number" min="0" value={dtotal.tTrayectoria}
                  onChange={e => setDTotal(p => ({ ...p, tTrayectoria: e.target.value }))}
                  placeholder="Monto estimado en pesos (0 si no aplica o no es admisible en el foro)" />
                <div style={{ fontSize: "12px", color: "#9a9080", marginTop: "5px", fontStyle: "italic" }}>
                  Ej: deterioro del perfil crediticio, exclusión de mercados futuros, pérdida de capacidad de acumulación. No todos los fueros admiten este componente.
                </div>
              </div>

              {(parseFloat(dtotal.tInvertido) > 0 || parseFloat(dtotal.tImpedido) > 0 || parseFloat(dtotal.tTrayectoria) > 0) && (() => {
                const ti = parseFloat(dtotal.tInvertido)    || 0;
                const tp = parseFloat(dtotal.tImpedido)     || 0;
                const tt = parseFloat(dtotal.tTrayectoria)  || 0;
                const fmt = (n) => n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
                return (
                  <div style={{ background: "#e8f0ee", borderRadius: "10px", padding: "16px 18px", marginTop: "8px" }}>
                    <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: G, marginBottom: "12px" }}>Daño total estimado</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                      {[
                        ["Mínimo seguro",      ti,       "Solo lo perdido directamente"],
                        ["Sin daño futuro",    ti + tp,  "Lo perdido + lo que no ganó"],
                        ["Daño total",         ti+tp+tt, "Incluyendo impacto permanente"],
                      ].map(([lbl, val, sub]) => (
                        <div key={lbl} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "11px", color: "#9a9080", marginBottom: "4px" }}>{lbl}</div>
                          <div style={{ fontSize: "15px", fontWeight: "600", color: G }}>{fmt(val)}</div>
                          <div style={{ fontSize: "11px", color: "#9a9080", marginTop: "2px" }}>{sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            <div style={{ background: "#faf9f7", border: "1px solid #e8e3db", borderRadius: "10px", padding: "14px 18px", fontSize: "13px", color: "#5a5248", lineHeight: "1.7" }}>
              Si no tienes los montos ahora, escribe 0 en los campos y continúa. El sistema calculará los porcentajes de responsabilidad. Cuando tengas los montos podrás multiplicar directamente por el porcentaje de cada involucrado.
            </div>
          </div>
        )}

        {/* ── PASO 5: CALCULAR ────────────────────────────────── */}
        {paso === 5 && (
          <div>
            <div style={secH}>Calcular</div>
            {problemas.length > 0 ? (
              <div style={aEr}>
                <strong>Para continuar:</strong>
                <ul style={{ margin: "8px 0 0", paddingLeft: "18px" }}>
                  {problemas.map((p, i) => <li key={i} style={{ marginBottom: "4px" }}>{p}</li>)}
                </ul>
              </div>
            ) : (
              <div style={aOk}>✓ &nbsp;{actores.length} involucrados · {conexiones.filter(c => !c.nula).length} conexiones con peso positivo. Listo para calcular.</div>
            )}

            {problemas.length === 0 && calcStatus !== "listo" && calcStatus !== "error" && (
              <button onClick={calcular} disabled={calcStatus === "calculando"} style={{ ...btn, width: "100%", padding: "15px", fontSize: "15px" }}>
                {calcStatus === "calculando" ? "Calculando..." : "Calcular distribución causal"}
              </button>
            )}

            {calcStatus === "error" && <div style={{ ...aEr, marginTop: "16px" }}>{calcError}</div>}

            {calcStatus === "listo" && calcData && (() => {
              const [dc, dcBg] = colorDecl(calcData.declaracion?.nivel);
              return (
                <div style={{ marginTop: "32px" }}>
                  {/* Declaración */}
                  <div style={{ background: dcBg, border: `2px solid ${dc}`, borderRadius: "14px", padding: "24px 28px", marginBottom: "32px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <div style={{ fontSize: "60px", fontWeight: "700", color: dc, lineHeight: 1, flexShrink: 0 }}>{calcData.declaracion?.nivel}</div>
                    <div>
                      <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: dc, marginBottom: "8px" }}>Nivel de certeza del análisis</div>
                      <div style={{ fontSize: "14px", color: "#2c2820", lineHeight: "1.75" }}>{calcData.declaracion?.descripcion}</div>
                    </div>
                  </div>

                  {/* Tabla */}
                  <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: G, marginBottom: "14px" }}>Distribución causal</div>
                  <div style={{ overflowX: "auto", marginBottom: "32px", borderRadius: "10px", border: "1.5px solid #e8e3db" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ background: G }}>
                          {["Involucrado", "Peso causal", "Peso neto", "Asumido", "Brecha", "Estado"].map(h => (
                            <th key={h} style={{ padding: "11px 14px", textAlign: "left", color: "#D9D9D9", fontSize: "11px", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: "600" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(calcData.rStar || []).filter(r => r.valor > 0.0001).map((r, i) => {
                          const d = (calcData.delta || []).find(x => x.nodo === r.nodo);
                          const a = (calcData.alpha || []).find(x => x.nodo === r.nodo);
                          const signo = d?.resultado?.signo;
                          const signoLabel = { brecha: "Responsabilidad pendiente", equilibrio: "Equilibrado", sobreasuncion: "Asumió más de lo causado" }[signo] || "—";
                          const signoColor = { brecha: "#8a1a1a", equilibrio: G, sobreasuncion: "#856a00" }[signo] || "#9a9080";
                          return (
                            <tr key={i} style={{ background: i % 2 === 0 ? "#faf9f7" : "#fff", borderBottom: "1px solid #e8e3db" }}>
                              <td style={{ padding: "12px 14px", fontWeight: "600", color: G }}>{r.nodo}</td>
                              <td style={{ padding: "12px 14px" }}>{pct(r.valor)}</td>
                              <td style={{ padding: "12px 14px", color: "#5a5248" }}>{pct(r.neta || 0)}</td>
                              <td style={{ padding: "12px 14px", color: "#9a9080" }}>{pct(a?.valor || 0)}</td>
                              <td style={{ padding: "12px 14px" }}>{d?.resultado ? d.resultado.valor.toFixed(3) : "—"}</td>
                              <td style={{ padding: "12px 14px", color: signoColor, fontWeight: "600", fontSize: "12px" }}>{signoLabel}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pendiente por nodo */}
                  {Object.keys(pagados).some(id => parseFloat(pagados[id]) > 0) && calcData.ajusteDebitor && (() => {
                    const fmt = (n) => n ? n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }) : "—";
                    const hayDtotal = calcData.ajusteDebitor && calcData.ajusteDebitor.length > 0;
                    return (
                      <div style={{ marginBottom: "32px" }}>
                        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: G, marginBottom: "14px" }}>Pendiente por involucrado</div>
                        <div style={{ overflowX: "auto", borderRadius: "10px", border: "1.5px solid #e8e3db" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                            <thead>
                              <tr style={{ background: G }}>
                                {["Involucrado", "AD (lo que le corresponde)", "Ya pagó / sufrió", "Pendiente"].map(h => (
                                  <th key={h} style={{ padding: "11px 14px", textAlign: "left", color: "#D9D9D9", fontSize: "11px", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: "600" }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {(calcData.ajusteDebitor || []).map((ad, i) => {
                                const actorId = actores.find(a => a.nombre === ad.nodo)?.id;
                                const pagado = parseFloat(pagados[actorId]) || 0;
                                const adCentral = ad.adCentral || 0;
                                const pendiente = adCentral - pagado;
                                const color = pendiente > 0 ? "#8a1a1a" : pendiente < 0 ? "#856a00" : G;
                                const label = pendiente > 0 ? "Brecha activa" : pendiente < 0 ? "Sobrepagó" : "Equilibrado";
                                return (
                                  <tr key={i} style={{ background: i % 2 === 0 ? "#faf9f7" : "#fff", borderBottom: "1px solid #e8e3db" }}>
                                    <td style={{ padding: "12px 14px", fontWeight: "600", color: G }}>{ad.nodo}</td>
                                    <td style={{ padding: "12px 14px" }}>{fmt(adCentral)}</td>
                                    <td style={{ padding: "12px 14px", color: pagado > 0 ? G : "#9a9080" }}>{pagado > 0 ? fmt(pagado) : "No documentado"}</td>
                                    <td style={{ padding: "12px 14px", fontWeight: "600", color }}>{fmt(Math.abs(pendiente))} <span style={{ fontSize: "11px", fontWeight: "400" }}>({label})</span></td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <div style={{ fontSize: "12px", color: "#9a9080", marginTop: "8px", fontStyle: "italic" }}>
                          AD calculado sobre D_total completo. "Sobrepagó" indica que el monto sufrido supera su proporción causal — posible sobreasunción o chivo expiatorio estructural.
                        </div>
                      </div>
                    );
                  })()}

                  {/* Ajuste debitor */}
                  {calcData.ajusteDebitor && calcData.ajusteDebitor.length > 0 && (() => {
                    const dObj = calcData.dTotal;
                    const fmt = (n) => n ? n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }) : "—";
                    return (
                      <div style={{ marginBottom: "32px" }}>
                        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: G, marginBottom: "14px" }}>Ajuste debitor — AD_i = R*_i × D_total</div>
                        <div style={{ overflowX: "auto", borderRadius: "10px", border: "1.5px solid #e8e3db" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                            <thead>
                              <tr style={{ background: G }}>
                                {["Involucrado", "R*", "AD mínimo", "AD conservador", "AD completo"].map(h => (
                                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#D9D9D9", fontSize: "11px", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: "600" }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {calcData.ajusteDebitor.map((ad, i) => (
                                <tr key={i} style={{ background: i % 2 === 0 ? "#faf9f7" : "#fff", borderBottom: "1px solid #e8e3db" }}>
                                  <td style={{ padding: "11px 14px", fontWeight: "600", color: G }}>{ad.nodo}</td>
                                  <td style={{ padding: "11px 14px" }}>{pct(ad.rStar)}</td>
                                  <td style={{ padding: "11px 14px" }}>{fmt(ad.adMin)}</td>
                                  <td style={{ padding: "11px 14px" }}>{fmt(ad.adConservador)}</td>
                                  <td style={{ padding: "11px 14px", fontWeight: "600", color: G }}>{fmt(ad.adCentral)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {dObj && (
                          <div style={{ fontSize: "12px", color: "#9a9080", marginTop: "8px", fontStyle: "italic" }}>
                            D_total completo: {fmt(dObj.dTotal)} · Conservador (sin trayectoria): {fmt(dObj.dTotalConservador)} · Mínimo (solo daño emergente): {fmt(dObj.dTotalMin)}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Estabilidad */}
                  {calcData.estabilidad && (
                    <div style={{ ...card, background: "#f8faf9", borderColor: "#c8dcd8", marginBottom: "24px" }}>
                      <div style={{ fontSize: "13px", color: G, fontWeight: "600", marginBottom: "8px" }}>Robustez del resultado</div>
                      <div style={{ fontSize: "14px", color: "#2c2820", lineHeight: "1.7" }}>
                        El orden de responsabilidades se mantiene en el <strong>{calcData.estabilidad.pctEstabilidad?.toFixed(1)}%</strong> de las combinaciones evaluadas ({calcData.estabilidad.totalVertices?.toLocaleString()} combinaciones).
                      </div>
                      <div style={{ fontSize: "13px", color: "#5a5248", marginTop: "8px" }}>Orden: {(calcData.estabilidad.rankingBase || []).join(" → ")}</div>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" }}>
                    <button style={bSec} onClick={calcular}>Recalcular</button>
                    <button
                      onClick={descargarExpediente}
                      disabled={expStatus === "generando"}
                      style={{ ...btn, opacity: expStatus === "generando" ? 0.7 : 1 }}
                    >
                      {expStatus === "generando" ? "Generando expediente..." : "↓ Descargar expediente"}
                    </button>
                    <button
                      onClick={descargarNarrativa}
                      disabled={narrUsada || narrStatus === "generando"}
                      title={narrUsada ? "El análisis narrativo ya fue generado para este caso. Inicia un nuevo análisis para generarlo de nuevo." : ""}
                      style={{
                        ...bSec,
                        opacity: narrUsada ? 0.45 : narrStatus === "generando" ? 0.7 : 1,
                        cursor: narrUsada ? "not-allowed" : "pointer",
                        position: "relative",
                      }}
                    >
                      {narrStatus === "generando" ? "Generando narrativa..." : narrUsada ? "Narrativa ya generada" : "↓ Análisis narrativo"}
                    </button>
                    {expStatus === "error" && (
                      <span style={{ fontSize: "13px", color: "#8a1a1a", alignSelf: "center" }}>
                        Error al generar el expediente
                      </span>
                    )}
                    {narrStatus === "error" && (
                      <span style={{ fontSize: "13px", color: "#8a1a1a", alignSelf: "center" }}>
                        Error al generar la narrativa
                      </span>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Navegación */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #e8e3db" }}>
          {paso > 0 ? <button style={bSec} onClick={() => setPaso(p => p - 1)}>← Anterior</button> : <div />}
          {paso < 5 ? <button style={btn}  onClick={() => setPaso(p => p + 1)}>Siguiente →</button>  : <div />}
        </div>
      </div>
    </div>
  );
}