"use strict";

// ============================================================
// SERIE III — Hipercubo de parámetros
// Análisis de estabilidad del ranking σ(R*)
// Referencia: Metrología Causal Vol. II Cap. I·1 Tipo 3
// ============================================================

var rEstrella = require('./r_estrella');
var grafo = require('./grafo');

// Genera todos los vértices del hipercubo
// Cada arista contribuye 2 extremos: pesoMin y pesoMax
// Para n aristas → 2^n vértices
// Si n > 20 → muestreo aleatorio (declarado en el reporte)
exports.generarVertices = function(aristas, maxExhaustivo) {
  maxExhaustivo = maxExhaustivo || 20;
  var n = aristas.length;
  var exhaustivo = n <= maxExhaustivo;
  var vertices = [];

  if (exhaustivo) {
    var total = Math.pow(2, n);
    for (var v = 0; v < total; v++) {
      var pesos = aristas.map(function(a, i) {
        var bit = (v >> i) & 1;
        return bit === 0 ? a.pesoMin : a.pesoMax;
      });
      vertices.push(pesos);
    }
  } else {
    // Muestreo aleatorio — 2000 puntos
    var muestras = 2000;
    for (var m = 0; m < muestras; m++) {
      var pesos = aristas.map(function(a) {
        return a.pesoMin + Math.random() * (a.pesoMax - a.pesoMin);
      });
      vertices.push(pesos);
    }
  }

  return { vertices: vertices, exhaustivo: exhaustivo, n: n, total: vertices.length };
};

// Construye matriz W con un set específico de pesos
// (en lugar de usar los midpoints)
exports.construirWConPesos = function(grafoCausal, pesosVertice) {
  var n = grafoCausal.nodos.length;
  var indice = {};
  grafoCausal.nodos.forEach(function(nd, i) { indice[nd.id] = i; });

  var W = Array.from({length: n}, function() { return new Array(n).fill(0); });

  // Asignar pesos del vértice a cada arista
  var aristasConPeso = grafoCausal.aristas.map(function(a, i) {
    return Object.assign({}, a, { pesoVertice: pesosVertice[i] });
  });

  // Agrupar por origen y normalizar
  var porOrigen = {};
  aristasConPeso.forEach(function(a) {
    if (!porOrigen[a.origen]) porOrigen[a.origen] = [];
    porOrigen[a.origen].push(a);
  });

  grafoCausal.nodos.forEach(function(nd) {
    if (nd.tipo === 'final') return;
    var ars = porOrigen[nd.id] || [];
    if (!ars.length) return;
    var suma = ars.reduce(function(s, a) { return s + a.pesoVertice; }, 0);
    ars.forEach(function(a) {
      var i = indice[a.origen], j = indice[a.destino];
      if (i !== undefined && j !== undefined && suma > 0)
        W[i][j] = a.pesoVertice / suma;
    });
  });

  return W;
};

// Calcula el ranking σ(R*) — ordenamiento de nodos por peso causal
// Excluye el nodo final del ranking
exports.calcularRanking = function(vectorR, nodos) {
  var indices = nodos
    .map(function(nd, i) { return { nombre: nd.nombre, valor: vectorR[i], tipo: nd.tipo, i: i }; })
    .filter(function(x) { return x.tipo !== 'final'; })
    .sort(function(a, b) { return b.valor - a.valor; });
  return indices.map(function(x) { return x.nombre; });
};

// Compara dos rankings — devuelve true si son idénticos
exports.rankingsIguales = function(r1, r2) {
  if (r1.length !== r2.length) return false;
  return r1.every(function(nombre, i) { return nombre === r2[i]; });
};

// Análisis completo de estabilidad
// Devuelve % estabilidad, mapa de sensibilidad por arista, y Declaración
exports.analizarEstabilidad = function(grafoCausal) {
  var aristas = grafoCausal.aristas;
  var nodos = grafoCausal.nodos;

  // Calcular ranking base con midpoints
  var Wbase = grafo.construirMatrizW(grafoCausal);
  var Wpert = grafo.pertrubarMatriz(Wbase);
  var rBase = rEstrella.calcularRStar(Wpert);
  var rankingBase = exports.calcularRanking(rBase.vector, nodos);

  // Generar vértices del hipercubo
  var hipercubo = exports.generarVertices(aristas);

  // Evaluar cada vértice
  var estables = 0;
  var inestablesPorArista = aristas.map(function() { return 0; });

  hipercubo.vertices.forEach(function(pesosVertice) {
    var W = exports.construirWConPesos(grafoCausal, pesosVertice);
    var Wp = grafo.pertrubarMatriz(W);
    var r = rEstrella.calcularRStar(Wp);
    var ranking = exports.calcularRanking(r.vector, nodos);

    if (exports.rankingsIguales(ranking, rankingBase)) {
      estables++;
    } else {
      // Identificar qué arista está en su extremo cuando cambia el ranking
      pesosVertice.forEach(function(p, i) {
        if (p === aristas[i].pesoMin || p === aristas[i].pesoMax) {
          inestablesPorArista[i]++;
        }
      });
    }
  });

  var pctEstabilidad = (estables / hipercubo.total) * 100;

  // Mapa de sensibilidad por arista
  var sensibilidad = aristas.map(function(a, i) {
    var amplitud = a.pesoMax - a.pesoMin;
    var impacto = inestablesPorArista[i] / hipercubo.total;
    return {
      aristaId: a.origen + '_' + a.destino,
      origen: a.origen,
      destino: a.destino,
      rango: [a.pesoMin, a.pesoMax],
      amplitud: amplitud,
      impactoEnInestabilidad: impacto,
      esCritica: impacto > 0.05
    };
  });

  // Ordenar por impacto — las más críticas primero
  sensibilidad.sort(function(a, b) { return b.impactoEnInestabilidad - a.impactoEnInestabilidad; });

  return {
    rankingBase: rankingBase,
    pctEstabilidad: pctEstabilidad,
    totalVertices: hipercubo.total,
    verticesEstables: estables,
    exhaustivo: hipercubo.exhaustivo,
    sensibilidad: sensibilidad,
    nivelDeclaracion: exports.determinarNivel(pctEstabilidad)
  };
};

// Determina nivel A-B-C-D desde % de estabilidad
exports.determinarNivel = function(pct) {
  if (pct >= 90) return 'A';
  if (pct >= 70) return 'B';
  if (pct >= 40) return 'C';
  return 'D';
};
