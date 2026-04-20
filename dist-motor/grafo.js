"use strict";
var escalas = require('./escalas');

// Calcular midpoint de una arista
// Si la arista tiene dominio + nivelEvidencia (string/numero), usa la tabla de escalas
// Si tiene pesoMin + pesoMax como fallback, los usa directamente
exports.midpoint = function(a) {
  if (a.dominio && (a.nivelEvidencia !== undefined)) {
    return escalas.midpoint(a.dominio, a.nivelEvidencia);
  }
  if (a.pesoMin !== undefined && a.pesoMax !== undefined) {
    return (a.pesoMin + a.pesoMax) / 2;
  }
  return 0;
};

exports.rangoArista = function(a) {
  if (a.dominio && (a.nivelEvidencia !== undefined)) {
    return escalas.obtenerRango(a.dominio, a.nivelEvidencia);
  }
  if (a.pesoMin !== undefined && a.pesoMax !== undefined) {
    return { min: a.pesoMin, max: a.pesoMax, midpoint: (a.pesoMin + a.pesoMax) / 2 };
  }
  return { min: 0, max: 0, midpoint: 0 };
};

exports.construirMatrizW = function(grafo) {
  var n = grafo.nodos.length;
  var indice = {};
  grafo.nodos.forEach(function(nd, i) { indice[nd.id] = i; });
  var W = Array.from({length:n}, function() { return new Array(n).fill(0); });
  var porOrigen = {};
  grafo.aristas.forEach(function(a) {
    if (!porOrigen[a.origen]) porOrigen[a.origen] = [];
    porOrigen[a.origen].push(a);
  });
  grafo.nodos.forEach(function(nd) {
    if (nd.tipo === 'final') return;
    var ars = porOrigen[nd.id] || [];
    if (!ars.length) return;
    var suma = ars.reduce(function(s,a) { return s + exports.midpoint(a); }, 0);
    ars.forEach(function(a) {
      var i = indice[a.origen], j = indice[a.destino];
      if (i !== undefined && j !== undefined)
        W[i][j] = suma > 0 ? exports.midpoint(a) / suma : 0;
    });
  });
  return W;
};

exports.pertrubarMatriz = function(W, eps) {
  eps = eps || 0.01;
  var n = W.length;
  return W.map(function(fila) {
    return fila.map(function(v) { return (1-eps)*v + eps/n; });
  });
};

exports.tieneNodoFinal = function(g) { return g.nodos.some(function(n) { return n.tipo==='final'; }); };
exports.indiceNodoFinal = function(g) { return g.nodos.findIndex(function(n) { return n.tipo==='final'; }); };
