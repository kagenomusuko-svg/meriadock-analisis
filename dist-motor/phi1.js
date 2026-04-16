"use strict";
exports.HIJOS = ['fobos','deimos','anteros','eros','potos','harmonia'];
exports.RANGOS_S = {
  fobos:   {min:0.70,max:0.95,midpoint:0.85},
  deimos:  {min:0.72,max:0.95,midpoint:0.83},
  anteros: {min:0.30,max:0.70,midpoint:0.55},
  eros:    {min:0.30,max:0.70,midpoint:0.50},
  potos:   {min:0.08,max:0.30,midpoint:0.23},
  harmonia:{min:0.00,max:1.00,midpoint:0.50}
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
