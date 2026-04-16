// ============================================================
// BLOQUE 3 — Integral acumulativa I(t)
// La mismidad del sistema — historia de colapsos asumidos
// Referencia: Axiomatización Parte II, Definición 2
// ============================================================

import { Vector, sumar, escalar, norma, vectorCero } from './espacio'

// Un colapso es un evento de determinación en el tiempo
// Referencia: Definición 0 — función de colapso c: T → E
export interface Colapso {
  id: string
  timestamp: number       // τ — momento del colapso
  vector: Vector          // c(τ) ∈ E — el colapso en el espacio
  peso: number            // w(τ) ≥ 0 — relevancia temporal
  integrado: boolean      // φ₂ lo aceptó o rechazó
  profundidad: number     // p(τ) ∈ [0,1] — profundidad de integración
}

// I(t) = ∫₀ᵗ c(τ) w(τ) dτ — versión discreta
// Solo suma los colapsos que φ₂ aceptó (integrado = true)
// Referencia: Definición 2, Teorema 2
export function calcularI(colapsos: Colapso[]): Vector {
  const integrados = colapsos.filter(c => c.integrado)

  if (integrados.length === 0) {
    // I(t) = 0 cuando no hay colapsos integrados
    // Estado Peribea — opera enteramente desde c heredado
    return vectorCero(6)
  }

  // I(t) = Σᵢ c(τᵢ) · w(τᵢ) · p(τᵢ)
  let acumulado = vectorCero(integrados[0].vector.length)
  for (const colapso of integrados) {
    const contribucion = escalar(colapso.vector, colapso.peso * colapso.profundidad)
    acumulado = sumar(acumulado, contribucion)
  }

  return acumulado
}

// Norma de I(t) — usada en el cálculo de S y φ₁
// ‖I(t)‖_E
export function normaI(colapsos: Colapso[]): number {
  return norma(calcularI(colapsos))
}

// Registro de colapsos RSC(t) — todos los colapsos producidos
// incluye integrados Y rechazados
// Referencia: Definición 2.1
export function RSC(colapsos: Colapso[]): Colapso[] {
  return [...colapsos]
}

// Colapsos rechazados RSC(t) \ I(t)
// Los que φ₂ evaluó y decidió no integrar
// Referencia: Definición 2.1
export function colapsoRechazados(colapsos: Colapso[]): Colapso[] {
  return colapsos.filter(c => !c.integrado)
}

// Verificar irreversibilidad de I(t)
// ‖I(t₂) − I(t₁)‖_E > 0 si hay colapsos no nulos
// Referencia: Teorema 2.1
export function esIrreversible(
  colapsosT1: Colapso[],
  colapsosT2: Colapso[]
): boolean {
  const i1 = calcularI(colapsosT1)
  const i2 = calcularI(colapsosT2)
  const diferencia = i2.map((val, idx) => val - i1[idx])
  return norma(diferencia) > 1e-10
}

// Crear un colapso nuevo con valores por defecto
export function crearColapso(
  id: string,
  vector: Vector,
  peso: number = 1.0
): Colapso {
  return {
    id,
    timestamp: Date.now(),
    vector,
    peso,
    integrado: false,   // φ₂ decide si se integra — empieza en false
    profundidad: 0      // se actualiza cuando φ₂ integra
  }
}