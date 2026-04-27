"use strict";

// ============================================================
// SUSTITUIBILIDAD — S_op y S combinado
// Referencia: Arquitectura ontológica Cap. 1.3
//
// S_op(i) = ‖c‖_C / (‖c‖_C + ‖a_t‖_E)
//
// Proxy en el grafo causal:
//   ‖c‖_C  = norma L2 de los midpoints de aristas ENTRANTES al nodo
//             (lo que el campo / diseño le impone al nodo)
//   ‖a_t‖_E = norma L2 de los midpoints de aristas SALIENTES del nodo
//             (la contribución propia del nodo hacia el resultado)
//
// Intuición:
//   Nodo con mucha influencia entrante → campo lo determina → S alto
//   Nodo con mucha influencia saliente propia → idiosincrático → S bajo
//
// S combinado = (S_op + S_mode) / 2
//   S_op   captura la posición estructural en el grafo
//   S_mode captura la disposición conductual (Hijos de Afrodita)
//   Ninguno domina completamente — ambos aportan información independiente
// ============================================================

var phi1 = require('./phi1');

function midpoint(a) {
  return (a.pesoMin + a.pesoMax) / 2;
}

// Norma L2 de un array de valores
function normaL2(valores) {
  return Math.sqrt(valores.reduce(function(s, v) { return s + v * v; }, 0));
}

// S_op: sustituibilidad operacional desde posición en el grafo
// eps = suavizado para evitar S=0 en nodos raíz y S=1 en nodos hoja
exports.calcularSOp = function(nodoId, grafo) {
  var eps = 0.10;

  var entrantes = grafo.aristas.filter(function(a) { return a.destino === nodoId; });
  var salientes = grafo.aristas.filter(function(a) { return a.origen === nodoId; });

  var normaC  = normaL2(entrantes.map(midpoint));
  var normaAt = normaL2(salientes.map(midpoint));

  return (normaC + eps) / (normaC + normaAt + 2 * eps);
};

// S_mode: sustituibilidad desde el modo conductual (Hijos de Afrodita)
exports.calcularSMode = function(hijoDominante) {
  var hijo = (hijoDominante || 'anteros').toLowerCase();
  return phi1.RANGOS_S[hijo] ? phi1.RANGOS_S[hijo].midpoint : 0.50;
};

// S combinado: promedio ponderado de S_op y S_mode
// Retorna valor en [0, 1]
exports.calcularS = function(nd, grafo) {
  if (nd.tipo === 'final') return 0;
  var sOp   = exports.calcularSOp(nd.id, grafo);
  var sMode = exports.calcularSMode(nd.hijoDominante);
  return (sOp + sMode) / 2;
};

// Rango descriptivo para mostrar en el expediente
exports.rangoS = function(nd, grafo) {
  var hijo  = (nd.hijoDominante || 'anteros').toLowerCase();
  var rango = phi1.RANGOS_S[hijo] || { min: 0.30, max: 0.70 };
  var s     = exports.calcularS(nd, grafo);
  return '[' + rango.min.toFixed(2) + ', ' + rango.max.toFixed(2) + '] combinado ' + s.toFixed(2);
};