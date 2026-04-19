var fs = require('fs');
var c = fs.readFileSync('dist-motor/series.js', 'utf8');

var dtotalFn = `
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

`;

// Insertar antes del exports
c = c.replace('exports.correrAnalisisCompleto', dtotalFn + 'exports.correrAnalisisCompleto');

// Agregar danio como parámetro y calcular D_total en correrAnalisisCompleto
c = c.replace(
  'exports.correrAnalisisCompleto = function(grafoCausal, insumosAlpha, nodosIIC)',
  'exports.correrAnalisisCompleto = function(grafoCausal, insumosAlpha, nodosIIC, danio)'
);

// Agregar al resultado final
c = c.replace(
  'return {\n    rStar:',
  'var dTotalObj = calcularDTotal(danio);\n  var ajusteDebitor = calcularAjusteDebitor(rStarConNeta, dTotalObj);\n\n  return {\n    rStar:'
);

c = c.replace(
  'declaracion: declaracion\n  };',
  'declaracion: declaracion,\n    dTotal: dTotalObj,\n    ajusteDebitor: ajusteDebitor\n  };'
);

fs.writeFileSync('dist-motor/series.js', c);
console.log('Listo');
