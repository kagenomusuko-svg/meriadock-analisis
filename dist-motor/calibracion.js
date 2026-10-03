'use strict';

// Work06: la falta de calibración limita la fuerza predicativa, pero no
// convierte automáticamente una regla formal en una regla inexistente.
const FUENTES = [
  require('../taxonomia/datos/universal.v1.json'),
  require('../taxonomia/datos/dominios.v1.json'),
  require('../taxonomia/datos/capitulos-03-20.v1.json'),
  require('../taxonomia/datos/capitulos-21-40.v1.json'),
  require('../taxonomia/datos/capitulos-41-60.v1.json'),
  require('../taxonomia/datos/capitulos-61-78.v1.json')
];
const ESTADOS = Object.freeze([
  'FORMALMENTE_DEFINIDO', 'PARAMETRIZABLE', 'PARAMETRIZADO_PROVISIONALMENTE',
  'CALIBRADO', 'VALIDADO_EXTERNAMENTE', 'NO_OPERACIONALIZADO',
  'REQUIERE_DECISION', 'RESERVADO_CONCEPTUAL', 'HISTORICO', 'FUERA'
]);
const CLASIFICACIONES = Object.freeze([
  'ORIENTACION_NO_NUMERICA', 'PARAMETRO_PROVISIONAL_UTILIZABLE',
  'RANGO_PROVISIONAL_UTILIZABLE', 'COEFICIENTE_PROVISIONAL_UTILIZABLE',
  'EJEMPLO_NO_PARAMETRICO', 'NO_OPERACIONALIZADO', 'REQUIERE_DECISION'
]);
const reglasFuente = FUENTES.flatMap(x => Array.isArray(x) ? x.flatMap(p => p.reglas || []) : (x.reglas || []));
const pendientes = reglasFuente.filter(r => r.estado === 'PROPUESTA_PENDIENTE_CALIBRACION');
function clasificarRegla(r) {
  if (r.tipo === 'rango' && Array.isArray(r.valor) && r.valor.length === 2) return 'RANGO_PROVISIONAL_UTILIZABLE';
  if (r.tipo === 'tabla' && r.valor && typeof r.valor === 'object') return 'COEFICIENTE_PROVISIONAL_UTILIZABLE';
  if (['S', 'alpha', 'orientacion'].includes(r.tipo)) return 'ORIENTACION_NO_NUMERICA';
  if (r.tipo === 'calibracion') return 'NO_OPERACIONALIZADO';
  return 'REQUIERE_DECISION';
}
const reglas = Object.freeze(pendientes.map(r => Object.freeze({
  id: r.id,
  clasificacion: clasificarRegla(r),
  tipo: r.tipo,
  valor: r.valor === undefined ? null : r.valor,
  texto: r.texto,
  estadoFuente: r.estado,
  efecto: r.efecto,
  condiciones: r.condiciones || [],
  sourceRef: r.sourceRef
})));
const resumenReglas = Object.freeze(reglas.reduce((m, r) => {
  m[r.clasificacion] = (m[r.clasificacion] || 0) + 1;
  return m;
}, {}));

// Sólo se reclasifica por calibración lo que posee una relación computable y
// no se inventa un objeto/fórmula para las reservas doctrinales.
const OPERADORES = Object.freeze({
  OP13: { estado: 'NO_OPERACIONALIZADO', motivo: 'La fuente no fija función temporal, horizonte y estimando de recurrencia.' },
  OP14: { estado: 'NO_OPERACIONALIZADO', motivo: 'La fuente no fija función de exposición, oportunidades y ventana comparable.' },
  OP24: { estado: 'PARAMETRIZABLE', motivo: 'La opacidad puede recibir una escala explícita, pero no se aplica una escala universal por defecto.' },
  OP25: { estado: 'PARAMETRIZABLE', motivo: 'Los coeficientes sectoriales pueden declararse con fuente y confirmación; no se calibran automáticamente.' },
  OP32: { estado: 'NO_OPERACIONALIZADO', motivo: 'S_B deportivo exige contrafactual de ausencia y protocolo de suplencia aún no fijados.' }
});
const PARAMETROS = Object.freeze({
  estados: ESTADOS,
  clasificaciones: CLASIFICACIONES,
  reglas,
  resumenReglas,
  operadores: OPERADORES,
  version: 'work06-parametrizacion@1'
});
function finito(x) { return typeof x === 'number' && Number.isFinite(x); }
function validarEntrada(p) {
  if (!p || typeof p !== 'object' || typeof p.reglaId !== 'string') throw Error('Parámetro provisional sin reglaId');
  const regla = reglas.find(r => r.id === p.reglaId);
  if (!regla) throw Error('Regla taxonómica no registrada: ' + p.reglaId);
  if (p.confirmado !== true) throw Error('Parámetro provisional requiere confirmación humana: ' + p.reglaId);
  if (!p.sourceRef || typeof p.sourceRef.repositorio !== 'string' || typeof p.sourceRef.sha !== 'string') throw Error('Parámetro provisional sin sourceRef: ' + p.reglaId);
  if (p.valor === undefined && p.rango === undefined) throw Error('Parámetro provisional sin valor ni rango: ' + p.reglaId);
  if (p.valor !== undefined && !finito(p.valor)) throw Error('Valor provisional no finito: ' + p.reglaId);
  if (p.rango !== undefined && (!Array.isArray(p.rango) || p.rango.length !== 2 || !finito(p.rango[0]) || !finito(p.rango[1]) || p.rango[1] < p.rango[0])) throw Error('Rango provisional inválido: ' + p.reglaId);
  return { reglaId: p.reglaId, valor: p.valor ?? null, rango: p.rango ?? null, confirmado: true, sourceRef: p.sourceRef, protocoloVersion: p.protocoloVersion || null, confirmadoPor: p.confirmadoPor || null, confirmadoEn: p.confirmadoEn || null, estado: 'PARAMETRIZADO_PROVISIONALMENTE', estadoFuente: regla.estadoFuente, clasificacion: regla.clasificacion };
}
function validarParametros(lista) {
  if (lista === undefined || lista === null) return [];
  if (!Array.isArray(lista)) throw Error('parametrosProvisionales debe ser una lista');
  return lista.map(validarEntrada);
}
function resumenSensibilidad(p) {
  if (!p.rango) return null;
  return { minimo: p.rango[0], maximo: p.rango[1], centro: (p.rango[0] + p.rango[1]) / 2, supuestoCentro: 'derivado sólo para exploración; no sustituye confirmación del rango' };
}
function prepararParametros(lista) {
  return validarParametros(lista).map(p => ({ ...p, sensibilidad: resumenSensibilidad(p) }));
}
function crearObservacion({ operador, dominio, protocolo, parametros, inputs, resultado, observadoPosterior = null, referencia = null, version = 'observacion-calibracion@1' }) {
  return { schema: version, operador, dominio, protocolo, parametros: validarParametros(parametros || []), inputs: inputs ?? null, resultado: resultado ?? null, observadoPosterior, diferencia: observadoPosterior === null || resultado === null ? null : observadoPosterior - resultado, referencia, creadoEn: new Date().toISOString() };
}
module.exports = { ESTADOS, CLASIFICACIONES, PARAMETROS, reglas, pendientes, resumenReglas, validarParametros, prepararParametros, crearObservacion };

// Work06 acceptance marker: preserves semantics while forcing a fresh production revision.
