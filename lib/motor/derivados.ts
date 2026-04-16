// ============================================================
// BLOQUE 10 — Derivados del cálculo causal
// R*_neta, IIC, Fraude annona, Declaración A-B-C-D
// Referencia: Axiomatización Apéndice D, Metrología Causal Vol. II
// ============================================================

import { ResultadoDelta } from './delta'

// ============================================================
// R*_neta — responsabilidad causal neta descontada sustituibilidad
// R*_neta_i = R*ᵢ · (1 − Sᵢ)
// Referencia: Método Prometeo Cap. 3.3
// ============================================================
export function calcularRStarNeta(
  rStar: number,
  s: number
): number {
  return rStar * (1 - s)
}

export function calcularRStarNetaVector(
  rStarVector: number[],
  sVector: number[]
): number[] {
  return rStarVector.map((r, i) => calcularRStarNeta(r, sVector[i]))
}

// ============================================================
// IIC — Índice de Integridad Causal
// Congruencia entre campo declarado y observable
// IIC = 1: congruencia total
// IIC = 0: divergencia total
// Referencia: Metrología Causal Vol. II — Serie II
// ============================================================
export interface InsumosIIC {
  comportamientosDeclarados: string[]   // lo que el nodo dijo que haría
  comportamientosObservados: string[]   // lo que el nodo hizo realmente
  coincidencias: number                 // cuántos coinciden
}

export function calcularIIC(insumos: InsumosIIC): number {
  const total = insumos.comportamientosDeclarados.length
  if (total === 0) return 0
  return Math.min(1, insumos.coincidencias / total)
}

// ============================================================
// Fraude annona
// El incumplimiento agravado por posición de garante
// Fraude annona = R*ᵢ · (1 − αᵢ) · (1 − IIC)
// Referencia: Metrología Causal Vol. II
// ============================================================
export function calcularFraudeAnnona(
  rStar: number,
  alpha: number,
  iic: number
): number {
  return rStar * (1 - alpha) * (1 - iic)
}

export function interpretarFraudeAnnona(valor: number): string {
  if (valor > 0.3) {
    return `Fraude annona alto (${(valor*100).toFixed(1)}%): alta centralidad causal, ` +
      `baja asunción y baja congruencia. ` +
      `El nodo de diseño incumplió el contrato implícito de posición.`
  } else if (valor > 0.1) {
    return `Fraude annona moderado (${(valor*100).toFixed(1)}%): ` +
      `hay incumplimiento del deber de posición pero no en grado máximo.`
  } else {
    return `Fraude annona bajo (${(valor*100).toFixed(1)}%): ` +
      `el nodo operó con congruencia razonable respecto a su posición.`
  }
}

// ============================================================
// Declaración A-B-C-D
// Nivel de certeza del análisis según robustez de la evidencia
// Referencia: Metrología Causal Vol. II Cap. U·4
// ============================================================
export type NivelDeclaracion = 'A' | 'B' | 'C' | 'D'

export interface Declaracion {
  nivel: NivelDeclaracion
  descripcion: string
  rStarLider: number
  rStarLiderNombre: string
  rangoIncertidumbre?: { min: number; max: number }
  agendaInvestigacion?: string[]
}

export function determinarDeclaracion(
  evidenciaPromedio: number,    // promedio de niveles E0-E8
  estabilidadRanking: boolean,  // R* se mantiene bajo variación de pesos
  grafoCo: boolean,          // grafo completo
  rStarLider: number,
  nombreLider: string
): Declaracion {

  if (evidenciaPromedio >= 5 && estabilidadRanking && grafoCo) {
    return {
      nivel: 'A',
      descripcion: `Alta certeza sobre la distribución causal. ` +
        `${nombreLider} es el nodo de mayor peso causal con R*=${(rStarLider*100).toFixed(1)}%. ` +
        `El ranking es estable ante variación de los pesos de evidencia.`,
      rStarLider,
      rStarLiderNombre: nombreLider
    }
  } else if (evidenciaPromedio >= 3 && grafoCo) {
    return {
      nivel: 'B',
      descripcion: `Certeza moderada. ${nombreLider} lidera con R*=${(rStarLider*100).toFixed(1)}% ` +
        `pero hay incertidumbre en el rango de algunos pesos.`,
      rStarLider,
      rStarLiderNombre: nombreLider,
      rangoIncertidumbre: {
        min: rStarLider * 0.85,
        max: rStarLider * 1.15
      }
    }
  } else if (!grafoCo || evidenciaPromedio >= 1) {
    return {
      nivel: 'C',
      descripcion: `Incertidumbre estructural. El análisis produce una ` +
        `distribución preliminar pero hay nodos o aristas sin evidencia suficiente.`,
      rStarLider,
      rStarLiderNombre: nombreLider,
      agendaInvestigacion: [
        'Identificar nodos estructuralmente necesarios sin documentación',
        'Elevar el nivel de evidencia de aristas con E0-E2',
        'Verificar completitud del grafo'
      ]
    }
  } else {
    return {
      nivel: 'D',
      descripcion: `Máxima incertidumbre. No hay evidencia suficiente ` +
        `para producir una distribución confiable.`,
      rStarLider,
      rStarLiderNombre: nombreLider,
      agendaInvestigacion: [
        'El análisis no puede producir Declaración robusta con la evidencia actual',
        'Se requiere: documentación de los nodos principales',
        'Se requiere: evidencia de al menos nivel E3 en las aristas centrales',
        'Se requiere: confirmación de la completitud del grafo'
      ]
    }
  }
}

// ============================================================
// Resumen ejecutivo del análisis completo
// ============================================================
export interface ResumenAnalisis {
  declaracion: Declaracion
  rStarNeta: number[]
  iic?: number
  fraudeAnnona?: number
  deltasSignificativos: ResultadoDelta[]
  inversionDetectada: boolean
}

export function generarResumen(
  declaracion: Declaracion,
  rStarNeta: number[],
  deltas: ResultadoDelta[],
  iic?: number,
  fraudeAnnona?: number
): ResumenAnalisis {
  const deltasSignificativos = deltas.filter(
    d => Math.abs(d.valor) > 0.10
  )

  const inversionDetectada = deltas.some(d => d.signo === 'sobreasuncion') &&
    deltas.some(d => d.signo === 'brecha')

  return {
    declaracion,
    rStarNeta,
    iic,
    fraudeAnnona,
    deltasSignificativos,
    inversionDetectada
  }
}