// ============================================================
// BLOQUE 8 — Coeficiente de asunción α
// Qué fracción de lo causado fue integrado como propio
// Referencia: Axiomatización Parte IV, Definición 4 y 4.1
// ============================================================

import { NivelEvidencia } from './grafo'

// n_ref por nivel de evidencia E0-E8
// Referencia: Tabla 4.1 — anclaje de n_ref a la escala E0-E8
export const N_REF_POR_NIVEL: Record<NivelEvidencia, number> = {
  0: 0,   // sin evidencia
  1: 1,   // declaración simple
  2: 2,   // declaración con respaldo mínimo
  3: 3,   // documental básico
  4: 4,   // documental básico robusto
  5: 6,   // documental robusto
  6: 8,   // documental robusto amplio
  7: 11,  // prueba casi plena
  8: 15   // prueba plena
}

// Insumos para calcular α de un colapso específico
export interface InsumosAlpha {
  // p_pres ∈ {0,1}: ¿el colapso fue integrado en I(t)?
  integrado: boolean

  // n_doc: documentos del expediente que confirman la integración
  nDoc: number

  // nivel de evidencia declarado para el dominio
  nivelEvidencia: NivelEvidencia

  // n_dom: dominios de I(t) afectados por esta integración
  nDom: number

  // n_I: total de dominios identificados en I(t)
  nI: number
}

// Profundidad de integración f(τ)
// f(τ) = min(1, n_doc / n_ref)
// Referencia: Tabla 4.1
export function calcularF(nDoc: number, nivelEvidencia: NivelEvidencia): number {
  const nRef = N_REF_POR_NIVEL[nivelEvidencia]
  if (nRef === 0) return 0
  return Math.min(1, nDoc / nRef)
}

// Alcance de la integración g(τ)
// g(τ) = n_dom / n_I
// Referencia: Tabla 4.1
export function calcularG(nDom: number, nI: number): number {
  if (nI === 0) return 0
  return Math.min(1, nDom / nI)
}

// Coeficiente de asunción — versión discreta
// α(aᵢ) = p_pres · f(τᵢ) · g(τᵢ)
// Referencia: Definición 4.1, Proposición 4.1
export function calcularAlpha(insumos: InsumosAlpha): number {
  if (!insumos.integrado) return 0

  const f = calcularF(insumos.nDoc, insumos.nivelEvidencia)
  const g = calcularG(insumos.nDom, insumos.nI)

  const alpha = f * g

  // Verificar acotación: α ∈ [0,1]
  // Referencia: Teorema 4
  return Math.max(0, Math.min(1, alpha))
}

// Coeficiente de asunción agregado para un conjunto de colapsos
// α_D = (1/|A_D|) · Σ_{aᵢ ∈ A_D ∩ I(t)} α(aᵢ)
// Referencia: Definición 4.1
export function calcularAlphaAgregado(
  alphas: number[],
  totalColapsos: number
): number {
  if (totalColapsos === 0) return 0
  const suma = alphas.reduce((acc, val) => acc + val, 0)
  return suma / totalColapsos
}

// Tipo de integración según profundidad α
// Referencia: Metrología Causal — tipos de integración
export function tipoIntegracion(alpha: number): {
  tipo: string
  descripcion: string
  rango: string
} {
  if (alpha >= 0.6) {
    return {
      tipo: 'constitutiva',
      descripcion: 'El colapso produjo un cambio en los principios ' +
        'desde los que el sistema opera',
      rango: '[0.6, 1.0]'
    }
  } else if (alpha >= 0.3) {
    return {
      tipo: 'causal',
      descripcion: 'El colapso conectó con su posición en la cadena ' +
        'causal y modificó los pesos de decisión',
      rango: '[0.3, 0.6]'
    }
  } else if (alpha > 0) {
    return {
      tipo: 'factual',
      descripcion: 'El colapso fue registrado y catalogado ' +
        'pero sin modificación profunda del comportamiento',
      rango: '[0.1, 0.3]'
    }
  } else {
    return {
      tipo: 'ninguna',
      descripcion: 'No hubo integración — φ₂ rechazó el colapso ' +
        'o no llegó a evaluarlo',
      rango: '[0]'
    }
  }
}

// Independencia de α respecto al dolo
// α es invariante bajo cualquier descripción de la intención
// Referencia: Corolario 4.1
export const NOTA_INDEPENDENCIA_DOLO =
  'α está definido exclusivamente en términos de acciones observables ' +
  'posteriores al colapso. El dolo, la culpa o la ausencia de ambos ' +
  'no alteran el valor de α. Esto lo distingue de los sistemas de ' +
  'imputación jurídica clásicos que anclan la responsabilidad en la intención.'