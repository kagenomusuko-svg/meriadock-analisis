"use strict";
exports.calcularRStarNeta = function(r, s) { return r*(1-s); };
exports.determinarDeclaracion = function(evid, estable, completo, rLider, nomLider) {
  var porc = (rLider*100).toFixed(1);
  if (evid >= 5 && estable && completo)
    return { nivel:'A', descripcion: nomLider+' es el nodo líder con R*='+porc+'%. Alta certeza.', rStarLider:rLider, rStarLiderNombre:nomLider };
  if (evid >= 3 && completo)
    return { nivel:'B', descripcion: nomLider+' lidera con R*='+porc+'%. Certeza moderada.', rStarLider:rLider, rStarLiderNombre:nomLider };
  if (!completo || evid >= 1)
    return { nivel:'C', descripcion:'Incertidumbre estructural. Distribución preliminar.', rStarLider:rLider, rStarLiderNombre:nomLider };
  return { nivel:'D', descripcion:'Máxima incertidumbre. Evidencia insuficiente.', rStarLider:rLider, rStarLiderNombre:nomLider };
};
