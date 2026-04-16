"use strict";
var N_REF = {0:0,1:1,2:2,3:3,4:4,5:6,6:8,7:11,8:15};
exports.calcularF = function(nDoc, nivel) {
  var nRef = N_REF[nivel] || 1;
  return Math.min(1, nDoc/nRef);
};
exports.calcularG = function(nDom, nI) {
  if (!nI) return 0;
  return Math.min(1, nDom/nI);
};
exports.calcularAlpha = function(ins) {
  if (!ins.integrado) return 0;
  return exports.calcularF(ins.nDoc, ins.nivelEvidencia) *
         exports.calcularG(ins.nDom, ins.nI);
};
