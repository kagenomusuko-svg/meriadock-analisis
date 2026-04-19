"use strict";

// ============================================================
// ORQUESTADOR — Las tres series siempre juntas
// Serie I: R*, S, α, Δ
// Serie II: IIC, fraude annona
// Serie III: hipercubo, estabilidad, Declaración robusta
// ============================================================

var grafoMod = require('./grafo');
var rEstrella = require('./r_estrella');
var alphaMod = require('./alpha');
var deltaMod = require('./delta');
var derivados = require('./derivados');
var iicMod = require('./iic');
var hipercubo = require('./hipercubo');


// ─── D_TOTAL Y AJUSTE DEBITOR ────────────────────────────────
function calcularDTotal(danio) {
  if (!danio) return null;

  var tInvertido = danio.tInvertido ? (danio.tInvertido.monto || 0) : 0;
  var tImpedido  = danio.tImpedido  ? (danio.tImpedido.monto  || 0) : 0;
  var tTray      = 0;

  // ΔT_trayectoria: si aplica y hay monto estimado, usarlo
  // si hay narrativa pero no monto, estimar como 30% de (tInvertido + tImpedido)
  if (danio.tTrayectoria && danio.tTrayectoria.aplica) {
    if (danio.tTrayectoria.montoEstimado) {
      tTray = danio.tTrayectoria.montoEstimado;
    } else if (danio.tTrayectoria.narrativa) {
      tTray = (tInvertido + tImpedido) * 0.30;
      danio.tTrayectoria._estimado = true;
    }
  }

  var dTotal     = tInvertido + tImpedido + tTray;
  var dTotalMin  = tInvertido;
  var dTotalConservador = tInvertido + tImpedido;

  return {
    tInvertido:  { monto: tInvertido,  descripcion: danio.tInvertido?.descripcion  || '', tieneDocumentos: danio.tInvertido?.tieneDocumentos || false, nivelEvidencia: danio.tInvertido?.tieneDocumentos ? 'E5' : 'E3' },
    tImpedido:   { monto: tImpedido,   descripcion: danio.tImpedido?.descripcion   || '', esEstimacion: danio.tImpedido?.esEstimacion || true,  nivelEvidencia: danio.tImpedido?.esEstimacion  ? 'E3' : 'E5' },
    tTrayectoria:{ monto: tTray,       descripcion: danio.tTrayectoria?.narrativa  || '', estimado: danio.tTrayectoria?._estimado || false, nivelEvidencia: 'E3', aplica: danio.tTrayectoria?.aplica || false },
    dTotal,
    dTotalMin,
    dTotalConservador,
    pendiente: dTotal === 0
  };
}

function calcularAjusteDebitor(rStar, dTotalObj) {
  if (!dTotalObj || dTotalObj.pendiente) return null;
  return rStar
    .filter(function(r) { return r.valor > 0; })
    .map(function(r) {
      return {
        nodo:        r.nodo,
        rStar:       r.valor,
        adMin:       parseFloat((r.valor * dTotalObj.dTotalMin).toFixed(2)),
        adCentral:   parseFloat((r.valor * dTotalObj.dTotal).toFixed(2)),
        adConservador: parseFloat((r.valor * dTotalObj.dTotalConservador).toFixed(2))
      };
    });
}

exports.correrAnalisisCompleto = function(grafoCausal, insumosAlpha, nodosIIC, danio) {
  var nodos = grafoCausal.nodos;
  var aristas = grafoCausal.aristas;

  // ─── SERIE I ────────────────────────────────────────────
  var W = grafoMod.construirMatrizW(grafoCausal);
  var Wpert = grafoMod.pertrubarMatriz(W);
  var resultadoR = rEstrella.calcularRStar(Wpert);
  var rVec = resultadoR.vector;

  // Excluir nodo final del vector R* y renormalizar
  // El sumidero absorbe todo el flujo por diseño — no es un nodo causal
  var indiceFinal = nodos.findIndex(function(nd) { return nd.tipo === "final"; });
  var rVecAjustado = rVec.map(function(r, i) { return i === indiceFinal ? 0 : r; });
  var sumaAjustada = rVecAjustado.reduce(function(s, r) { return s + r; }, 0);
  rVec = sumaAjustada > 0 ? rVecAjustado.map(function(r) { return r / sumaAjustada; }) : rVecAjustado;

  // S por nodo (desde Hijo dominante)
  var sVec = nodos.map(function(nd, i) {
    if (nd.tipo === 'final') return 0;
    var hijo = nd.hijoDominante || 'anteros';
    var phi1 = require('./phi1');
    return phi1.RANGOS_S[hijo] ? phi1.RANGOS_S[hijo].midpoint : 0.50;
  });

  // R*_neta
  var rNetaVec = rVec.map(function(r, i) { return derivados.calcularRStarNeta(r, sVec[i]); });

  // α por nodo
  var alphaVec = nodos.map(function(nd, i) {
    if (nd.tipo === 'final') return 0;
    var ins = insumosAlpha ? insumosAlpha.find(function(x) { return x.id === nd.id; }) : null;
    if (!ins) return alphaMod.calcularAlpha({ integrado: false, nDoc: 0, nivelEvidencia: 0, nDom: 0, nI: 1 });
    return alphaMod.calcularAlpha(ins);
  });

  // Δ por nodo
  var deltaVec = nodos.map(function(nd, i) {
    if (nd.tipo === 'final') return null;
    return deltaMod.calcularDelta(rVec[i], alphaVec[i]);
  });

  // ─── SERIE II ───────────────────────────────────────────
  var serieII = iicMod.calcularSerieII(rVec, alphaVec, nodos, nodosIIC);

  // ─── SERIE III ──────────────────────────────────────────
  var estabilidad = hipercubo.analizarEstabilidad(grafoCausal);

  // Nodo líder (excluye nodo final)
  var nodosFiltrados = nodos
    .map(function(nd, i) { return { nd: nd, r: rVec[i], i: i }; })
    .filter(function(x) { return x.nd.tipo !== 'final'; });
  var lider = nodosFiltrados.reduce(function(max, x) { return x.r > max.r ? x : max; }, nodosFiltrados[0]);

  // Declaración final — basada en estabilidad real del hipercubo
  var declaracion = {
    nivel: estabilidad.nivelDeclaracion,
    pctEstabilidad: estabilidad.pctEstabilidad,
    totalVertices: estabilidad.totalVertices,
    exhaustivo: estabilidad.exhaustivo,
    rankingBase: estabilidad.rankingBase,
    nodoLider: lider.nd.nombre,
    rStarLider: lider.r,
    descripcion: generarDescripcionDeclaracion(
      estabilidad.nivelDeclaracion,
      estabilidad.pctEstabilidad,
      lider.nd.nombre,
      lider.r,
      estabilidad.exhaustivo,
      estabilidad.totalVertices
    )
  };

  var dTotalObj = calcularDTotal(danio);
  var ajusteDebitor = calcularAjusteDebitor(
    nodos.map(function(nd,i){ return {nodo:nd.nombre, valor:rVec[i]}; }),
    dTotalObj
  );

  return {
    // Serie I
    rStar: nodos.map(function(nd, i) { return { nodo: nd.nombre, valor: rVec[i], neta: rNetaVec[i] }; }),
    alpha: nodos.map(function(nd, i) { return { nodo: nd.nombre, valor: alphaVec[i] }; }),
    delta: nodos.map(function(nd, i) { return { nodo: nd.nombre, resultado: deltaVec[i] }; }),
    convergencia: { convergio: resultadoR.convergio, iteraciones: resultadoR.iteraciones },
    // Serie II
    serieII: serieII,
    // Serie III
    estabilidad: estabilidad,
    declaracion: declaracion,
    dTotal: dTotalObj,
    ajusteDebitor: ajusteDebitor
  };
};

function generarDescripcionDeclaracion(nivel, pct, nombreLider, rLider, exhaustivo, total) {
  var metodo = exhaustivo ? 'análisis exhaustivo de ' + total + ' combinaciones' : 'muestreo de ' + total + ' puntos';
  var pctStr = pct.toFixed(1);
  var rStr = (rLider * 100).toFixed(1);

  if (nivel === 'A') {
    return 'Declaración A — Alta certeza. ' + nombreLider + ' es el nodo de mayor peso causal con R* = ' + rStr + '%. ' +
      'El ranking se mantiene estable en ' + pctStr + '% del espacio de parámetros plausibles (' + metodo + '). ' +
      'La distribución resiste impugnación adversarial dentro del rango de evidencia declarado.';
  }
  if (nivel === 'B') {
    return 'Declaración B — Certeza moderada. ' + nombreLider + ' lidera con R* = ' + rStr + '%. ' +
      'El ranking es estable en ' + pctStr + '% de las combinaciones (' + metodo + '). ' +
      'Hay combinaciones minoritarias donde el ranking varía — ver mapa de sensibilidad para agenda de evidencia adicional.';
  }
  if (nivel === 'C') {
    return 'Declaración C — Incertidumbre estructural. El ranking es estable solo en ' + pctStr + '% de las combinaciones (' + metodo + '). ' +
      'El análisis produce una distribución preliminar que no resiste impugnación adversarial con la evidencia actual. ' +
      'Ver mapa de sensibilidad para identificar las aristas que requieren mayor evidencia.';
  }
  return 'Declaración D — Máxima incertidumbre. El ranking es estable en solo ' + pctStr + '% de las combinaciones (' + metodo + '). ' +
    'No hay distribución confiable con la evidencia actual. El expediente declara la agenda de investigación requerida.';
}
