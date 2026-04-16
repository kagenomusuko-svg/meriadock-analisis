"use strict";
exports.vectorCero = function(n) { return new Array(n).fill(0); };
exports.norma = function(a) { return Math.sqrt(a.reduce(function(s,v){ return s+v*v; },0)); };
exports.productoInterno = function(a,b) { return a.reduce(function(s,v,i){ return s+v*b[i]; },0); };
exports.sumar = function(a,b) { return a.map(function(v,i){ return v+b[i]; }); };
exports.escalar = function(a,k) { return a.map(function(v){ return v*k; }); };
exports.similitudCoseno = function(a,b) {
  var na = exports.norma(a), nb = exports.norma(b);
  if(na===0||nb===0) return 0;
  return exports.productoInterno(a,b)/(na*nb);
};
exports.mismaDimension = function(a,b) { return a.length===b.length; };
