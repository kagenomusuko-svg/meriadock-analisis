"use strict";
exports.calcularRStarNeta = function(r, s) { return r * (1 - s); };
exports.calcularRStarNetaVector = function(rVec, sVec) { return rVec.map(function(r, i) { return r * (1 - sVec[i]); }); };
