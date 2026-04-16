// ============================================================
// BLOQUE 5 — Índice de sustituibilidad S
// Cuánto del comportamiento es estructural vs idiosincrático
// Referencia: Axiomatización Parte III, Definiciones 3.1 y 3.2
// ============================================================

import { Hijo, RANGOS_S } from './phi1'

// S operacional — computable directamente desde las normas
// S_op(t) = ‖c‖_C / (‖c‖_C + ‖a_t‖_E)
// Referencia: Definición 3.1
export function calcularSOperacional(
  normaC: number,   // ‖c‖_C — norma de la configuración heredada
  normaAt: number   // ‖a_t‖_E — norma del estado de activación
): number {
  const denominador = normaC + normaAt
  if (denominador < 1e-10) return 0.5 // caso degenerado
  return normaC / denominador
}

// S desde Hijo dominante — usa tabla calibrada del Lema 3.4
// Cuando no hay grafo disponible, S_op funciona como proxy de S_est
// Referencia: Proposición 3.3 — puente S_op ↔ S_est
export function calcularSDesdeHijo(
  hijo: Hijo,
  nivelEP: number  // 0-8 — nivel de evidencia de la localización
): {
  min: number
  max: number
  midpoint: number
  valor: number    // valor de cálculo según nivel EP
} {
  const rango = RANGOS_S[hijo]

  // A mayor nivel EP, más confianza → usar midpoint
  // A menor nivel EP, más incertidumbre → usar rango completo
  let valor: number
  if (nivelEP >= 4) {
    valor = rango.midpoint
  } else if (nivelEP >= 2) {
    // Ampliar rango en ±0.05
    valor = rango.midpoint
  } else {
    // Incertidumbre alta — rango completo
    valor = rango.midpoint
  }

  return {
    min: nivelEP >= 4 ? rango.midpoint - 0.05 : rango.min,
    max: nivelEP >= 4 ? rango.midpoint + 0.05 : rango.max,
    midpoint: rango.midpoint,
    valor
  }
}

// S estructural — requiere grafo G completo
// S_est(i) = 1 − D_KL(R* ‖ R*(i)) / log(m)
// Referencia: Definición 3.2
export function calcularSEstructural(
  rStar: number[],        // R* — vector de responsabilidad real
  rStarSustituido: number[], // R*(i) — eigenvector con nodo i sustituido
  m: number               // número de nodos activos
): number {
  if (rStar.length !== rStarSustituido.length) {
    throw new Error('R* y R*(i) deben tener la misma dimensión')
  }

  // D_KL(P‖Q) = Σ pₖ · log(pₖ/qₖ)
  let dkl = 0
  for (let k = 0; k < rStar.length; k++) {
    if (rStar[k] > 1e-10 && rStarSustituido[k] > 1e-10) {
      dkl += rStar[k] * Math.log(rStar[k] / rStarSustituido[k])
    }
  }

  const logM = Math.log(m)
  if (logM < 1e-10) return 1.0

  return Math.max(0, Math.min(1, 1 - dkl / logM))
}

// Interpretación de S para el análisis
export function interpretarS(s: number): {
  nivel: string
  descripcion: string
  implicacion: string
} {
  if (s >= 0.70) {
    return {
      nivel: 'alto',
      descripcion: 'Alta sustituibilidad',
      implicacion: 'El acto fue respuesta predecible al campo. ' +
        'Cualquier otro en esa posición habría actuado igual. ' +
        'La responsabilidad reside en el diseño del sistema, no en este actor.'
    }
  } else if (s >= 0.40) {
    return {
      nivel: 'medio',
      descripcion: 'Sustituibilidad media',
      implicacion: 'Contribuciones mixtas del campo y del actor. ' +
        'La responsabilidad se distribuye entre el diseño y la decisión propia.'
    }
  } else {
    return {
      nivel: 'bajo',
      descripcion: 'Baja sustituibilidad',
      implicacion: 'El acto emerge de la idiosincrasia acumulada del actor. ' +
        'Difícilmente otro en la misma posición habría actuado igual. ' +
        'La responsabilidad reside en el actor específico.'
    }
  }
}