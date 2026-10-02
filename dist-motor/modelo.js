'use strict';
const VERSION = 'metrologia-causal/1';
function crearAnalisis(input = {}) {
  const fuente = input.estructura || input.grafo || input;
  const nodos = fuente.nodosActivos || fuente.nodos || [];
  const finales = nodos.filter(n => n.tipo === 'final' || n.id === 'nodo_final');
  if (finales.length > 1) throw new Error('Sólo se admite un evento determinado separado');
  const eventoDeterminado = fuente.eventoDeterminado || finales[0] || null;
  const nodosActivos = nodos.filter(n => !finales.includes(n));
  const ids = new Set(nodosActivos.map(n => n.id));
  if (ids.size !== nodosActivos.length || nodosActivos.some(n => !n.id)) throw new Error('Identificadores de nodo únicos y no vacíos requeridos');
  if (eventoDeterminado && ids.has(eventoDeterminado.id)) throw new Error('D no puede ser un nodo activo');
  const todas = fuente.relacionesInternas || fuente.relaciones || fuente.aristas || [];
  const relacionesInternas = [], conexionesCierre = [...(fuente.conexionesCierre || [])];
  for (const [i, raw] of todas.entries()) {
    const e = { ...raw, id: raw.id || `relacion_${i}`, evidenciaNivel: raw.evidenciaNivel ?? raw.nivelEvidencia };
    if (!ids.has(e.origen)) throw new Error(`Origen desconocido: ${e.origen}`);
    if (eventoDeterminado && e.destino === eventoDeterminado.id) conexionesCierre.push(e);
    else if (ids.has(e.destino)) relacionesInternas.push(e);
    else throw new Error(`Destino desconocido: ${e.destino}`);
  }
  for (const e of conexionesCierre) {
    if (!ids.has(e.origen) || !eventoDeterminado || e.destino !== eventoDeterminado.id) throw new Error('Conexión de cierre inválida');
  }
  return { ...fuente, version: VERSION, taxonomiaVersion: fuente.taxonomiaVersion ?? null,
    nodosActivos, eventoDeterminado, relacionesInternas, conexionesCierre,
    nodos: nodosActivos, aristas: relacionesInternas };
}
function rangoRelacion(e) {
  if (e.evidenciaNivel === 0 || e.nivelEvidencia === 0) return { min: 0, max: 0 };
  const min = e.rango?.min ?? e.pesoMin;
  const max = e.rango?.max ?? e.pesoMax;
  if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < min) throw new Error(`Rango ausente o inválido: ${e.id || ''}`);
  return { min, max };
}
module.exports = { VERSION, crearAnalisis, rangoRelacion };
