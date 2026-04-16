// ============================================================
// BLOQUE 7 — Vector de responsabilidad causal R*
// El eigenvector dominante de Wᵀ
// Referencia: Axiomatización Parte VI, Definición 6.1, Teorema 6
// ============================================================

import { GrafoCausal, construirMatrizW, pertrubarMatriz } from './grafo'

export interface ResultadoRStar {
  vector: number[]
  iteraciones: number
  convergio: boolean
  eigenvalor: number
}

function multiplicarWtransR(W: number[][], r: number[]): number[] {
  const n = W.length
  const resultado = new Array(n).fill(0)
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      resultado[j] += W[i][j] * r[i]
    }
  }
  return resultado
}

function normalizarL1(v: number[]): number[] {
  const suma = v.reduce((acc, val) => acc + Math.abs(val), 0)
  if (suma < 1e-10) return v.map(() => 1 / v.length)
  return v.map(val => val / suma)
}

function distanciaL1(a: number[], b: number[]): number {
  return a.reduce((acc, val, i) => acc + Math.abs(val - b[i]), 0)
}

export function calcularRStar(
  W: number[][],
  maxIteraciones: number = 1000,
  tolerancia: number = 1e-9
): ResultadoRStar {
  const n = W.length
  let r = new Array(n).fill(1 / n)
  let iteraciones = 0
  let convergio = false

  for (let iter = 0; iter < maxIteraciones; iter++) {
    iteraciones++
    const rNuevo = multiplicarWtransR(W, r)
    const rNormalizado = normalizarL1(rNuevo)
    const distancia = distanciaL1(rNormalizado, r)
    r = rNormalizado
    if (distancia < tolerancia) {
      convergio = true
      break
    }
  }

  const Wtr = multiplicarWtransR(W, r)
  const eigenvalor = Wtr.reduce((acc, val) => acc + Math.abs(val), 0)

  return { vector: r, iteraciones, convergio, eigenvalor }
}

export function calcularRStarDesdeGrafo(
  grafo: GrafoCausal,
  epsilon: number = 0.01
): ResultadoRStar & { nombresNodos: string[] } {
  const W = construirMatrizW(grafo)
  const Wpert = pertrubarMatriz(W, epsilon)
  const resultado = calcularRStar(Wpert)

  return {
    ...resultado,
    nombresNodos: grafo.nodos.map(n => n.nombre)
  }
}

export function calcularRStarConRangos(grafo: GrafoCausal): {
  central: ResultadoRStar
  minimo: number[]
  maximo: number[]
  nombresNodos: string[]
} {
  const W = pertrubarMatriz(construirMatrizW(grafo))
  const central = calcularRStar(W)

  return {
    central,
    minimo: central.vector,
    maximo: central.vector,
    nombresNodos: grafo.nodos.map(n => n.nombre)
  }
}

export function interpretarRStar(
  rStar: number[],
  indiceNodo: number,
  nombreNodo: string
): string {
  const valor = rStar[indiceNodo]
  const porcentaje = (valor * 100).toFixed(1)
  const maximo = Math.max(...rStar)
  const esLider = valor === maximo

  if (esLider) {
    return `${nombreNodo} es el nodo de mayor peso causal con R* = ${porcentaje}%. ` +
      `Es el nodo sin el cual el resultado no habría ocurrido de esa forma específica.`
  } else if (valor > 0.20) {
    return `${nombreNodo} tiene peso causal significativo: R* = ${porcentaje}%.`
  } else if (valor > 0.05) {
    return `${nombreNodo} tiene peso causal moderado: R* = ${porcentaje}%.`
  } else {
    return `${nombreNodo} tiene peso causal menor: R* = ${porcentaje}%.`
  }
}