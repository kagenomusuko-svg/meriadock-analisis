// ============================================================
// BLOQUE 6 — Grafo causal G = (N, E, W)
// La estructura que conecta actores con resultados
// Referencia: Axiomatización Parte VI, Definición 6
// ============================================================

// Niveles de evidencia E0-E8
// Referencia: Metrología Causal Vol. I
export type NivelEvidencia = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

// Tipo de nodo en el grafo
export type TipoNodo =
  | 'diseno'        // diseñó las reglas, incentivos, protocolos
  | 'ejecucion'     // aplicó las reglas dentro del sistema
  | 'instrumental'  // vehículo del acto sin voluntad propia
  | 'final'         // el resultado — nodo sumidero n+1

// Un nodo en el grafo causal
export interface Nodo {
  id: string
  nombre: string
  tipo: TipoNodo
  descripcion: string
}

// Una arista con rango de peso calibrado por evidencia
// w(i,j) ∈ [a_ij, b_ij] según nivel E0-E8
// Referencia: Definición 6 — función de peso w: A → [0,1]
export interface Arista {
  origen: string        // id del nodo origen
  destino: string       // id del nodo destino
  pesoMin: number       // a_ij — extremo inferior del rango
  pesoMax: number       // b_ij — extremo superior del rango
  nivelEvidencia: NivelEvidencia
  descripcionEvidencia: string
}

// El grafo completo
export interface GrafoCausal {
  nodos: Nodo[]
  aristas: Arista[]
}

// Calcular el midpoint de cada arista
// m_ij = (a_ij + b_ij) / 2 — valor de cálculo
// Referencia: Definición 6 — construcción desde evidencia
export function midpoint(arista: Arista): number {
  return (arista.pesoMin + arista.pesoMax) / 2
}

// Construir la matriz de pesos W desde el grafo
// W es estocástica por filas: Σⱼ w(i,j) = 1 para todo i
// Referencia: Definición 6
export function construirMatrizW(grafo: GrafoCausal): number[][] {
  const n = grafo.nodos.length
  const indice: Record<string, number> = {}
  grafo.nodos.forEach((nodo, i) => { indice[nodo.id] = i })

  // Inicializar matriz con ceros
  const W: number[][] = Array.from(
    { length: n },
    () => new Array(n).fill(0)
  )

  // Agrupar aristas por nodo origen
  const aristasPorOrigen: Record<string, Arista[]> = {}
  for (const arista of grafo.aristas) {
    if (!aristasPorOrigen[arista.origen]) {
      aristasPorOrigen[arista.origen] = []
    }
    aristasPorOrigen[arista.origen].push(arista)
  }

  // Asignar pesos y normalizar por fila
  for (const nodo of grafo.nodos) {
    if (nodo.tipo === 'final') continue

    const aristasOrigen = aristasPorOrigen[nodo.id] || []
    if (aristasOrigen.length === 0) continue

    // Suma de midpoints para normalizar
    const sumaMidpoints = aristasOrigen.reduce(
      (acc, a) => acc + midpoint(a), 0
    )

    for (const arista of aristasOrigen) {
      const i = indice[arista.origen]
      const j = indice[arista.destino]
      if (i !== undefined && j !== undefined) {
        // Normalizar para que la fila sume 1
        W[i][j] = sumaMidpoints > 0
          ? midpoint(arista) / sumaMidpoints
          : 0
      }
    }
  }

  return W
}

// Perturbación W(ε) cuando G no es primitivo
// W(ε) = (1-ε)W + (ε/n)·J
// J es la matriz de unos
// Referencia: Teorema 6 — condición de primitiva
export function pertrubarMatriz(
  W: number[][],
  epsilon: number = 0.01
): number[][] {
  const n = W.length
  return W.map((fila, i) =>
    fila.map((val, j) => (1 - epsilon) * val + epsilon / n)
  )
}

// Verificar si el grafo tiene nodo final (sumidero)
export function tieneNodoFinal(grafo: GrafoCausal): boolean {
  return grafo.nodos.some(n => n.tipo === 'final')
}

// Obtener índice del nodo final
export function indiceNodoFinal(grafo: GrafoCausal): number {
  return grafo.nodos.findIndex(n => n.tipo === 'final')
}