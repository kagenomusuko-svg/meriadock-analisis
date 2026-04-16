// ============================================================
// BLOQUE 2 — Primera mediación φ₁
// Distribución softmax sobre los 6 Hijos de Afrodita
// Referencia: Axiomatización Parte I, Lema 1.1
// ============================================================

import { Vector, productoInterno, norma } from './espacio'

// Los 6 Hijos de Afrodita corresponden a k=1,...,6
// k=1 Fobos    — presión de consecuencias, S alto [0.70-0.95]
// k=2 Deimos   — parálisis estructural,    S alto [0.72-0.95]
// k=3 Anteros  — reciprocidad,             S medio [0.30-0.70]
// k=4 Eros     — apertura,                 S medio [0.30-0.70]
// k=5 Potós    — afirmación idiosincrática, S bajo [0.08-0.30]
// k=6 Harmonía — integración completa,     S variable
export type Hijo = 'fobos' | 'deimos' | 'anteros' | 'eros' | 'potos' | 'harmonia'

export const HIJOS: Hijo[] = [
  'fobos', 'deimos', 'anteros', 'eros', 'potos', 'harmonia'
]

// Parámetros del modo k — se calibran con casos reales
// Por ahora usamos valores iniciales neutros
// Referencia: Lema 1.1 — parámetros {β_k, γ_k, θ_k}
export interface ParametrosModo {
  beta: Vector   // vector de ponderación β_k ∈ E
  gamma: number  // peso escalar de la historia γ_k
  theta: number  // umbral θ_k
}

// Estado interno v_t del sistema en el momento del colapso
// Referencia: Definición 1
export interface EstadoInterno {
  a_t: Vector    // vector de activación a_t ∈ E
  tau: number    // temperatura τ > 0
  norma_I: number // ‖I(t)‖_E — norma de la historia acumulada
}

// Calcular el logit z_k para el modo k
// z_k = (⟨β_k, a_t⟩_E + γ_k · ‖I(t)‖_E − θ_k) / τ
// Referencia: Lema 1.1
function calcularLogit(
  params: ParametrosModo,
  estado: EstadoInterno
): number {
  const productoB = productoInterno(params.beta, estado.a_t)
  const contribucionHistoria = params.gamma * estado.norma_I
  return (productoB + contribucionHistoria - params.theta) / estado.tau
}

// Distribución softmax sobre los 6 modos
// h_k(v_t) = exp(z_k) / Σ_K exp(z_j)
// Garantiza: h_k ≥ 0 y Σ h_k = 1
// Referencia: Lema 1.1
export function softmax(
  parametros: ParametrosModo[],
  estado: EstadoInterno
): number[] {
  if (parametros.length !== 6) {
    throw new Error('Se requieren exactamente 6 conjuntos de parámetros')
  }

  // Calcular logits
  const logits = parametros.map(p => calcularLogit(p, estado))

  // Estabilidad numérica: restar el máximo antes de exp
  const maxLogit = Math.max(...logits)
  const expLogits = logits.map(z => Math.exp(z - maxLogit))
  const suma = expLogits.reduce((acc, val) => acc + val, 0)

  return expLogits.map(e => e / suma)
}

// Hijo dominante k* = argmax h_k(v_t)
// Referencia: Lema 1.1
export function hijoDominante(distribucion: number[]): {
  hijo: Hijo
  indice: number
  probabilidad: number
} {
  let maxIdx = 0
  let maxVal = distribucion[0]
  for (let i = 1; i < distribucion.length; i++) {
    if (distribucion[i] > maxVal) {
      maxVal = distribucion[i]
      maxIdx = i
    }
  }
  return {
    hijo: HIJOS[maxIdx],
    indice: maxIdx,
    probabilidad: maxVal
  }
}

// Rangos de S por Hijo dominante
// Referencia: Axiomatización Lema 3.4 — calibrado sobre 18 casos en 9 dominios
export const RANGOS_S: Record<Hijo, { min: number; max: number; midpoint: number }> = {
  fobos:    { min: 0.70, max: 0.95, midpoint: 0.85 },
  deimos:   { min: 0.72, max: 0.95, midpoint: 0.83 },
  anteros:  { min: 0.30, max: 0.70, midpoint: 0.55 },
  eros:     { min: 0.30, max: 0.70, midpoint: 0.50 },
  potos:    { min: 0.08, max: 0.30, midpoint: 0.23 },
  harmonia: { min: 0.00, max: 1.00, midpoint: 0.50 } // requiere ECO directo
}

// Parámetros iniciales neutros — se refinan con casos reales
// Todos los beta son vectores unitarios de dimensión 6
// tau = 1.0 produce distribución uniforme con logits iguales
export function parametrosIniciales(): ParametrosModo[] {
  return HIJOS.map((_, k) => ({
    beta: [0, 0, 0, 0, 0, 0].map((_, i) => i === k ? 1 : 0),
    gamma: 0.5,
    theta: 0.0
  }))
}