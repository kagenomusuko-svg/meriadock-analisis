"use strict";

exports.calcularRStarNeta = function(r, s) { return r * (1 - s); };

exports.calcularRStarNetaVector = function(rVec, sVec) {
  return rVec.map(function(r, i) { return r * (1 - sVec[i]); });
};

// determinarDeclaracion: versión simplificada basada en nivel de evidencia.
// Usada en scripts de desarrollo y prueba.
// En producción, la Declaración la produce hipercubo.determinarNivel()
// desde el análisis de estabilidad del ranking σ(R*).
exports.determinarDeclaracion = function(nivelEvidencia, convergio, tieneGrafoCompleto, rStarLider, nombreLider) {
  var nivel;
  if (nivelEvidencia >= 7 && convergio && tieneGrafoCompleto) {
    nivel = 'A';
  } else if (nivelEvidencia >= 5 && convergio) {
    nivel = 'B';
  } else if (nivelEvidencia >= 3) {
    nivel = 'C';
  } else {
    nivel = 'D';
  }

  var rStr  = (rStarLider !== undefined) ? (rStarLider * 100).toFixed(1) + '%' : 'N/D';
  var lider = nombreLider || 'El nodo líder';

  var textos = {
    'A': 'Declaración A — Alta certeza. ' + lider + ' es el nodo de mayor peso causal con R* = ' + rStr + '. La evidencia es suficiente para sostener esta distribución en un foro adversarial.',
    'B': 'Declaración B — Certeza moderada. ' + lider + ' lidera con R* = ' + rStr + '. La distribución es probable pero presenta rangos de incertidumbre que deben declararse.',
    'C': 'Declaración C — Incertidumbre estructural. La distribución es preliminar y sensible a variaciones en los parámetros. Se requiere evidencia adicional para sostener la atribución en foro adversarial.',
    'D': 'Declaración D — Máxima incertidumbre. La evidencia actual no permite una distribución confiable. El expediente declara la agenda de investigación requerida.'
  };

  return {
    nivel:       nivel,
    descripcion: textos[nivel],
    rStarLider:  rStarLider,
    nombreLider: nombreLider
  };
};