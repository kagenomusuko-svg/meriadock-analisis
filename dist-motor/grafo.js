"use strict";

// ============================================================
// GRAFO — Construcción de la matriz de pesos W
// Normalización por DESTINO (suma de pesos entrantes al nodo j)
//
// Justificación teórica:
// En el marco de Metrología Causal, el peso de una arista representa
// la contribución causal del nodo origen hacia el resultado.
// La normalización correcta preserva esos pesos relativos midiendo
// cuánto aporta cada fuente al nodo destino — no cómo distribuye
// su flujo el nodo origen.
//
// Normalización anterior (por origen — INCORRECTA para este marco):
//   W[i][j] = midpoint(arista_ij) / suma_salientes_de_i
//   → Todos los nodos con una sola arista de salida obtienen W=1.0
//   → Los pesos de evidencia desaparecen
//   → R* resulta uniforme sin importar la evidencia
//
// Normalización actual (por destino — CORRECTA):
//   W[i][j] = midpoint(arista_ij) / suma_entrantes_a_j
//   → Un nodo con arista 0.65 compite contra uno con 0.35
//   → W[i][j] = 0.65 y W[k][j] = 0.35 respectivamente
//   → R* refleja la evidencia real del expediente
// ============================================================

exports.midpoint = function(a) {
  return (a.pesoMin + a.pesoMax) / 2;
};

// Construye la matriz de transición W normalizada por columna (destino).
// Para cada nodo destino j, la suma de W[i][j] sobre todos los i = 1.
// Los nodos sin aristas entrantes quedan en cero (no son sumideros activos).
exports.construirMatrizW = function(grafo) {
  var n = grafo.nodos.length;
  var indice = {};
  grafo.nodos.forEach(function(nd, i) { indice[nd.id] = i; });

  var W = Array.from({ length: n }, function() { return new Array(n).fill(0); });

  // Agrupar aristas por DESTINO
  var porDestino = {};
  grafo.aristas.forEach(function(a) {
    if (!porDestino[a.destino]) porDestino[a.destino] = [];
    porDestino[a.destino].push(a);
  });

  // Para cada nodo destino: normalizar los pesos entrantes
  Object.keys(porDestino).forEach(function(destId) {
    var ars = porDestino[destId];

    // Suma de midpoints de todas las aristas que llegan a este destino
    var suma = ars.reduce(function(s, a) { return s + exports.midpoint(a); }, 0);

    ars.forEach(function(a) {
      var i = indice[a.origen];
      var j = indice[a.destino];
      if (i !== undefined && j !== undefined && suma > 0) {
        W[i][j] = exports.midpoint(a) / suma;
      }
    });
  });

  return W;
};

// Construye W con un vector de pesos explícito (usado por hipercubo.js).
// También normaliza por destino para mantener consistencia.
exports.construirWConPesos = function(grafo, pesosVertice) {
  var n = grafo.nodos.length;
  var indice = {};
  grafo.nodos.forEach(function(nd, i) { indice[nd.id] = i; });

  var W = Array.from({ length: n }, function() { return new Array(n).fill(0); });

  // Asociar el peso del vértice a cada arista
  var aristasConPeso = grafo.aristas.map(function(a, idx) {
    return Object.assign({}, a, { pesoVertice: pesosVertice[idx] });
  });

  // Agrupar por destino
  var porDestino = {};
  aristasConPeso.forEach(function(a) {
    if (!porDestino[a.destino]) porDestino[a.destino] = [];
    porDestino[a.destino].push(a);
  });

  Object.keys(porDestino).forEach(function(destId) {
    var ars = porDestino[destId];
    var suma = ars.reduce(function(s, a) { return s + a.pesoVertice; }, 0);
    ars.forEach(function(a) {
      var i = indice[a.origen];
      var j = indice[a.destino];
      if (i !== undefined && j !== undefined && suma > 0) {
        W[i][j] = a.pesoVertice / suma;
      }
    });
  });

  return W;
};

// Perturbación ergódica: garantiza que la cadena de Markov sea irreducible.
// Mezcla W con la matriz uniforme en proporción eps.
// Sin esta perturbación, nodos sin aristas entrantes pueden quedar
// con columna cero y el eigenvector no converge.
exports.pertrubarMatriz = function(W, eps) {
  eps = eps || 0.01;
  var n = W.length;
  return W.map(function(fila) {
    return fila.map(function(v) { return (1 - eps) * v + eps / n; });
  });
};

// Utilidades de inspección del grafo
exports.tieneNodoFinal = function(g) {
  return g.nodos.some(function(n) { return n.tipo === 'final'; });
};

exports.indiceNodoFinal = function(g) {
  return g.nodos.findIndex(function(n) { return n.tipo === 'final'; });
};