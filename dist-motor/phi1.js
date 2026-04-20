"use strict";
exports.HIJOS = ['fobos','deimos','anteros','eros','potos','harmonia'];

// Rangos S por Hijo — Tabla 9 de la Taxonomia (Capitulo U·3)
// Fuente canonica: Libro 2, cap. 4.2
// Correccion: anteros y potos estaban intercambiados. harmonia corregido.
exports.RANGOS_S = {
  fobos:   { min: 0.70, max: 0.92, midpoint: 0.81 },
  deimos:  { min: 0.75, max: 0.95, midpoint: 0.85 },
  anteros: { min: 0.08, max: 0.30, midpoint: 0.19 },
  eros:    { min: 0.30, max: 0.60, midpoint: 0.45 },
  potos:   { min: 0.55, max: 0.80, midpoint: 0.68 },
  harmonia:{ min: 0.05, max: 0.20, midpoint: 0.13 }
};
exports.parametrosIniciales = function() {
  return exports.HIJOS.map(function(_,k) {
    return { beta:[0,0,0,0,0,0].map(function(_,i){ return i===k?1:0; }), gamma:0.5, theta:0.0 };
  });
};
exports.softmax = function(params, estado) {
  var logits = params.map(function(p) {
    var prod = p.beta.reduce(function(s,b,i){ return s+b*estado.a_t[i]; },0);
    return (prod + p.gamma*estado.norma_I - p.theta) / estado.tau;
  });
  var mx = Math.max.apply(null,logits);
  var exps = logits.map(function(z){ return Math.exp(z-mx); });
  var suma = exps.reduce(function(s,e){ return s+e; },0);
  return exps.map(function(e){ return e/suma; });
};
exports.hijoDominante = function(dist) {
  var idx=0, mx=dist[0];
  dist.forEach(function(v,i){ if(v>mx){mx=v;idx=i;} });
  return { hijo:exports.HIJOS[idx], indice:idx, probabilidad:mx };
};
