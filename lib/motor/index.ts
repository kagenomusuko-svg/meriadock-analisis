// ============================================================
// MOTOR MERIADOCK — Punto de entrada unificado
// Sistema de la Doble Mediación — Motor de cálculo causal
// Centro Multidisciplinario Meriadock Formación y Asesoría A.C.
// ============================================================

// Bloque 1 — Espacio vectorial
export {
  productoInterno,
  norma,
  similitudCoseno,
  sumar,
  escalar,
  vectorCero
} from './espacio'
export type { Vector } from './espacio'

// Bloque 2 — Primera mediación φ₁
export {
  softmax,
  hijoDominante,
  parametrosIniciales,
  HIJOS,
  RANGOS_S
} from './phi1'
export type { Hijo, ParametrosModo, EstadoInterno } from './phi1'

// Bloque 3 — Integral acumulativa I(t)
export {
  calcularI,
  normaI,
  RSC,
  colapsoRechazados,
  crearColapso,
  esIrreversible
} from './integral'
export type { Colapso } from './integral'

// Bloque 4 — Segunda mediación φ₂
export {
  aplicarPhi2,
  actualizarColapsoConPhi2,
  verificarNoAmplificacion
} from './phi2'
export type { ResultadoPhi2 } from './phi2'

// Bloque 5 — Sustituibilidad S
export {
  calcularSOperacional,
  calcularSDesdeHijo,
  calcularSEstructural,
  interpretarS
} from './sustituibilidad'

// Bloque 6 — Grafo causal
export {
  construirMatrizW,
  pertrubarMatriz,
  tieneNodoFinal,
  indiceNodoFinal,
  midpoint
} from './grafo'
export type {
  Nodo,
  Arista,
  GrafoCausal,
  TipoNodo,
  NivelEvidencia
} from './grafo'

// Bloque 7 — Vector R*
export {
  calcularRStar,
  calcularRStarDesdeGrafo,
  interpretarRStar
} from './r_estrella'
export type { ResultadoRStar } from './r_estrella'

// Bloque 8 — Coeficiente α
export {
  calcularAlpha,
  calcularAlphaAgregado,
  calcularF,
  calcularG,
  tipoIntegracion,
  N_REF_POR_NIVEL,
  NOTA_INDEPENDENCIA_DOLO
} from './alpha'
export type { InsumosAlpha } from './alpha'

// Bloque 9 — Déficit Δ
export {
  calcularDelta,
  calcularDeltaVector,
  calcularEvolucionDelta,
  detectarInversionCausal
} from './delta'
export type { ResultadoDelta } from './delta'

// Bloque 10 — Derivados
export {
  calcularRStarNeta,
  calcularRStarNetaVector,
  calcularIIC,
  calcularFraudeAnnona,
  interpretarFraudeAnnona,
  determinarDeclaracion,
  generarResumen
} from './derivados'
export type {
  NivelDeclaracion,
  Declaracion,
  ResumenAnalisis,
  InsumosIIC
} from './derivados'