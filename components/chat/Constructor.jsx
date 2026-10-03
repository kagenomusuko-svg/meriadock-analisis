import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { construirSolicitud } from "../constructor/entrada";
import { mensajesAnalisis } from "../../dist-motor/linter";
import { OPERADORES, MODOS } from "../../dist-motor/nomenclatura";
import OrientacionTaxonomica from "../constructor/OrientacionTaxonomica";
import { GENERICO } from "../../taxonomia/protocolos";
const G = "#1E4C45",
  BG = "#faf9f7";
const PASOS = [
  "Finalidad",
  "Fenómeno y pregunta",
  "Nodos",
  "Relaciones y soportes",
  "Discriminaciones",
  "Medidas adicionales",
  "Calcular",
  "Resultados / auditoría",
];
const FAMILIAS = [
  [
    "imputacion_causal",
    "Reconstruir y sostener una atribución causal frente a contradicción o impugnación.",
  ],
  [
    "compliance_causal",
    "Estudiar un sistema para detectar exposición, fallas de diseño, prevención e intervención.",
  ],
  [
    "contabilidad_ontologica",
    "Describir y medir causalmente un fenómeno sin finalidad inmediata adversarial u organizacional.",
  ],
];
const vacio = {
  taxonomiaVersion: "generico@1",
  familia: "",
  dominio: "",
  titulo: "",
  pregunta: "",
  descripcion: "",
  evento: "",
  nodos: [],
  relaciones: [],
  mediciones: [],
  unidadBeneficio: "",
  unidadDanio: "",
  tInvertido: "",
  tImpedido: "",
  tTrayectoria: "",
  regularizar: false,
  epsilon: "",
  k: "",
  metodoExtendido: "",
  maxVertices: "",
  detalleCompleto: false,
};
function pct(v) {
  return v === null || v === undefined
    ? "Indeterminado"
    : (v * 100).toFixed(2) + "%";
}
function CheckRow({ checked, onChange, children }) {
  return (
    <label
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 14px",
        background: checked ? "#f0f6f4" : "transparent",
        borderRadius: 10,
        cursor: "pointer",
        lineHeight: 1.6,
      }}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{children}</span>
    </label>
  );
}
export default function Constructor() {
  const [protocolos,setProtocolos]=useState([GENERICO]);

  const [paso, setPaso] = useState(0),
    [estado, setEstado] = useState(vacio),
    [nuevoNombre, setNuevoNombre] = useState("");
  const [formC, setFC] = useState({
    origen: "",
    destino: "",
    evidenciaNivel: "",
    min: "",
    max: "",
    soportes: "",
    referencia: "",
  });
  const [error, setErrorTexto] = useState(""),
    [calculando, setCalculando] = useState(false),
    [resultado, setResultado] = useState(null),
    [exportando, setExportando] = useState(false);
  const [errorVersion,setErrorVersion]=useState(0);
  function setError(texto){setErrorTexto(texto);if(texto)setErrorVersion(v=>v+1);}
  const seleccionado=protocolos.find(p=>`${p.id}@${p.version}`===estado.taxonomiaVersion);
  const protocolo=seleccionado||{id:'no-resuelto',version:'',componentesS:[],preguntas:[],rangos:[],estrategiasAlpha:[]};
  const headingRef=useRef(null),errorRef=useRef(null);
  useEffect(()=>{let activo=true;fetch('/api/protocolos').then(r=>{if(!r.ok)throw Error('No se pudo cargar catálogo taxonómico');return r.json();}).then(d=>{if(activo)setProtocolos(d.protocolos);}).catch(e=>{if(activo)setError(e.message);});return()=>{activo=false;};},[]);
  useEffect(()=>{headingRef.current?.focus();},[paso]);
  useEffect(()=>{if(error)errorRef.current?.focus();},[error,errorVersion]);
  function cambiarProtocolo(version){const p=protocolos.find(p=>`${p.id}@${p.version}`===version);if(!p)return;editar({taxonomiaVersion:version,dominio:p.dominioLibre?estado.dominio:p.dominios[0],nodos:estado.nodos.map(n=>({...n,componentesS:p.componentesS.map(()=>''),estrategiaAlpha:'',alphaValor:'',alphaMonto:'',alphaBase:'',confirmadoS:false,referenciaS:'',respuestasTaxonomicas:{},orientacionTaxonomica:{}}))});}
  const reglaAlpha=n=>n.estrategiaAlpha?.startsWith('taxonomico:')?protocolo.estrategiasAlpha?.find(a=>a.id===n.estrategiaAlpha.split(':')[1])?.regla:n.estrategiaAlpha;
  function editar(patch) {
    setEstado((e) => ({ ...e, ...patch }));
    setResultado(null);
    setError("");
  }
  function nodo(id, patch) {
    editar({
      nodos: estado.nodos.map((n) => (n.id === id ? { ...n, ...patch } : n)),
    });
  }
  function agregarNodo() {
    if (!nuevoNombre.trim()) {
      setError("Nombre obligatorio.");
      return;
    }
    editar({
      nodos: [
        ...estado.nodos,
        {
          id: crypto.randomUUID(),
          nombre: nuevoNombre.trim(),
          tipo: "indeterminado",
          modo: "indeterminado",
          descripcion: "",
          componentesS: protocolo.componentesS.map(()=>""),
        },
      ],
    });
    setNuevoNombre("");
  }
  function agregarRelacion() {
    if (!formC.origen || !formC.destino) {
      setError("Selecciona origen y destino.");
      return;
    }
    if (formC.evidenciaNivel === "") {
      setError("Selecciona el nivel de evidencia discriminado.");
      return;
    }
    if (
      formC.evidenciaNivel !== "0" &&
      (formC.min === "" ||
        formC.max === "" ||
        !Number.isFinite(Number(formC.min)) ||
        !Number.isFinite(Number(formC.max)) ||
        Number(formC.min) < 0 ||
        Number(formC.max) < Number(formC.min))
    ) {
      setError("Declara un rango no negativo y ordenado.");
      return;
    }
    if(!estado.nodos.some(n=>n.id===formC.origen)||!(formC.destino==='D'||estado.nodos.some(n=>n.id===formC.destino))){setError('Identificadores de origen o destino inválidos.');return;}
    if(estado.relaciones.some(e=>e.origen===formC.origen&&e.destino===formC.destino)){setError('Relación duplicada: conserva múltiples soportes en una sola relación.');return;}
    editar({
      relaciones: [
        ...estado.relaciones,
        {
          ...formC,
          id: crypto.randomUUID(),
          min: formC.evidenciaNivel === "0" ? "0" : formC.min,
          max: formC.evidenciaNivel === "0" ? "0" : formC.max,
        },
      ],
    });
    setFC({
      origen: "",
      destino: "",
      evidenciaNivel: "",
      min: "",
      max: "",
      soportes: "",
      referencia: "",
    });
  }
  const solicitud = construirSolicitud(estado);
  const mensajes = mensajesAnalisis({...solicitud.analisis,nodosActivos:solicitud.analisis.nodosActivos.map(n=>({...n,alpha:solicitud.insumos.insumosAlpha.find(a=>a.id===n.id)||n.alpha}))}, estado.mediciones,protocolo);
  async function calcular() {
    if(!seleccionado){setError("Protocolo solicitado no resuelto; selecciona una versión existente.");return;}
    setCalculando(true);
    setError("");
    try {
      const r = await fetch("/api/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(solicitud),
      });
      const datos = await r.json();
      if (!r.ok) throw Error(datos.error);
      setResultado(datos);
      setPaso(7);
    } catch (e) {
      setError(e.message);
    } finally {
      setCalculando(false);
    }
  }
  async function descargar(endpoint) {
    if (!resultado) return;
    setExportando(true);
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resultado,
          metadatos: { titulo: estado.titulo },
        }),
      });
      if (!r.ok) throw Error("No se pudo generar el documento");
      const html = await r.text(),
        url = URL.createObjectURL(new Blob([html], { type: "text/html" })),
        a = document.createElement("a");
      a.href = url;
      a.download =
        (estado.titulo || "analisis").replace(/[^a-zA-Z0-9]/g, "_") + ".html";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e.message);
    } finally {
      setExportando(false);
    }
  }
  // Estilos base
  const inp = {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid #d4cfc8",
    borderRadius: "10px",
    fontSize: "14px",
    fontFamily: "Georgia, serif",
    outline: "none",
    color: "#2c2820",
    background: "#fff",
    boxSizing: "border-box",
  };
  const ta = {
    ...inp,
    resize: "vertical",
    minHeight: "76px",
    lineHeight: "1.6",
  };
  const sel = { ...inp, cursor: "pointer" };
  const btn = {
    background: G,
    color: "#D9D9D9",
    border: "none",
    padding: "12px 28px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Georgia, serif",
  };
  const bSec = {
    background: "#fff",
    color: "#5a5248",
    border: "1.5px solid #d4cfc8",
    padding: "12px 28px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Georgia, serif",
  };
  const bDel = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#655d52",
    fontSize: "22px",
    lineHeight: 1,
    padding: "2px 6px",
  };
  const card = {
    background: "#fff",
    border: "1.5px solid #d4cfc8",
    borderRadius: "12px",
    padding: "20px 24px",
    marginBottom: "12px",
  };
  const cAdd = { ...card, borderStyle: "dashed" };
  const lbl = {
    fontSize: "13px",
    color: "#5a5248",
    display: "block",
    marginBottom: "7px",
  };
  const fld = { marginBottom: "20px" };
  const row2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" };
  const aOk = {
    background: "#e8f0ee",
    border: "1px solid #1E4C45",
    borderRadius: "10px",
    padding: "13px 18px",
    marginBottom: "20px",
    fontSize: "13px",
    color: G,
    lineHeight: "1.6",
  };
  const aEr = {
    background: "#fdf0f0",
    border: "1px solid #c0392b",
    borderRadius: "10px",
    padding: "13px 18px",
    marginBottom: "16px",
    fontSize: "13px",
    color: "#8a1a1a",
    lineHeight: "1.6",
  };
  const divH = { height: "1px", background: "#e8e3db", margin: "24px 0" };
  const secH = {
    fontSize: "21px",
    color: G,
    fontWeight: "600",
    marginBottom: "6px",
  };
  const secS = {
    fontSize: "14px",
    color: "#655d52",
    marginBottom: "30px",
    lineHeight: "1.7",
  };
  const cSub = {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: G,
    marginBottom: "18px",
  };

  const campo = (texto, valor, accion, { tipo = "text", min, max } = {}) => (
    <label style={fld}>
      <span style={lbl}>{texto}</span>
      <input
        style={inp}
        type={tipo}
        step={tipo === "number" ? "any" : undefined}
        min={min}
        max={max}
        value={valor ?? ""}
        onChange={(e) => accion(e.target.value)}
      />
    </label>
  );
  const texto = (etiqueta, valor, accion) => (
    <label style={fld}>
      <span style={lbl}>{etiqueta}</span>
      <textarea
        style={ta}
        value={valor ?? ""}
        onChange={(e) => accion(e.target.value)}
      />
    </label>
  );
  const numero = (etiqueta, valor, accion, min, max) =>
    campo(etiqueta, valor, accion, { tipo: "number", min, max });
  const nombre = (id) =>
    id === "D"
      ? estado.evento || "Evento determinado"
      : estado.nodos.find((n) => n.id === id)?.nombre || id;
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        fontFamily: "Georgia, serif",
        color: "#2c2820",
      }}
    >
      <style>{`button:focus-visible,a:focus-visible,summary:focus-visible{outline:3px solid #1E4C45;outline-offset:3px} input:focus,textarea:focus,select:focus{border-color:#1E4C45!important;box-shadow:0 0 0 3px rgba(30,76,69,0.09)} label{display:block} pre{white-space:pre-wrap;overflow-wrap:anywhere} th,td{padding:10px;text-align:left;border-bottom:1px solid #e8e3db} button:disabled{opacity:.5;cursor:default}`}</style>
      {/* Header */}
      <div
        style={{
          background: G,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Image
            width={38}
            height={38}
            src="/logo.svg"
            alt="Meriadock"
            style={{
              height: "38px",
              width: "38px",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
          <span
            style={{
              fontSize: "15px",
              color: "#D9D9D9",
              letterSpacing: "0.04em",
              fontWeight: "600",
              fontFamily: "Georgia, serif",
            }}
          >
            Análisis causal
          </span>
        </div>
        <Link
          href="/"
          style={{
            fontSize: "12px",
            color: "#D9D9D9",
            textDecoration: "none",
          }}
        >
          ← Inicio
        </Link>
      </div>

      {/* Tabs */}
      <nav aria-label="Pasos del análisis"
        style={{
          background: "#fff",
          borderBottom: "1px solid #e8e3db",
          display: "flex",
          overflowX: "auto",
          paddingLeft: "12px",
        }}
      >
        {PASOS.map((t, i) => (
          <button
            key={i}
            aria-current={i===paso?"step":undefined}
            onClick={() => setPaso(i)}
            style={{
              padding: "14px 20px",
              background: "none",
              border: "none",
              borderBottom:
                i === paso ? `2px solid ${G}` : "2px solid transparent",
              color: i === paso ? G : i < paso ? "#655d52" : "#655d52",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "Georgia, serif",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: i === paso ? G : i < paso ? "#e8f0ee" : "#f0ede8",
                color: i === paso ? "#fff" : i < paso ? G : "#655d52",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>
            {t}
          </button>
        ))}
      </nav>

      <main
        style={{ maxWidth: 960, margin: "0 auto", padding: "44px 20px 80px" }}
      >
        <h1 ref={headingRef} tabIndex={-1} style={secH}>{PASOS[paso]}</h1>
        {paso === 0 && (
          <section>
            <h2 style={secH}>¿Qué quieres hacer con este análisis?</h2>
            <p style={secS}>
              Elige la finalidad. Todas las mediciones quedan disponibles cuando
              declares sus insumos.
            </p>
            {FAMILIAS.map(([id, t]) => (
              <label
                key={id}
                style={{ ...card, display: "flex", gap: 12, cursor: "pointer" }}
              >
                <input
                  type="radio"
                  name="familia"
                  checked={estado.familia === id}
                  onChange={() => editar({ familia: id })}
                />
                {t}
              </label>
            ))}
            <label style={fld}><span style={lbl}>Protocolo taxonómico versionado</span><select aria-label="Protocolo taxonómico versionado" style={sel} value={estado.taxonomiaVersion} onChange={e=>cambiarProtocolo(e.target.value)}>{protocolos.map(p=><option key={p.id+'@'+p.version} value={p.id+'@'+p.version}>{p.titulo||p.id} ({p.id}@{p.version}) — {p.alcance||'dominio-específico'}</option>)}</select></label>
            <p>Protocolo {protocolo.id}@{protocolo.version}: {protocolo.alcance||'dominio-específico'}. La versión genérica es piloto; no agota la Taxonomía ni calibra automáticamente el dominio declarado.</p>
            {protocolo.sourceRef&&<p>Fuente: {protocolo.sourceRef.repositorio}, revisión {protocolo.sourceRef.sha}, capítulo {protocolo.sourceRef.capitulo}. Estado: {protocolo.sourceRef.estado}.</p>}
            {protocolo.reglasEfectivas&&<details><summary>Orientaciones, límites y estados del protocolo</summary>{protocolo.reglasEfectivas.map(r=><div key={r.id} style={{marginBottom:12}}><strong>{r.id} — {r.estado}</strong><p>{r.texto}</p>{r.valor!==undefined&&<pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(r.valor,null,2)}</pre>}<small>{r.sourceRef.capitulo} {r.sourceRef.seccion} · {r.efecto}</small></div>)}</details>}
            {campo("¿Qué estás analizando? Dominio", estado.dominio, (v) =>
              editar({ dominio: v }),
            )}
          </section>
        )}
        {paso === 1 && (
          <section>
            {campo("Título del análisis", estado.titulo, (v) =>
              editar({ titulo: v }),
            )}
            {texto("Pregunta del análisis", estado.pregunta, (v) =>
              editar({ pregunta: v }),
            )}
            {texto(
              "Describe el fenómeno, evento o estructura que quieres analizar.",
              estado.descripcion,
              (v) => editar({ descripcion: v }),
            )}
            {texto(
              "Evento determinado / punto de cierre (D)",
              estado.evento,
              (v) => editar({ evento: v }),
            )}
            <p style={secS}>
              D se conserva como objeto descriptivo separado. No entra en W ni
              recibe coordenada en R*.
            </p>
          </section>
        )}
        {paso === 2 && (
          <section>
            <p style={secS}>
              Registra personas, instituciones, sistemas u otras unidades
              causalmente relevantes. Una sola unidad puede analizarse.
            </p>
            {estado.nodos.map((n) => (
              <article key={n.id} style={card}>
                {campo("Nombre", n.nombre, (v) => nodo(n.id, { nombre: v }))}
                {texto("Descripción de su papel", n.descripcion, (v) =>
                  nodo(n.id, { descripcion: v }),
                )}
                <label style={fld}>
                  <span style={lbl}>Tipo discriminado</span>
                  <select
                    aria-label="Tipo discriminado"
                    style={sel}
                    value={n.tipo}
                    onChange={(e) => nodo(n.id, { tipo: e.target.value })}
                  >
                    {[
                      ["indeterminado", "Indeterminado"],
                      ["diseno", "Diseño"],
                      ["ejecucion", "Ejecución"],
                      ["omision", "Omisión"],
                      ["instrumental", "Instrumental"],
                    ].map(([id, t]) => (
                      <option key={id} value={id}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                {texto(
                  "Soportes descriptivos (uno por línea, sin subir archivos)",
                  n.soportes,
                  (v) => nodo(n.id, { soportes: v }),
                )}
                <button
                  style={bSec}
                  onClick={() =>
                    editar({
                      nodos: estado.nodos.filter((x) => x.id !== n.id),
                      relaciones: estado.relaciones.filter(
                        (e) => e.origen !== n.id && e.destino !== n.id,
                      ),
                    })
                  }
                >
                  Eliminar nodo
                </button>
              </article>
            ))}
            <div style={cAdd}>
              {campo("Nombre del nuevo nodo", nuevoNombre, setNuevoNombre)}
              <button style={btn} onClick={agregarNodo}>
                Agregar nodo
              </button>
            </div>
          </section>
        )}
        {paso === 3 && (
          <section>
            <p style={secS}>
              Discrimina nivel y rango aplicables. Contar soportes no cambia el
              peso. Las relaciones hacia D se registran como cierre; las demás
              integran W.
            </p>
            {estado.relaciones.map((e) => (
              <article key={e.id} style={card}>
                <strong>
                  {nombre(e.origen)} → {nombre(e.destino)}
                </strong>
                <p>
                  E{e.evidenciaNivel} · [{e.min}, {e.max}] ·{" "}
                  {e.destino === "D" ? "Cierre" : "Mediación interna"}
                </p>
                {campo("Referencia opcional", e.referencia, (v) =>
                  editar({
                    relaciones: estado.relaciones.map((x) =>
                      x.id === e.id ? { ...x, referencia: v } : x,
                    ),
                  }),
                )}
                <button
                  style={bSec}
                  onClick={() =>
                    editar({
                      relaciones: estado.relaciones.filter(
                        (x) => x.id !== e.id,
                      ),
                    })
                  }
                >
                  Eliminar relación
                </button>
              </article>
            ))}
            <div style={cAdd}>
              <div style={row2}>
                {["origen", "destino"].map((k) => (
                  <label key={k} style={fld}>
                    <span style={lbl}>
                      {k === "origen" ? "Origen" : "Destino"}
                    </span>
                    <select
                      aria-label={k === "origen" ? "Origen" : "Destino"}
                      style={sel}
                      value={formC[k]}
                      onChange={(e) =>
                        setFC((c) => ({ ...c, [k]: e.target.value }))
                      }
                    >
                      <option value="">Seleccionar…</option>
                      {estado.nodos.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.nombre}
                        </option>
                      ))}
                      {k === "destino" && (
                        <option value="D">
                          D — {estado.evento || "Evento determinado"}
                        </option>
                      )}
                    </select>
                  </label>
                ))}
              </div>
              <CheckRow
                checked={formC.evidenciaNivel === "0"}
                onChange={() =>
                  setFC((c) => ({
                    ...c,
                    evidenciaNivel: c.evidenciaNivel === "0" ? "" : "0",
                  }))
                }
              >
                La transición causal propuesta no está materialmente acreditada
                en el material considerado.
              </CheckRow>
              {formC.evidenciaNivel !== "0" && (
                <>
                  <label style={fld}>
                    <span style={lbl}>
                      Nivel aplicable discriminado por el analista
                    </span>
                    <select
                      aria-label="Nivel aplicable discriminado por el analista"
                      style={sel}
                      value={formC.evidenciaNivel}
                      onChange={(e) =>
                        setFC((c) => ({ ...c, evidenciaNivel: e.target.value }))
                      }
                    >
                      <option value="">Seleccionar…</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <option key={i} value={i}>
                          E{i}
                        </option>
                      ))}
                    </select>
                  </label>
                  {protocolo.rangos?.filter(r=>r.nivel===Number(formC.evidenciaNivel)).map(r=><div key={r.id}><p>Sugerencia {r.estado}: [{r.min}, {r.max}] — {r.texto}. Fuente {r.sourceRef?.capitulo} {r.sourceRef?.seccion}.</p><button type="button" style={ghost} onClick={()=>setFC(c=>({...c,min:String(r.min),max:String(r.max),reglaTaxonomica:r.id,confirmacionTaxonomica:true}))}>Confirmar intervalo sugerido</button></div>)}
                  <div style={row2}>
                    {numero(
                      "Peso mínimo",
                      formC.min,
                      (v) => setFC((c) => ({ ...c, min: v })),
                      0,
                    )}
                    {numero(
                      "Peso máximo",
                      formC.max,
                      (v) => setFC((c) => ({ ...c, max: v })),
                      0,
                    )}
                  </div>
                </>
              )}
              {texto(
                "Soportes declarados (uno por línea)",
                formC.soportes,
                (v) => setFC((c) => ({ ...c, soportes: v })),
              )}
              {campo("Referencia documental opcional", formC.referencia, (v) =>
                setFC((c) => ({ ...c, referencia: v })),
              )}
              <button style={btn} onClick={agregarRelacion}>
                Agregar relación
              </button>
            </div>
          </section>
        )}
        {paso === 4 && (
          <section>
            <p style={secS}>
              Deja vacíos los datos ausentes. Escribe cero únicamente cuando lo
              hayas discriminado.
            </p>
            {estado.nodos.map((n) => (
              <article key={n.id} style={card}>
                <h2 style={secH}>{n.nombre}</h2>
                <OrientacionTaxonomica protocolo={protocolo} nodo={n} actualizar={patch=>nodo(n.id,patch)}/><h3>{OPERADORES.s}</h3><p>Componentes discriminados conforme a {protocolo.id}@{protocolo.version}; alcance {protocolo.alcance||'dominio-específico'}.</p>
                {protocolo.preguntas.map(q=><div key={q.id}>{q.tipo==='numero'?numero(q.texto,n.respuestasTaxonomicas?.[q.id]??'',v=>nodo(n.id,{respuestasTaxonomicas:{...n.respuestasTaxonomicas,[q.id]:v}}),q.min,q.max):texto(q.texto,n.respuestasTaxonomicas?.[q.id]??'',v=>nodo(n.id,{respuestasTaxonomicas:{...n.respuestasTaxonomicas,[q.id]:v}}))}</div>)}
                {n.tipo === "instrumental" ? (
                  <p>
                    S no aplicable al nodo instrumental en el protocolo piloto.
                  </p>
                ) : (
                  protocolo.componentesS.map((c, i) =>
                    numero(
                      c.texto,
                      n.componentesS?.[i] ?? "",
                      (v) =>
                        nodo(n.id, {
                          componentesS: (n.componentesS || protocolo.componentesS.map(()=>"")).map(
                            (x, j) => (i === j ? v : x),
                          ),
                        }),
                      0,
                      1,
                    ),
                  )
                )}
                {protocolo.requiereConfirmacionS&&n.tipo!=='instrumental'&&<><CheckRow checked={n.confirmadoS===true} onChange={()=>nodo(n.id,{confirmadoS:n.confirmadoS!==true})}>Confirmo el S efectivo de {n.nombre} tras revisar las orientaciones</CheckRow>{campo('Justificación de S efectivo — '+n.nombre,n.referenciaS,v=>nodo(n.id,{referenciaS:v}))}</>}
                <h3>{OPERADORES.alpha}</h3>
                <label style={fld}>
                  <span style={lbl}>Estrategia de α (asunción efectiva)</span>
                  <select
                    aria-label="Estrategia de α (asunción efectiva)"
                    style={sel}
                    value={n.estrategiaAlpha || ""}
                    onChange={(e) =>
                      nodo(n.id, { estrategiaAlpha: e.target.value })
                    }
                  >
                    <option value="">No discriminada</option>
                    <option value="discriminado">Valor discriminado</option>
                    <option value="proporcion_monetaria">
                      Proporción monetaria comparable
                    </option>
                    {(protocolo.estrategiasAlpha||[]).map(a=><option key={a.id} value={'taxonomico:'+a.id}>{a.texto}</option>)}
                  </select>
                </label>
                {reglaAlpha(n) === "discriminado" &&
                  numero(
                    "α entre 0 y 1",
                    n.alphaValor,
                    (v) => nodo(n.id, { alphaValor: v }),
                    0,
                    1,
                  )}
                {reglaAlpha(n) === "proporcion_monetaria" && (
                  <>
                    {numero(
                      "Monto efectivamente asumido",
                      n.alphaMonto,
                      (v) => nodo(n.id, { alphaMonto: v }),
                      0,
                    )}
                    {numero(
                      "Base comparativa positiva",
                      n.alphaBase,
                      (v) => nodo(n.id, { alphaBase: v }),
                      0,
                    )}
                    {campo("Unidad comparable", n.alphaUnidad, (v) =>
                      nodo(n.id, { alphaUnidad: v }),
                    )}
                  </>
                )}
                {texto(
                  "Acciones posteriores / soportes de α (sin conteo automático)",
                  n.soportesAlpha,
                  (v) => nodo(n.id, { soportesAlpha: v }),
                )}
                {campo("Referencia opcional de α", n.referenciaAlpha, (v) =>
                  nodo(n.id, { referenciaAlpha: v }),
                )}
                <details>
                  <summary>{OPERADORES.iic} — opcional</summary><p>IIC de congruencia: coincidencias / elementos declarados. No es correlación estadística ni otro IIC histórico.</p>
                  {texto(
                    "Declaraciones / compromisos (uno por línea)",
                    n.declarado,
                    (v) => nodo(n.id, { declarado: v }),
                  )}
                  {texto("Observaciones (una por línea)", n.observado, (v) =>
                    nodo(n.id, { observado: v }),
                  )}
                  {numero(
                    "Coincidencias identificadas",
                    n.coincidencias,
                    (v) => nodo(n.id, { coincidencias: v }),
                    0,
                  )}
                </details>
                <details>
                  <summary>
                    Observaciones modales y de intervención — opcionales
                  </summary>
                  {texto(
                    "Observación modal (sin localización automática)",
                    n.observacionModo,
                    (v) => nodo(n.id, { observacionModo: v }),
                  )}
                  {texto("Marco de actuación", n.marco, (v) =>
                    nodo(n.id, { marco: v }),
                  )}
                  {texto(
                    "Intervención / prevención declarada",
                    n.intervencion,
                    (v) => nodo(n.id, { intervencion: v }),
                  )}
                  <p>
                    Modo: {MODOS[n.modo] || MODOS.indeterminado}. Estas
                    observaciones no producen S ni α.
                  </p>
                </details>
              </article>
            ))}
          </section>
        )}
        {paso === 5 && (
          <section>
            <details style={card}><summary>Índice de inversión — roles explícitos</summary><p>Brecha del diseñador por unidad de exceso del ejecutor. Se conservan los signos de Δ; denominador cero queda indeterminado. Los nombres de los nodos no asignan roles.</p>
              {['disenadorId','ejecutorId'].map((rol,i)=><label key={rol} style={fld}><span style={lbl}>{i===0?'Nodo diseñador':'Nodo ejecutor'}</span><select aria-label={i===0?'Nodo diseñador':'Nodo ejecutor'} style={sel} value={estado[rol]||''} onChange={e=>editar({[rol]:e.target.value})}><option value="">Sin discriminar</option>{estado.nodos.map(n=><option key={n.id} value={n.id}>{n.nombre}</option>)}</select></label>)}
              {numero('Δ del diseñador (signo original)',estado.deltaDisenador,v=>editar({deltaDisenador:v}))}
              {numero('Δ del ejecutor (signo original)',estado.deltaEjecutor,v=>editar({deltaEjecutor:v}))}
            </details>
            <details style={card}><summary>Juego cooperativo — Shapley exacto</summary><p>Declara v(S) para cada coalición y v(vacío)=0. No se estima ninguna coalición ausente ni se elige Shapley por la familia. El formulario genera hasta 1024 filas por presupuesto de presentación; el motor admite un presupuesto técnico explícito distinto.</p>
              {campo('Unidad del juego cooperativo',estado.unidadShapley,v=>editar({unidadShapley:v}))}
              <button style={btn} disabled={!estado.nodos.length||2**estado.nodos.length>1024} onClick={()=>editar({coaliciones:Array.from({length:2**estado.nodos.length},(_,mask)=>({miembros:estado.nodos.filter((n,i)=>mask&(2**i)).map(n=>n.id),valor:''}))})}>Preparar coaliciones del universo activo</button>
              {(estado.coaliciones||[]).map(c=><div key={JSON.stringify(c.miembros)}>{numero('v('+ (c.miembros.map(id=>estado.nodos.find(n=>n.id===id)?.nombre||id).join(' + ')||'vacío') +')',c.valor,v=>editar({coaliciones:estado.coaliciones.map(x=>JSON.stringify(x.miembros)===JSON.stringify(c.miembros)?{...x,valor:v}:x)}))}</div>)}
            </details>
            <details style={card}><summary>ROI neto de prevención — probabilidad externa</summary><p>(D_total × ΔP − costo) / costo. ΔP debe discriminarse con su propia base; no se deduce de R* ni de S. D_total y costo usan la misma unidad; este ROI neto se distingue del retorno bruto.</p>{campo('Unidad común de daño y costo ROI',estado.unidadROI,v=>editar({unidadROI:v}))}{numero('Daño total para ROI',estado.danioROI,v=>editar({danioROI:v}),0)}{numero('Costo de intervención',estado.costoROI,v=>editar({costoROI:v}),0)}{numero('ΔP externo discriminado',estado.deltaPROI,v=>editar({deltaPROI:v}),-1,1)}{texto('Base de la diferencia de probabilidad',estado.baseDeltaPROI,v=>editar({baseDeltaPROI:v}))}</details>
            <details style={card}><summary>Conversión vital — referencia explícita</summary><p>Conversión del monto discriminado a horas según salario social declarado; no aplica un salario universal.</p>
              {campo('Moneda común del monto y salario',estado.monedaVital,v=>editar({monedaVital:v}))}
              {numero('Monto para conversión vital',estado.montoVital,v=>editar({montoVital:v}),0)}
              {numero('Salario social de referencia por hora',estado.salarioReferencia,v=>editar({salarioReferencia:v}),0)}
            </details>
            <details style={card}><summary>Comparar análisis — impacto V y aprendizaje IAS</summary><p>Discrimina el mismo objeto y universo de nodos en ambos análisis. V compara los vectores R* por distancia L1; IAS compara J después menos J antes. No predice recurrencia ni infiere eficacia preventiva.</p>
              {campo('Referencia del análisis anterior',estado.referenciaAntes,v=>editar({referenciaAntes:v}))}
              {campo('Referencia del análisis posterior',estado.referenciaDespues,v=>editar({referenciaDespues:v}))}
              {texto('Base de comparabilidad discriminada',estado.baseComparabilidad,v=>editar({baseComparabilidad:v}))}
              {estado.nodos.map(n=><fieldset key={n.id}><legend>{n.nombre}</legend>{[['rAntes','R* anterior'],['rDespues','R* posterior'],['alphaAntes','α anterior'],['alphaDespues','α posterior']].map(([k,t])=><div key={k}>{numero(n.nombre+': '+t,n[k],v=>nodo(n.id,{[k]:v}),0,1)}</div>)}</fieldset>)}
            </details>
            <details style={card}><summary>Brecha de beneficio — magnitudes absolutas</summary><p>B_i recibido menos β_i efectivamente revertido. No se deriva de α ni de cuotas B*, y no califica jurídicamente el beneficio.</p>
              {campo('Unidad común de beneficio y reversión',estado.unidadReversion,v=>editar({unidadReversion:v}))}
              {estado.nodos.map(n=><div key={n.id}>{numero(n.nombre+': beneficio causalmente recibido',n.beneficioRecibido,v=>nodo(n.id,{beneficioRecibido:v}),0)}{numero(n.nombre+': beneficio efectivamente revertido',n.beneficioRevertido,v=>nodo(n.id,{beneficioRevertido:v}),0)}</div>)}
            </details>
            <details style={card}><summary>Fraude annona — diseño e IIC explícitos</summary><p>R* × (1−α) × (1−IIC) del diseñador seleccionado. No determina por sí mismo una calificación jurídica ni aplica un umbral universal.</p>
<label style={fld}><span style={lbl}>Diseñador para Fraude annona</span><select aria-label="Diseñador para Fraude annona" style={sel} value={estado.fraudeDisenadorId||''} onChange={e=>editar({fraudeDisenadorId:e.target.value})}><option value="">Seleccionar rol e ID explícitamente</option>{estado.nodos.map(n=><option key={n.id} value={n.id}>{n.nombre}</option>)}</select></label>
<label style={fld}><span style={lbl}>Variante IIC para Fraude annona</span><select aria-label="Variante IIC para Fraude annona" style={sel} value={estado.fraudeVarianteIIC||''} onChange={e=>editar({fraudeVarianteIIC:e.target.value})}><option value="">Seleccionar variante</option><option value="congruencia@1">congruencia@1 — coincidencias / total declarado</option></select></label>
</details>
            <div style={card}>
              <h2 style={secH}>{OPERADORES.bStar}</h2>
              {campo(
                "Unidad de los beneficios netos",
                estado.unidadBeneficio,
                (v) => editar({ unidadBeneficio: v }),
              )}
              {estado.nodos.map((n) => (
                <div key={n.id}>
                  {numero(
                    `${n.nombre}: beneficio neto (0 si expresamente no hay beneficio)`,
                    n.beneficio,
                    (v) => nodo(n.id, { beneficio: v }),
                  )}
                </div>
              ))}
            </div>
            <div style={card}>
              <h2 style={secH}>{OPERADORES.dTotal}</h2>
              {campo("Unidad común del daño", estado.unidadDanio, (v) =>
                editar({ unidadDanio: v }),
              )}
              {[
                ["tInvertido", "T_invertido"],
                ["tImpedido", "T_impedido"],
                ["tTrayectoria", "ΔT_trayectoria"],
              ].map(([id, t]) => (
                <div key={id}>
                  {numero(t, estado[id], (v) => editar({ [id]: v }), 0)}
                </div>
              ))}
              <p>
                D_total = T_invertido + T_impedido + ΔT_trayectoria. Si falta un
                monto, el total queda indeterminado.
              </p>
            </div>
            <details style={card}>
              <summary>
                Regularización explícita y sensibilidad extendida
              </summary>
              <CheckRow
                checked={estado.regularizar}
                onChange={() => editar({ regularizar: !estado.regularizar })}
              >
                Aplicar W_ε = W_E + εK, como intervención matemática sin valor
                evidencial.
              </CheckRow>
              {estado.regularizar && (
                <>
                  {numero(
                    "ε positivo declarado",
                    estado.epsilon,
                    (v) => editar({ epsilon: v }),
                    0,
                  )}
                  {numero(
                    "K_ij = constante positiva declarada",
                    estado.k,
                    (v) => editar({ k: v }),
                    0,
                  )}
                  <p>
                    K se aplica implícitamente; W_E permanece separado. Puedes
                    variar ε y recalcular para explorar ε → 0⁺.
                  </p>
                </>
              )}
              <label style={fld}>
                <span style={lbl}>Método de sensibilidad extendida</span>
                <select
                  aria-label="Método de sensibilidad extendida"
                  style={sel}
                  value={estado.metodoExtendido}
                  onChange={(e) => editar({ metodoExtendido: e.target.value })}
                >
                  <option value="">No seleccionado</option>
                  <option value="una_arista_a_la_vez">
                    Una arista a la vez (sensibilidad marginal)
                  </option>
                  <option value="hipercubo_exhaustivo">
                    Hipercubo exhaustivo
                  </option>
                </select>
              </label>
              {estado.metodoExtendido === "hipercubo_exhaustivo" &&
                numero(
                  "Presupuesto máximo de vértices",
                  estado.maxVertices,
                  (v) => editar({ maxVertices: v }),
                  1,
                )}
              <CheckRow
                checked={estado.detalleCompleto}
                onChange={() =>
                  editar({ detalleCompleto: !estado.detalleCompleto })
                }
              >
                Conservar todas las rondas para exportación técnica (mayor
                consumo de memoria).
              </CheckRow>
            </details>
          </section>
        )}
        {paso === 6 && (
          <section>
            <p style={secS}>
              Selecciona las mediciones solicitadas. Los errores de un operador
              se registran sin impedir resultados independientes.
            </p>
            <div style={card}>
              {Object.entries(OPERADORES).map(([id, t]) => (
                <CheckRow
                  key={id}
                  checked={estado.mediciones.includes(id)}
                  onChange={() =>
                    editar({
                      mediciones: estado.mediciones.includes(id)
                        ? estado.mediciones.filter((x) => x !== id)
                        : [...estado.mediciones, id],
                    })
                  }
                >
                  {t}
                </CheckRow>
              ))}
            </div>
            <button
              style={btn}
              disabled={
                calculando || !estado.mediciones.length || !estado.nodos.length
              }
              onClick={calcular}
            >
              {calculando ? "Calculando…" : "Calcular mediciones seleccionadas"}
            </button>
          </section>
        )}
        {paso === 7 && (
          <section>
            {!resultado ? (
              <p>Calcula las mediciones para mostrar resultados.</p>
            ) : (
              <>
                <p style={secS}>
                  Según los insumos declarados por el analista. Versión{" "}
                  {resultado.versionMotor}.
                </p>
                {resultado.escenarios.central && <div style={card}><strong>Garantías PF — {resultado.escenarios.central.estado}</strong><p>Convergencia: {String(resultado.escenarios.central.convergio)} · Residuo: {String(resultado.escenarios.central.residuo)} · Tolerancia: {resultado.escenarios.central.tolerancia} · Primitividad: {String(resultado.escenarios.central.diagnostico.primitiva)} · Regularización: {String(resultado.escenarios.central.regularizacionAplicada)} · Estimación de rho: {String(resultado.escenarios.central.estimacionRho)}</p></div>}
                {resultado.resultados.bStar.estado!=='no_solicitado'&&<div style={card}><h2>{OPERADORES.bStar}</h2><p>Estado: {resultado.resultados.bStar.estado.replaceAll('_',' ')} · Total: {resultado.resultados.bStar.total??'indeterminado'} · Unidad: {resultado.resultados.bStar.unidad||'ausente'}</p>{resultado.resultados.bStar.motivo&&<p>{resultado.resultados.bStar.motivo}</p>}<ul>{(resultado.resultados.bStar.valor||[]).map(b=><li key={b.id}>{b.nodo||b.id}: cuota {b.valor} · Beneficio neto declarado {b.beneficioNeto} {resultado.resultados.bStar.unidad}</li>)}</ul></div>}
                {resultado.resultados.indiceInversion.estado!=='no_solicitado'&&<div style={card}><h2>Índice de inversión</h2><p>Brecha del diseñador por unidad de exceso del ejecutor.</p><p>Estado: {resultado.resultados.indiceInversion.estado.replaceAll('_',' ')} · Cociente: {resultado.resultados.indiceInversion.valor??'indeterminado'}</p><p>{resultado.resultados.indiceInversion.interpretacion||resultado.resultados.indiceInversion.motivo}</p><p>Diseñador: {resultado.modelo.nodosActivos.find(n=>n.id===resultado.resultados.indiceInversion.auditoria?.disenadorId)?.nombre||'sin discriminar'} · Δ original: {resultado.resultados.indiceInversion.auditoria?.deltaDisenador??'ausente'} · Ejecutor: {resultado.modelo.nodosActivos.find(n=>n.id===resultado.resultados.indiceInversion.auditoria?.ejecutorId)?.nombre||'sin discriminar'} · Δ original: {resultado.resultados.indiceInversion.auditoria?.deltaEjecutor??'ausente'}</p></div>}
                {resultado.declaracion && (
                  <div style={aOk}>
                    <strong>Declaración {resultado.declaracion.nivel}</strong> —{" "}
                    {resultado.declaracion.descripcion}
                  </div>
                )}
                <div style={{ overflowX: "auto", ...card }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {[
                          "Nodo",
                          OPERADORES.rStar,
                          OPERADORES.s,
                          OPERADORES.rStarNeta,
                          OPERADORES.alpha,
                          OPERADORES.delta,
                        ].map((t) => (
                          <th key={t}>{t}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.rStar.map((r) => (
                        <tr key={r.id}>
                          <td>{r.nodo}</td>
                          <td>{r.valor==null?resultado.resultados.rStar.estado.replaceAll('_',' '):pct(r.valor)}</td>
                          <td>{r.s==null?resultado.resultados.s.estado.replaceAll('_',' '):pct(r.s)}</td>
                          <td>{r.neta==null?resultado.resultados.rStarNeta.estado.replaceAll('_',' '):pct(r.neta)}</td>
                          <td>
                            {resultado.alpha.find(a=>a.id===r.id)?.valor==null?resultado.resultados.alpha.estado.replaceAll('_',' '):pct(resultado.alpha.find(a=>a.id===r.id).valor)}
                          </td>
                          <td>
                            {resultado.delta
                              .find((d) => d.id === r.id)
                              ?.resultado?.valor?.toFixed(6) ?? resultado.resultados.delta.estado.replaceAll("_"," ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {Object.entries(resultado.resultados).map(([id, r]) => (
                  <details key={id} style={card}>
                    <summary>
                      {OPERADORES[id] || id} — {r.estado.replaceAll('_',' ')}
                    </summary>
                    {r.motivo && <p>{r.motivo}</p>}
                    <pre>{JSON.stringify(r, null, 2)}</pre>
                  </details>
                ))}
                <details style={card}>
                  <summary>
                    Auditoría técnica: matrices, escenarios, rondas, residuo y
                    regularización
                  </summary>
                  <pre>{JSON.stringify(resultado.auditoria, null, 2)}</pre>
                </details>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button
                    style={btn}
                    disabled={exportando}
                    onClick={() => descargar("/api/expediente")}
                  >
                    Descargar expediente
                  </button>
                  <button
                    style={bSec}
                    disabled={exportando}
                    onClick={() => descargar("/api/narrativa")}
                  >
                    Resumen determinista
                  </button>
                  <button
                    style={bSec}
                    onClick={() => {
                      const url = URL.createObjectURL(
                        new Blob([JSON.stringify(resultado, null, 2)], {
                          type: "application/json",
                        }),
                      );
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "auditoria.json";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    Exportar auditoría JSON
                  </button>
                </div>
              </>
            )}
          </section>
        )}
        {error && (
          <div key={errorVersion} ref={errorRef} tabIndex={-1} role="alert" style={{ ...aEr, marginTop: 20 }}>
            {error}
          </div>
        )}
        <p role="status" aria-live="polite">{calculando?"Calculando mediciones":resultado?"Resultados disponibles":`Paso ${paso+1}: ${PASOS[paso]}`}</p>
        <aside
          style={{ ...card, marginTop: 24 }}
          aria-label="Estado del análisis"
        >
          <h2 style={cSub}>Estado del análisis</h2>
          {mensajes.length ? (
            mensajes.map((m, i) => (
              <p
                key={m.codigo + (m.nodo || m.relacion || i)}
                style={{
                  color:
                    m.nivel === "ERROR"
                      ? "#8a1a1a"
                      : m.nivel === "WARN"
                        ? "#856a00"
                        : G,
                }}
              >
                <strong>{m.nivel}</strong> · {m.texto}{" "}
                {m.nodo && `(${nombre(m.nodo)})`}
              </p>
            ))
          ) : (
            <p>
              Sin deudas estructurales detectadas por las reglas disponibles.
            </p>
          )}
        </aside>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          {paso > 0 ? (
            <button style={bSec} onClick={() => setPaso((p) => p - 1)}>
              ← Anterior
            </button>
          ) : (
            <span />
          )}
          {paso < 7 && (
            <button style={btn} onClick={() => setPaso((p) => p + 1)}>
              Siguiente →
            </button>
          )}
        </nav>
      </main>
    </div>
  );
}
