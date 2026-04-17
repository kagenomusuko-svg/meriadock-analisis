// ============================================================
// BLOQUE 1 — Espacio vectorial E
// Base matemática de todo el motor
// Referencia: Axiomatización Parte 0, Axioma 0
// ============================================================

// Un vector en el espacio E es simplemente un arreglo de números
export type Vector = number[]

// Producto interno ⟨a,b⟩_E = Σᵢ aᵢ·bᵢ
// Referencia: Axioma 0 — forma bilineal simétrica def. positiva
export function productoInterno(a: Vector, b: Vector): number {
  if (a.length !== b.length) {
    throw new Error(`Vectores de distinta dimensión: ${a.length} vs ${b.length}`)
  }
  let suma = 0
  for (let i = 0; i < a.length; i++) {
    suma += a[i] * b[i]
  }
  return suma
}

// Norma ‖a‖_E = √⟨a,a⟩
// Referencia: Axioma 0 — norma inducida
export function norma(a: Vector): number {
  return Math.sqrt(productoInterno(a, a))
}

// Similitud coseno — familia de referencia para eval(a, I(t))
// eval(a, I(t)) = ⟨a, I(t)⟩_E / (‖a‖_E · ‖I(t)‖_E)
// Referencia: Teorema 2.2 — función de evaluación de compatibilidad
export function similitudCoseno(a: Vector, b: Vector): number {
  const normaA = norma(a)
  const normaB = norma(b)
  if (normaA === 0 || normaB === 0) return 0
  return productoInterno(a, b) / (normaA * normaB)
}

// Suma de vectores en E
export function sumar(a: Vector, b: Vector): Vector {
  if (a.length !== b.length) {
    throw new Error(`Vectores de distinta dimensión: ${a.length} vs ${b.length}`)
  }
  return a.map((val, i) => val + b[i])
}

// Multiplicar vector por escalar
export function escalar(a: Vector, k: number): Vector {
  return a.map(val => val * k)
}

// Vector cero de dimensión n
export function vectorCero(n: number): Vector {
  return new Array(n).fill(0)
}

// Verificar que dos vectores tienen la misma dimensión
export function mismaDimension(a: Vector, b: Vector): boolean {
  return a.length === b.length
}