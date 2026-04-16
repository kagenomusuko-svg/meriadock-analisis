"use strict";
exports.calcularDelta = function(rStar, alpha) {
  var v = Math.max(-1, Math.min(1, rStar - alpha));
  var signo, diag, accion;
  if (v > 0.20) {
    signo = 'brecha';
    diag = 'Brecha activa: causó R*='+(rStar*100).toFixed(1)+'% pero asumió α='+(alpha*100).toFixed(1)+'%';
    accion = 'Verificar completitud del grafo. Si G completo: protocolo integración prioritaria.';
  } else if (v < -0.10) {
    signo = 'sobreasuncion';
    diag = 'Sobreasunción: asumió α='+(alpha*100).toFixed(1)+'% pero peso causal R*='+(rStar*100).toFixed(1)+'%';
    accion = 'Verificar completitud del grafo. Si G completo: buscar nodo j con Δⱼ > 0.';
  } else {
    signo = 'equilibrio';
    diag = 'Equilibrio relativo: R*='+(rStar*100).toFixed(1)+'% y α='+(alpha*100).toFixed(1)+'%';
    accion = 'Verificar intervalos de confianza antes de declarar equilibrio.';
  }
  return { valor:v, rStar:rStar, alpha:alpha, signo:signo, diagnostico:diag, accion:accion };
};
