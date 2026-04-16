// ============================================================
// BLOQUE 9 — Déficit de asunción Δ
// La brecha entre lo causado y lo integrado
// Referencia: Axiomatización Parte V, Definición 5
// ============================================================

// Resultado del cálculo de Δ para un nodo
export interface ResultadoDelta {
  valor: number           // Δᵢ = R*ᵢ − αᵢ ∈ [-1, 1]
  rStar: number           // R*ᵢ — peso causal
  alpha: number           // αᵢ — coeficiente de asunción
  signo: 'brecha' | 'equilibrio' | 'sobreasuncion'
  diagnostico: string
  accion: string
}

// Δᵢ = R*ᵢ − αᵢ
// Referencia: Definición 5
export function calcularDelta(
  rStar: number,
  alpha: number
): ResultadoDelta {
  const valor = rStar - alpha

  // Verificar acotación Δ ∈ [-1, 1]
  // Referencia: Teorema 5
  const valorAcotado = Math.max(-1, Math.min(1, valor))

  let signo: 'brecha' | 'equilibrio' | 'sobreasuncion'
  let diagnostico: string
  let accion: string

  if (valorAcotado > 0.20) {
    signo = 'brecha'
    diagnostico = `Brecha activa: el nodo causó R*=${(rStar*100).toFixed(1)}% ` +
      `pero solo asumió α=${(alpha*100).toFixed(1)}%. ` +
      `Hay responsabilidad causal pendiente de integración.`
    accion = 'Verificar completitud del grafo. ' +
      'Si G es completo: activar protocolo de integración prioritaria.'
  } else if (valorAcotado < -0.10) {
    signo = 'sobreasuncion'
    diagnostico = `Sobreasunción: el nodo asumió α=${(alpha*100).toFixed(1)}% ` +
      `pero su peso causal real es R*=${(rStar*100).toFixed(1)}%. ` +
      `Posible chivo expiatorio estructural.`
    accion = 'Verificar completitud del grafo. ' +
      'Si G es completo: buscar nodo j con Δⱼ > 0 que transfirió su carga.'
  } else {
    signo = 'equilibrio'
    diagnostico = `Equilibrio relativo: R*=${(rStar*100).toFixed(1)}% ` +
      `y α=${(alpha*100).toFixed(1)}% se solapan dentro del margen.`
    accion = 'Verificar intervalos de confianza de R* y α ' +
      'antes de declarar equilibrio.'
  }

  return {
    valor: valorAcotado,
    rStar,
    alpha,
    signo,
    diagnostico,
    accion
  }
}

// Calcular Δ para todos los nodos del grafo
export function calcularDeltaVector(
  rStarVector: number[],
  alphaVector: number[],
  nombresNodos: string[]
): ResultadoDelta[] {
  if (rStarVector.length !== alphaVector.length) {
    throw new Error('R* y α deben tener la misma dimensión')
  }

  return rStarVector.map((rStar, i) =>
    calcularDelta(rStar, alphaVector[i])
  )
}

// Evolución temporal de Δ
// dΔᵢ/dt = dR*ᵢ/dt − dαᵢ/dt
// Referencia: Teorema 5.1
export function calcularEvolucionDelta(
  deltaAnterior: number,
  deltaActual: number
): {
  cambio: number
  tendencia: 'creciente' | 'estacionaria' | 'decreciente'
  interpretacion: string
} {
  const cambio = deltaActual - deltaAnterior

  if (cambio > 0.05) {
    return {
      cambio,
      tendencia: 'creciente',
      interpretacion: 'La brecha crece: el nodo acumula responsabilidad ' +
        'causal más rápido de lo que integra.'
    }
  } else if (cambio < -0.05) {
    return {
      cambio,
      tendencia: 'decreciente',
      interpretacion: 'La brecha se cierra: el proceso de integración ' +
        'supera el ritmo de nuevos colapsos.'
    }
  } else {
    return {
      cambio,
      tendencia: 'estacionaria',
      interpretacion: 'R* y α crecen o decrecen a la misma tasa. ' +
        'El nivel de Δ se mantiene.'
    }
  }
}

// Señal de inversión causal
// Δᵢ < 0 con G completo → ∃ j ≠ i: Δⱼ > 0
// Referencia: Proposición 5.2
export function detectarInversionCausal(
  deltas: ResultadoDelta[],
  grafoCo: boolean // true si el grafo está completo
): {
  hayInversion: boolean
  nodosConBrechaNegativa: number[]
  nodosConBrechaPositiva: number[]
  mensaje: string
} {
  const negativos = deltas
    .map((d, i) => ({ indice: i, delta: d.valor }))
    .filter(d => d.delta < -0.10)

  const positivos = deltas
    .map((d, i) => ({ indice: i, delta: d.valor }))
    .filter(d => d.delta > 0.20)

  if (!grafoCo) {
    return {
      hayInversion: false,
      nodosConBrechaNegativa: negativos.map(n => n.indice),
      nodosConBrechaPositiva: positivos.map(n => n.indice),
      mensaje: 'El grafo puede estar incompleto. ' +
        'Verificar completitud antes de declarar inversión causal.'
    }
  }

  const hayInversion = negativos.length > 0 && positivos.length > 0

  return {
    hayInversion,
    nodosConBrechaNegativa: negativos.map(n => n.indice),
    nodosConBrechaPositiva: positivos.map(n => n.indice),
    mensaje: hayInversion
      ? 'Inversión causal detectada: hay nodos que asumen más de lo que ' +
        'causaron y nodos que causaron más de lo que asumen.'
      : 'No se detecta inversión causal con el grafo actual.'
  }
}