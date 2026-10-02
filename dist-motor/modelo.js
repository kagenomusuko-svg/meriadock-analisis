'use strict';
const VERSION = 'metrologia-causal/2';
const idValido=x=>typeof x==='string'&&x.trim().length>0;
function validarRelacion(e){
 if(!idValido(e.id))throw new Error('Identificador de relación inválido');
 const nivel=e.evidenciaNivel;
 if(nivel!==null&&nivel!==undefined&&(!Number.isInteger(nivel)||nivel<0||nivel>8))throw new Error('Nivel de evidencia entero entre E0 y E8 requerido');
 const min=e.rango?.min??e.pesoMin,max=e.rango?.max??e.pesoMax;
 if(min!==null&&min!==undefined||max!==null&&max!==undefined)if(!Number.isFinite(min)||!Number.isFinite(max)||min<0||max<min)throw new Error('Rango ausente o inválido: '+e.id);
}
function estadoClausura(e){
 if(e.evidenciaNivel===0)return 'no_acreditado';
 const min=e.rango?.min??e.pesoMin,max=e.rango?.max??e.pesoMax;
 return Number.isInteger(e.evidenciaNivel)&&e.evidenciaNivel>0&&Number.isFinite(min)&&Number.isFinite(max)&&max>0?'declarado_valido':'declarado';
}
function crearAnalisis(input = {}) {
  const fuente = input.estructura || input.grafo || input;
  const nodos = fuente.nodosActivos || fuente.nodos || [];
  const finales = nodos.filter(n => n.tipo === 'final' || n.id === 'nodo_final');
  if (finales.length > 1) throw new Error('Sólo se admite un evento determinado separado');
  const eventoDeterminado = fuente.eventoDeterminado || finales[0] || null;
  const nodosActivos = nodos.filter(n => !finales.includes(n));
  const ids = new Set(nodosActivos.map(n => n.id));
  if (ids.size !== nodosActivos.length || nodosActivos.some(n => !idValido(n.id))) throw new Error('Identificadores de nodo únicos y no vacíos requeridos');
  if (eventoDeterminado && ids.has(eventoDeterminado.id)) throw new Error('D no puede ser un nodo activo');
  const todas = fuente.relacionesInternas || fuente.relaciones || fuente.aristas || [];
  if(eventoDeterminado&&!idValido(eventoDeterminado.id))throw new Error('Identificador de D inválido');
  const parejas = new Set(), idsRelacion=new Set();
  const relacionesInternas = [], conexionesCierre = [];
  for (const [i, raw] of [...todas,...(fuente.conexionesCierre||[])].entries()) {
    const e = { ...raw, id: raw.id ?? `relacion_${i}`, evidenciaNivel: raw.evidenciaNivel ?? raw.nivelEvidencia };
    validarRelacion(e);
    if(idsRelacion.has(e.id))throw new Error('Identificador de relación repetido: '+e.id);idsRelacion.add(e.id);
    const pareja = JSON.stringify([e.origen,e.destino]);
    if(parejas.has(pareja)) throw new Error('Relación duplicada: conserva múltiples soportes en una sola relación sin sumar pesos automáticamente');
    parejas.add(pareja);
    if (!ids.has(e.origen)) throw new Error(`Origen desconocido: ${e.origen}`);
    if (eventoDeterminado && e.destino === eventoDeterminado.id) conexionesCierre.push({...e,estadoClausura:estadoClausura(e)});
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
module.exports = { VERSION, crearAnalisis, rangoRelacion, estadoClausura, validarRelacion };
