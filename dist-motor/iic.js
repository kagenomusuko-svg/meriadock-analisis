"use strict";

// ============================================================
// SERIE II — Índice de Integridad Causal e IIC
// Congruencia entre campo declarado y observable
// Referencia: Metrología Causal Vol. II Cap. I·1 Tipo 2
// ============================================================

// Calcula IIC para un nodo de diseño
// declarado: lista de compromisos/protocolos que declaró cumplir
// observado: lista de lo que realmente hizo
// coincidencias: cuántos declarados se verificaron en lo observado
exports.calcularIIC = function(declarado, observado, coincidencias) {
  if (!declarado || declarado.length === 0) return null; // no aplica
  return Math.min(1, coincidencias / declarado.length);
};

// Calcula fraude annona
// R*_i × (1 − α_i) × (1 − IIC)
// El producto de alta centralidad + baja asunción + baja congruencia
exports.calcularFraudeAnnona = function(rStar, alpha, iic) {
  if (iic === null || iic === undefined) return null;
  return rStar * (1 - alpha) * (1 - iic);
};

// Interpreta el IIC en lenguaje del expediente
exports.interpretarIIC = function(iic, nombreNodo) {
  if (iic === null) return nombreNodo + ': IIC no aplicable (nodo sin declaraciones verificables).';
  var pct = (iic * 100).toFixed(1);
  if (iic >= 0.85) return nombreNodo + ': IIC = ' + pct + '% — alta congruencia entre lo declarado y lo ejecutado.';
  if (iic >= 0.60) return nombreNodo + ': IIC = ' + pct + '% — congruencia moderada. Hay brechas entre el diseño declarado y la operación real.';
  if (iic >= 0.30) return nombreNodo + ': IIC = ' + pct + '% — baja congruencia. El nodo de diseño operó de manera significativamente distinta a lo declarado.';
  return nombreNodo + ': IIC = ' + pct + '% — divergencia severa. El campo declarado y el observable son prácticamente distintos.';
};

// Interpreta fraude annona en lenguaje del expediente
exports.interpretarFraudeAnnona = function(fa, nombreNodo) {
  if (fa === null) return nombreNodo + ': fraude annona no calculable (IIC no disponible).';
  var pct = (fa * 100).toFixed(1);
  if (fa > 0.30) return nombreNodo + ': fraude annona = ' + pct + '% — nivel grave. Alta centralidad causal, baja asunción y baja congruencia. Incumplimiento agravado por posición de garante.';
  if (fa > 0.10) return nombreNodo + ': fraude annona = ' + pct + '% — nivel moderado. Hay incumplimiento del deber de posición pero no en grado máximo.';
  return nombreNodo + ': fraude annona = ' + pct + '% — nivel bajo. El nodo operó con congruencia razonable respecto a su posición.';
};

// Calcula Serie II completa para todos los nodos de diseño del grafo
// nodosIIC: array de { id, declarado: [], observado: [], coincidencias: n }
exports.calcularSerieII = function(rStarVector, alphaVector, nodos, nodosIIC) {
  return nodos.map(function(nd, i) {
    var datosIIC = nodosIIC ? nodosIIC.find(function(x) { return x.id === nd.id; }) : null;

    var iic = null;
    var fa = null;

    if (nd.tipo === 'diseno' && datosIIC) {
      iic = exports.calcularIIC(datosIIC.declarado, datosIIC.observado, datosIIC.coincidencias);
      fa = exports.calcularFraudeAnnona(rStarVector[i], alphaVector[i], iic);
    }

    return {
      nodoId: nd.id,
      nombre: nd.nombre,
      tipo: nd.tipo,
      iic: iic,
      fraudeAnnona: fa,
      interpretacionIIC: exports.interpretarIIC(iic, nd.nombre),
      interpretacionFA: exports.interpretarFraudeAnnona(fa, nd.nombre)
    };
  });
};
