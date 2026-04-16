// ============================================================
// BLOQUE 4 — Segunda mediación φ₂
// El retorno del acto sobre el ego — integrar o rechazar
// Referencia: Axiomatización Parte II, Axioma 2, Teorema 2.2
// ============================================================

import { Vector, sumar, escalar, norma, similitudCoseno } from './espacio'
import { Colapso, calcularI } from './integral'

// Resultado de la evaluación de φ₂
export interface ResultadoPhi2 {
  integrado: boolean      // decisión binaria
  valorEval: number       // eval(a, I(t)) — similitud coseno
  razon: string           // por qué se integró o rechazó
  profundidad: number     // p(τ) asignada si se integró
}

// eval(a, I(t)) = ⟨a, I(t)⟩_E / (‖a‖_E · ‖I(t)‖_E)
// Similitud coseno — familia de referencia del Teorema 2.2
// Valores en [-1, 1]
// +1: colapso completamente alineado con la historia acumulada
//  0: colapso neutro respecto a I(t)
// -1: colapso en dirección opuesta a I(t)
function evalCompatibilidad(colapso: Vector, It: Vector): number {
  return similitudCoseno(colapso, It)
}

// φ₂(a, I(t)) = I(t) + δ(a) · 1{eval(a,I(t)) > θ}
// Referencia: Teorema 2.2
// θ = umbral de integración (configurable por dominio)
export function aplicarPhi2(
  colapso: Colapso,
  colapsosAnteriores: Colapso[],
  theta: number = 0.0
): ResultadoPhi2 {
  const It = calcularI(colapsosAnteriores)
  const normaIt = norma(It)

  // Si I(t) es cero (primer colapso o ninguno integrado aún)
  // se integra por defecto — no hay historia contra qué evaluar
  if (normaIt < 1e-10) {
    return {
      integrado: true,
      valorEval: 1.0,
      razon: 'Primer colapso — I(t) vacío, se integra para iniciar la historia',
      profundidad: 0.5
    }
  }

  const valorEval = evalCompatibilidad(colapso.vector, It)

  if (valorEval > theta) {
    // Integrar — el colapso es compatible con la historia acumulada
    // δ(a) debe satisfacer ‖δ(a)‖_E ≤ ‖a‖_E (no-amplificación)
    const profundidad = Math.min(1.0, (valorEval + 1) / 2)

    return {
      integrado: true,
      valorEval,
      razon: `Eval ${valorEval.toFixed(3)} > umbral ${theta} — compatible con I(t)`,
      profundidad
    }
  } else {
    // Rechazar — el colapso va en dirección contraria a I(t)
    return {
      integrado: false,
      valorEval,
      razon: `Eval ${valorEval.toFixed(3)} ≤ umbral ${theta} — incompatible con I(t)`,
      profundidad: 0
    }
  }
}

// Verificar condición de no-amplificación
// ‖δ(a)‖_E ≤ ‖a‖_E
// Referencia: Teorema 2.2, condición (iii)
export function verificarNoAmplificacion(
  delta: Vector,
  colapso: Vector
): boolean {
  return norma(delta) <= norma(colapso) + 1e-10
}

// Actualizar un colapso con la decisión de φ₂
export function actualizarColapsoConPhi2(
  colapso: Colapso,
  resultado: ResultadoPhi2
): Colapso {
  return {
    ...colapso,
    integrado: resultado.integrado,
    profundidad: resultado.profundidad
  }
}