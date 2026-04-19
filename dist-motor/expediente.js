"use strict";

var LOGO = require('./logo_b64');

exports.generarHTML = function(resultado, grafoCausal, metadatos) {
  var fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  var folio   = metadatos.folio  || ('EP-' + Date.now());
  var titulo  = metadatos.titulo || 'Análisis Causal';
  return [
    cabecera(titulo, folio, fecha),
    seccion1(grafoCausal, resultado),
    seccion2(resultado, grafoCausal),
    seccion3(resultado, grafoCausal),
    seccion4(resultado),
    seccion5(resultado, grafoCausal, metadatos),
    seccion6(resultado),
    deslinde(folio, fecha),
    glosario(),
    '</body></html>'
  ].join('\n');
};

function cabecera(titulo, folio, fecha) {
  var css = [
    '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}',
    'body{font-family:"Inter",sans-serif;font-size:10pt;color:#1a1a1a;background:#fff;line-height:1.6}',
    'h2{font-size:12pt;font-weight:600;color:#1E4C45;border-bottom:2px solid #1E4C45;padding-bottom:6px;margin:28px 0 14px}',
    'h3{font-size:10pt;font-weight:600;margin:16px 0 8px;color:#2d2d2d}',
    'p{margin-bottom:8px}',
    '.seccion{margin:0 0 24px;padding:0 0 16px;border-bottom:1px solid #e0e0e0}',
    'table{width:100%;border-collapse:collapse;margin:12px 0;font-size:9pt}',
    'th{background:#1E4C45;color:#fff;padding:6px 10px;text-align:left;font-weight:600;font-size:8.5pt}',
    'td{padding:5px 10px;border-bottom:1px solid #e8e8e8;vertical-align:top}',
    'tr:nth-child(even) td{background:#f8f9fa}',
    '.matriz{font-family:monospace;font-size:8pt;background:#f4f6f4;padding:12px;border-radius:4px;margin:10px 0;white-space:pre;overflow-x:auto}',
    '.declaracion-box{border:2px solid #1E4C45;border-radius:6px;padding:16px 20px;margin:16px 0;background:#f0f5f4}',
    '.declaracion-nivel{font-size:20pt;font-weight:700;color:#1E4C45;display:inline-block;margin-right:12px}',
    '.declaracion-texto{font-size:9.5pt;line-height:1.7}',
    '.badge{display:inline-block;padding:2px 8px;border-radius:3px;font-size:8pt;font-weight:600}',
    '.badge-brecha{background:#fde8e8;color:#c0392b}',
    '.badge-equilibrio{background:#e8f5e9;color:#27ae60}',
    '.badge-sobreasuncion{background:#fff3cd;color:#856404}',
    '.badge-grave{background:#fde8e8;color:#c0392b}',
    '.badge-moderado{background:#fff3cd;color:#856404}',
    '.badge-bajo{background:#e8f5e9;color:#27ae60}',
    '.nota{font-size:8.5pt;color:#666;font-style:italic;margin:8px 0;padding:8px 12px;background:#fafafa;border-left:3px solid #ccc}',
    '.deslinde{font-size:7.5pt;color:#888;text-align:center;line-height:1.5;padding:12px 0;border-top:1px solid #e0e0e0;margin-top:16px}',
    '.pie-pagina{text-align:center;font-size:8pt;color:#999;margin-top:8px}',
    '.highlight{color:#1E4C45;font-weight:600}',
    '.sensibilidad-critica{color:#c0392b;font-weight:600}',
    '@media print{body{font-size:9pt}@page{margin:2cm 2.5cm;size:A4}h2{page-break-after:avoid}table{page-break-inside:avoid}.seccion{page-break-inside:avoid}.declaracion-box{page-break-inside:avoid}.salto-pagina{page-break-before:always}}'
  ].join('\n');

  var enc =
    '<table style="font-family:Georgia,serif;color:#2f2f2f;margin:0 auto;width:100%" cellspacing="0" cellpadding="0"><tbody><tr>' +
    '<td style="vertical-align:middle;padding-right:20px;width:100px">' +
    '<img style="display:block;filter:drop-shadow(2px 3px 3px rgba(120,120,120,0.45))" src="' + LOGO + '" width="90"/>' +
    '</td>' +
    '<td style="text-align:center">' +
    '<div style="font-family:\'Times New Roman\',serif;font-size:14px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#1f7a4f;white-space:nowrap;margin-bottom:3px">Centro Multidisciplinario Meriadock</div>' +
    '<table style="margin:2px 0 3px 0;border-collapse:collapse" width="100%" cellspacing="0" cellpadding="0"><tbody><tr>' +
    '<td style="border-top:1px solid #1f7a4f;font-size:0;line-height:0">&nbsp;</td>' +
    '<td style="width:20px;font-size:0;line-height:0">&nbsp;</td>' +
    '<td style="border-top:1px solid #1f7a4f;font-size:0;line-height:0">&nbsp;</td>' +
    '</tr></tbody></table>' +
    '<div style="font-size:10px;color:#444;margin-top:1px;line-height:1.2">Formaci\u00f3n y Asesor\u00eda</div>' +
    '<div style="font-size:10px;color:#555;line-height:1.2">CLUNI CMM25080811X9X</div>' +
    '<div style="margin-top:6px;font-size:8px;font-style:italic;color:#1f7a4f;line-height:1.3">\u201cLa fuerza interior nos impulsa, un peque\u00f1o apoyo de los dem\u00e1s nos bendice\u201d</div>' +
    '</td></tr></tbody></table>\n' +
    '<div style="text-align:center;margin-top:16px;padding-top:12px;border-top:2px solid #1f7a4f">' +
    '<div style="font-size:15pt;font-weight:700;color:#1a1a1a;margin-bottom:8px">Expediente de An\u00e1lisis Causal</div>' +
    '<div style="font-size:13pt;font-weight:600;color:#1E4C45;margin-bottom:10px">' + titulo + '</div>' +
    '<div style="font-size:9pt;color:#555;display:flex;justify-content:center;gap:32px">' +
    '<span><strong>Folio:</strong> ' + folio + '</span>' +
    '<span><strong>Fecha:</strong> ' + fecha + '</span>' +
    '<span><strong>Instrumento:</strong> M\u00e9todo Prometeo \u00b7 Tres Series</span>' +
    '</div></div>\n';

  return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">' +
    '<title>Expediente ' + folio + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">' +
    '<style>' + css + '</style></head><body>' +
    '<script>window.onload=function(){window.print();}<\/script>\n' + enc;
}

function tipoLabel(t) {
  return t==='diseno'?'Diseño':t==='ejecucion'?'Ejecución':t==='final'?'Final':t;
}

function matrizW(grafoCausal) {
  var nodos    = grafoCausal.nodos;
  var grafoMod = require('./grafo');
  var W        = grafoMod.construirMatrizW(grafoCausal);
  var header   = '         ' + nodos.map(function(n){ return n.nombre.substring(0,9).padEnd(10); }).join('');
  var filas    = W.map(function(fila, i){
    return nodos[i].nombre.substring(0,8).padEnd(9) + fila.map(function(v){ return v.toFixed(4).padEnd(10); }).join('');
  });
  return header + '\n' + filas.join('\n');
}

function seccion1(grafoCausal, resultado) {
  var nodos   = grafoCausal.nodos;
  var aristas = grafoCausal.aristas;

  var filasN = nodos.map(function(nd) {
    var r = resultado.rStar.find(function(x){ return x.nodo === nd.nombre; });
    return '<tr><td>' + nd.nombre + '</td><td>' + tipoLabel(nd.tipo) + '</td><td>' + (nd.descripcion||'—') + '</td>' +
      '<td>' + (function(h){ var m={fobos:'Presión de consecuencias',deimos:'Parálisis estructural',anteros:'Reciprocidad',eros:'Apertura',potos:'Afirmación propia',harmonia:'Integración plena'}; return m[h]||h||'—'; })(nd.hijoDominante) + '</td>' +
      '<td class="highlight">' + (r ? (r.valor*100).toFixed(2)+'%' : '—') + '</td></tr>';
  }).join('');

  var filasA = aristas.map(function(a) {
    var nOrigen = grafoCausal.nodos.find(function(n){ return n.id === a.origen; });
    var nDestino = grafoCausal.nodos.find(function(n){ return n.id === a.destino; });
    return '<tr><td>' + (nOrigen ? nOrigen.nombre : a.origen) + '</td><td>→</td><td>' + (nDestino ? nDestino.nombre : a.destino) + '</td>' +
      '<td>[' + a.pesoMin + ', ' + a.pesoMax + ']</td>' +
      '<td>' + ((a.pesoMin+a.pesoMax)/2).toFixed(3) + '</td>' +
      '<td>E' + a.nivelEvidencia + '</td>' +
      '<td>' + (a.descripcionEvidencia||'—') + '</td></tr>';
  }).join('');

  return '<div class="seccion">' +
    '<h2>Secci\u00f3n 1 \u00b7 Hoja de Calibraci\u00f3n del Grafo G = (N, E, W)</h2>' +
    '<h3>1.1 Nodos del sistema causal</h3>' +
    '<table><thead><tr><th>Nodo</th><th>Tipo</th><th>Descripci\u00f3n</th><th>Modo de actuaci\u00f3n</th><th>R*</th></tr></thead><tbody>' + filasN + '</tbody></table>' +
    '<h3>1.2 Aristas con rangos de peso y nivel de evidencia</h3>' +
    '<div class="nota">E0 = sin evidencia \u00b7 E8 = evidencia documental m\u00faltiple verificada. El midpoint es el valor de c\u00e1lculo para Serie I.</div>' +
    '<table><thead><tr><th>Origen</th><th></th><th>Destino</th><th>Rango [a, b]</th><th>Midpoint</th><th>Nivel</th><th>Evidencia</th></tr></thead><tbody>' + filasA + '</tbody></table>' +
    '<h3>1.3 Matriz W estoc\u00e1stica (midpoints normalizados por fila)</h3>' +
    '<div class="nota">La suma de cada fila activa es 1.00. El nodo final (sumidero) no distribuye peso.</div>' +
    '<div class="matriz">' + matrizW(grafoCausal) + '</div>' +
    '</div>\n';
}

function seccion2(resultado, grafoCausal) {
  var nodos = grafoCausal.nodos;
  var conv  = resultado.convergencia;

  var filasR = resultado.rStar.filter(function(r){
    var nd = nodos.find(function(n){ return n.nombre === r.nodo; });
    return nd && nd.tipo !== 'final';
  }).map(function(r) {
    var a = resultado.alpha.find(function(x){ return x.nodo === r.nodo; });
    var d = resultado.delta.find(function(x){ return x.nodo === r.nodo; });
    var signo = d && d.resultado ? d.resultado.signo : '—';
    return '<tr>' +
      '<td class="highlight">' + r.nodo + '</td>' +
      '<td class="highlight">' + (r.valor*100).toFixed(2) + '%</td>' +
      '<td>' + (r.neta*100).toFixed(2) + '%</td>' +
      '<td>' + (a ? (a.valor*100).toFixed(1)+'%' : '—') + '</td>' +
      '<td>' + (d && d.resultado ? d.resultado.valor.toFixed(3) : '—') + '</td>' +
      '<td><span class="badge badge-' + signo + '">' + signo + '</span></td></tr>';
  }).join('');

  var filasIIC = resultado.serieII.filter(function(n){ return n.iic !== null; }).map(function(n) {
    var faGrav = n.fraudeAnnona > 0.30 ? 'grave' : n.fraudeAnnona > 0.10 ? 'moderado' : 'bajo';
    return '<tr><td>' + n.nombre + '</td>' +
      '<td>' + (n.iic*100).toFixed(1) + '%</td>' +
      '<td>' + n.interpretacionIIC + '</td>' +
      '<td>' + (n.fraudeAnnona !== null ? (n.fraudeAnnona*100).toFixed(2)+'%' : '—') + '</td>' +
      '<td><span class="badge badge-' + faGrav + '">' + faGrav + '</span></td></tr>';
  }).join('');

  var serieIISec = filasIIC.length > 0
    ? '<h3>2.3 Serie II \u2014 \u00cdndice de Integridad Causal (IIC) y Fraude Annona</h3>' +
      '<div class="nota">IIC = coincidencias / total declarado. Fraude annona = R* \u00d7 (1\u2212\u03b1) \u00d7 (1\u2212IIC). Solo aplica a nodos de tipo dise\u00f1o.</div>' +
      '<table><thead><tr><th>Nodo</th><th>IIC</th><th>Interpretaci\u00f3n</th><th>Fraude annona</th><th>Nivel</th></tr></thead><tbody>' + filasIIC + '</tbody></table>'
    : '<h3>2.3 Serie II \u2014 IIC y Fraude Annona</h3><p class="nota">No hay nodos de dise\u00f1o con declaraciones verificables. Serie II no aplica.</p>';

  var estab = resultado.estabilidad;
  var metodoBadge = estab.exhaustivo ? '<span class="badge badge-bajo">exhaustivo</span>' : '<span class="badge badge-moderado">muestral</span>';
  var filasS = estab.sensibilidad.map(function(s) {
    return (function(){ var nO = grafoCausal.nodos.find(function(n){ return n.id === s.origen; }); var nD = grafoCausal.nodos.find(function(n){ return n.id === s.destino; }); return '<tr><td>' + (nO?nO.nombre:s.origen) + ' \u2192 ' + (nD?nD.nombre:s.destino) + '</td>'; })() +
      '<td>[' + s.rango[0] + ', ' + s.rango[1] + ']</td>' +
      '<td>' + s.amplitud.toFixed(3) + '</td>' +
      '<td>' + (s.impactoEnInestabilidad*100).toFixed(1) + '%</td>' +
      '<td>' + (s.esCritica ? '<span class="sensibilidad-critica">\u26a0 cr\u00edtica</span>' : 'estable') + '</td></tr>';
  }).join('');

  var decl  = resultado.declaracion;
  var color = { A:'#1E4C45', B:'#2980b9', C:'#e67e22', D:'#c0392b' }[decl.nivel] || '#1E4C45';

  return '<div class="seccion salto-pagina">' +
    '<h2>Secci\u00f3n 2 \u00b7 C\u00e1lculo R*, \u03b1, \u0394 \u2014 Series I, II y III</h2>' +
    '<h3>2.1 Convergencia del m\u00e9todo de potencias</h3>' +
    '<p>Convergencia alcanzada en <strong>' + conv.iteraciones + ' iteraciones</strong>. ' +
    'Estado: <strong>' + (conv.convergio ? 'convergido' : 'no convergido \u2014 revisar grafo') + '</strong>. ' +
    'Vector renormalizado excluyendo el nodo sumidero.</p>' +
    '<h3>2.2 Serie I \u2014 Vector R*, R*_neta, \u03b1 y \u0394 por nodo</h3>' +
    '<div class="nota">R*_neta = R* \u00d7 (1\u2212S). \u0394 = R* \u2212 \u03b1. \u0394 &gt; 0 (brecha): caus\u00f3 m\u00e1s de lo que asumi\u00f3. \u0394 &lt; 0 (sobreasunci\u00f3n): asumi\u00f3 m\u00e1s de lo que caus\u00f3.</div>' +
    '<table><thead><tr><th>Nodo</th><th>R*</th><th>R*_neta</th><th>\u03b1</th><th>\u0394</th><th>Diagn\u00f3stico</th></tr></thead><tbody>' + filasR + '</tbody></table>' +
    serieIISec +
    '<h3>2.4 Serie III \u2014 An\u00e1lisis de estabilidad del ranking \u03c3(R*)</h3>' +
    '<div class="nota">El hipercubo eval\u00faa todas las combinaciones de pesos dentro de los rangos [a_ij, b_ij]. \u2265 90% \u2192 Declaraci\u00f3n A. \u2265 70% \u2192 B. \u2265 40% \u2192 C. &lt; 40% \u2192 D.</div>' +
    '<p><strong>V\u00e9rtices evaluados:</strong> ' + estab.totalVertices + ' ' + metodoBadge + ' \u00b7 ' +
    '<strong>Ranking base:</strong> ' + estab.rankingBase.join(' &gt; ') + ' \u00b7 ' +
    '<strong>Estabilidad:</strong> <span class="highlight">' + estab.pctEstabilidad.toFixed(1) + '%</span></p>' +
    '<table><thead><tr><th>Arista</th><th>Rango</th><th>Amplitud</th><th>Impacto en inestabilidad</th><th>Estado</th></tr></thead><tbody>' + filasS + '</tbody></table>' +
    '<div class="declaracion-box" style="border-color:' + color + '">' +
    '<span class="declaracion-nivel" style="color:' + color + '">Declaraci\u00f3n ' + decl.nivel + '</span>' +
    '<span class="declaracion-texto">' + decl.descripcion + '</span></div>' +
    '</div>\n';
}

function seccion3(resultado, grafoCausal) {
  var nodosH = grafoCausal.nodos.filter(function(nd){ return nd.tipo !== 'final' && nd.hijoDominante; });
  if (!nodosH.length) {
    return '<div class="seccion"><h2>Secci\u00f3n 3 \u00b7 DI-ECO + SDO</h2>' +
      '<p class="nota">No hay nodos humanos con localizaci\u00f3n ontol\u00f3gica. Secci\u00f3n no aplicable.</p></div>\n';
  }
  var modos = { fobos:'Presión de consecuencias', deimos:'Parálisis estructural', anteros:'Reciprocidad', eros:'Apertura', potos:'Afirmación propia', harmonia:'Integración plena' };
  var filas = nodosH.map(function(nd) {
    var phi1  = require('./phi1');
    var hijo  = nd.hijoDominante || 'anteros';
    var rango = phi1.RANGOS_S[hijo] || { min:0, max:1, midpoint:0.5 };
    return '<tr><td class="highlight">' + nd.nombre + '</td><td>' + nd.tipo + '</td>' +
      '<td>' + (modos[hijo]||hijo) + '</td>' +
      '<td>[' + rango.min + ', ' + rango.max + '] midpoint ' + rango.midpoint + '</td>' +
      '<td>' + (nd.codigoSDO||'Pendiente de ECO presencial') + '</td>' +
      '<td>' + (nd.nivelEP||'EP-2 (inferido desde expediente)') + '</td></tr>';
  }).join('');
  return '<div class="seccion salto-pagina">' +
    '<h2>Secci\u00f3n 3 \u00b7 Localizaci\u00f3n ontol\u00f3gica</h2>' +
    '<div class="nota">S alto (cerca de 1.00): el contexto explica la mayor parte del acto \u2014 cualquier persona en esa posici\u00f3n habr\u00eda actuado igual. S bajo (cerca de 0.00): la actuaci\u00f3n es propia e idiosincr\u00e1tica. El perfil requiere entrevista presencial para confirmaci\u00f3n en niveles EP-1.</div>' +
    '<table><thead><tr><th>Nodo</th><th>Tipo</th><th>Modo de actuaci\u00f3n</th><th>Sustituibilidad (S)</th><th>Perfil SDO</th><th>Nivel EP</th></tr></thead><tbody>' + filas + '</tbody></table>' +
    '</div>\n';
}

function seccion4(resultado) {
  var ds = resultado.delta.filter(function(d){ return d.resultado && Math.abs(d.resultado.valor) > 0.10; });
  if (!ds.length) {
    return '<div class="seccion"><h2>Secci\u00f3n 4 \u00b7 Acompa\u00f1amiento ontol\u00f3gico</h2>' +
      '<p class="nota">No hay d\u00e9ficit de asunci\u00f3n significativo (|\u0394| &gt; 0.10). HISTOS no aplica.</p></div>\n';
  }
  var filas = ds.map(function(d) {
    var r = d.resultado;
    var t = r.signo === 'brecha'
      ? 'El nodo caus\u00f3 m\u00e1s de lo que asumi\u00f3 (\u0394 = +' + r.valor.toFixed(3) + '). Histos facilita la integraci\u00f3n del acto en I(t). El Eje E del SDO es el punto de entrada.'
      : 'El nodo asumi\u00f3 m\u00e1s de lo que caus\u00f3 (\u0394 = ' + r.valor.toFixed(3) + '). Riesgo de chivo expiatorio \u2014 verificar completitud del grafo antes de intervenir.';
    return '<tr><td>' + d.nodo + '</td><td>' + r.valor.toFixed(3) + '</td>' +
      '<td><span class="badge badge-' + r.signo + '">' + r.signo + '</span></td><td>' + t + '</td></tr>';
  }).join('');
  return '<div class="seccion">' +
    '<h2>Secci\u00f3n 4 \u00b7 HISTOS \u2014 Protocolo de Acompa\u00f1amiento Ontol\u00f3gico</h2>' +
    '<div class="nota">Histos opera cuando |\u0394| &gt; 0.10. Las orientaciones son principios de intervenci\u00f3n \u2014 no el proceso completo.</div>' +
    '<table><thead><tr><th>Nodo</th><th>\u0394</th><th>Diagn\u00f3stico</th><th>Orientaci\u00f3n</th></tr></thead><tbody>' + filas + '</tbody></table>' +
    '</div>\n';
}

function seccion5(resultado, grafoCausal, metadatos) {
  var decl  = resultado.declaracion;
  var lider = resultado.rStar.filter(function(r){
    var nd = grafoCausal.nodos.find(function(n){ return n.nombre === r.nodo; });
    return nd && nd.tipo !== 'final';
  }).sort(function(a,b){ return b.valor - a.valor; })[0];

  var inversion = resultado.delta.some(function(d){ return d.resultado && d.resultado.signo === 'sobreasuncion'; }) &&
                  resultado.delta.some(function(d){ return d.resultado && d.resultado.signo === 'brecha'; });

  var invTxt = inversion
    ? '<p><strong>Inversi\u00f3n causal detectada:</strong> El sistema muestra el patr\u00f3n del Teorema de Inversi\u00f3n Causal: hay nodos con brecha activa y nodos con sobreasunci\u00f3n simult\u00e1neamente.</p>'
    : '';

  var iicNodos = resultado.serieII.filter(function(n){ return n.iic !== null; });
  var iicTxt = iicNodos.length
    ? '<p><strong>Integridad del dise\u00f1o (Serie II):</strong> ' + iicNodos.map(function(n){ return n.interpretacionIIC + ' ' + n.interpretacionFA; }).join(' ') + '</p>'
    : '';

  var narrativa = resultado.rStar.filter(function(r){
    var nd = grafoCausal.nodos.find(function(n){ return n.nombre === r.nodo; });
    return nd && nd.tipo !== 'final';
  }).sort(function(a,b){ return b.valor - a.valor; }).map(function(r) {
    var nd = grafoCausal.nodos.find(function(n){ return n.nombre === r.nodo; });
    var a  = resultado.alpha.find(function(x){ return x.nodo === r.nodo; });
    var d  = resultado.delta.find(function(x){ return x.nodo === r.nodo; });
    return 'El nodo <strong>' + r.nodo + '</strong> (' + (nd?tipoLabel(nd.tipo):'') + ') ' +
      'exhibe R* = ' + (r.valor*100).toFixed(2) + '%, R*_neta = ' + (r.neta*100).toFixed(2) + '%, ' +
      '\u03b1 = ' + (a?(a.valor*100).toFixed(1)+'%':'—') + '. ' +
      (d && d.resultado ? '\u0394 = ' + d.resultado.valor.toFixed(3) + ' (' + d.resultado.signo + ').' : '');
  }).join(' ');

  var tipos = {};
  grafoCausal.nodos.forEach(function(nd){
    if (nd.tipo !== 'final') { if (!tipos[nd.tipo]) tipos[nd.tipo] = []; tipos[nd.tipo].push(nd.nombre); }
  });
  var equiv = { diseno:'Derecho: autor mediato (quien dise\u00f1\u00f3 el sistema que hizo posible el da\u00f1o) \u00b7 Auditor\u00eda: responsable institucional de dise\u00f1o \u00b7 Medicina: factor etiol\u00f3gico estructural',
    ejecucion:'Derecho: ejecutor (quien llev\u00f3 a cabo el acto) \u00b7 Auditor\u00eda: operador del protocolo \u00b7 Medicina: agente causal directo',
    institucional:'Derecho: persona moral \u00b7 Auditor\u00eda: entidad auditada \u00b7 Econom\u00eda: agente estructural',
    normativo:'Derecho: norma habilitante \u00b7 Pol\u00edtica p\u00fablica: marco regulatorio' };
  var filasE = Object.keys(tipos).map(function(t){
    return '<tr><td>' + t + '</td><td>' + tipos[t].join(', ') + '</td><td>' + (equiv[t]||'—') + '</td></tr>';
  }).join('');

  return '<div class="seccion salto-pagina">' +
    '<h2>Secci\u00f3n 5 \u00b7 Declaraci\u00f3n Narrativa</h2>' +
    '<div class="nota">Tono: neutro / forense. El an\u00e1lisis describe la estructura causal \u2014 no determina culpabilidad.</div>' +
    '<h3>5.1 S\u00edntesis del an\u00e1lisis causal</h3>' +
    '<p>El an\u00e1lisis aplic\u00f3 el M\u00e9todo Prometeo en sus tres series sobre un grafo causal de ' +
    grafoCausal.nodos.filter(function(n){ return n.tipo !== 'final'; }).length + ' nodos y ' +
    grafoCausal.aristas.length + ' aristas. El nodo de mayor peso causal es <strong>' +
    lider.nodo + '</strong> con R* = ' + (lider.valor*100).toFixed(2) + '%.</p>' +
    invTxt +
    '<h3>5.2 Distribuci\u00f3n de responsabilidad causal</h3><p>' + narrativa + '</p>' +
    iicTxt +
    '<h3>5.3 Robustez del an\u00e1lisis (Serie III)</h3>' +
    '<p>El ranking \u03c3(R*) se mantuvo estable en el <strong>' + resultado.estabilidad.pctEstabilidad.toFixed(1) +
    '%</strong> del espacio de par\u00e1metros plausibles. Declaraci\u00f3n nivel <strong>' + decl.nivel + '</strong>. ' +
    decl.descripcion + '</p>' +
    '<h3>5.4 Tabla de equivalencias disciplinares (Metrolog\u00eda Causal Vol. II)</h3>' +
    '<div class="nota">La ontolog\u00eda no cambia \u2014 el lenguaje s\u00ed.</div>' +
    '<table><thead><tr><th>Tipo de nodo</th><th>Nodos</th><th>Equivalencias por dominio</th></tr></thead><tbody>' + filasE + '</tbody></table>' +
    '</div>\n';
}





function seccion6(resultado) {
  var dt = resultado.dTotal;
  var ad = resultado.ajusteDebitor;
  var sinDatos = !dt || dt.pendiente;
  if (sinDatos) {
    return '<div class="seccion salto-pagina"><h2>Documento 4 &middot; Ajuste Debitor</h2><div class="nota">No se aportaron componentes del da\u00f1o. Aporte T_invertido, T_impedido y descripci\u00f3n de da\u00f1o a la trayectoria para completar este documento.</div></div>\n';
  }
  function fmt(n) { return n.toLocaleString('es-MX'); }
  var montoT = dt.tTrayectoria.aplica
    ? (fmt(dt.tTrayectoria.monto) + (dt.tTrayectoria.estimado ? ' (estimado)' : ''))
    : 'No aplica';
  var fD =
    '<tr><td>Da\u00f1o directo (T_invertido)</td><td>' + fmt(dt.tInvertido.monto) + '</td><td>' + dt.tInvertido.nivelEvidencia + '</td><td>' + (dt.tInvertido.tieneDocumentos ? 'Documentado' : 'Sin documentos') + '</td><td>' + (dt.tInvertido.descripcion || '\u2014') + '</td></tr>' +
    '<tr><td>Lucro cesante (T_impedido)</td><td>' + fmt(dt.tImpedido.monto) + '</td><td>' + dt.tImpedido.nivelEvidencia + '</td><td>' + (dt.tImpedido.esEstimacion ? 'Estimaci\u00f3n' : 'Documentado') + '</td><td>' + (dt.tImpedido.descripcion || '\u2014') + '</td></tr>' +
    '<tr><td>Da\u00f1o a la trayectoria</td><td>' + montoT + '</td><td>' + dt.tTrayectoria.nivelEvidencia + '</td><td>' + (dt.tTrayectoria.estimado ? 'Estimaci\u00f3n - requiere pericia' : 'Declarado') + '</td><td>' + (dt.tTrayectoria.descripcion || '\u2014') + '</td></tr>';
  var fA = ad ? ad.map(function(a) {
    return '<tr><td class="highlight">' + a.nodo + '</td><td class="highlight">' + (a.rStar * 100).toFixed(2) + '%</td><td>' + fmt(a.adMin) + '</td><td>' + fmt(a.adConservador) + '</td><td>' + fmt(a.adCentral) + '</td></tr>';
  }).join('') : '';
  return '<div class="seccion salto-pagina">' +
    '<h2>Documento 4 \u00b7 D_total y Ajuste Debitor</h2>' +
    '<div class="nota">AD_i = R*_i x D_total. El ajuste debitor es la estimaci\u00f3n causal del da\u00f1o restaurador. No es la condena \u2014 es lo que la causalidad indica antes de cualquier ajuste procesal.</div>' +
    '<h3>Componentes del D_total</h3>' +
    '<table><thead><tr><th>Componente</th><th>Monto</th><th>Evidencia</th><th>Estado</th><th>Descripci\u00f3n</th></tr></thead><tbody>' + fD + '</tbody></table>' +
    '<p><strong>M\u00ednimo:</strong> ' + fmt(dt.dTotalMin) + ' &middot; <strong>Conservador:</strong> ' + fmt(dt.dTotalConservador) + ' &middot; <strong>Completo:</strong> ' + fmt(dt.dTotal) + '</p>' +
    '<h3>Ajuste debitor por nodo</h3>' +
    '<table><thead><tr><th>Nodo</th><th>R*</th><th>AD m\u00ednimo</th><th>AD conservador</th><th>AD completo</th></tr></thead><tbody>' + fA + '</tbody></table>' +
    '</div>\n';
}
function glosario() {
  return '<div class="seccion salto-pagina">' +
    '<h2>Glosario de t\u00e9rminos</h2>' +
    '<div class="nota">Este glosario conecta el lenguaje del an\u00e1lisis con la terminolog\u00eda t\u00e9cnica del sistema formal. No es necesario conocerlo para leer el expediente.</div>' +
    '<table><thead><tr><th>T\u00e9rmino en el documento</th><th>T\u00e9rmino t\u00e9cnico</th><th>Definici\u00f3n operativa</th></tr></thead><tbody>' +
    '<tr><td>Peso causal (R*)</td><td>Vector de responsabilidad causal</td><td>Fracci\u00f3n del resultado total que se explica por la posici\u00f3n del nodo en el sistema. Calculado como el eigenvector dominante de la matriz de pesos W.</td></tr>' +
    '<tr><td>Sustituibilidad (S)</td><td>\u00cdndice de sustituibilidad</td><td>Probabilidad de que cualquier otro actor en la misma posici\u00f3n hubiera producido el mismo resultado. S = 1.00: el resultado es completamente estructural. S = 0.00: el actor es completamente idiosincr\u00e1tico.</td></tr>' +
    '<tr><td>Peso causal neto (R*_neta)</td><td>R* \u00d7 (1\u2212S)</td><td>Fracci\u00f3n del resultado atribuible espec\u00edficamente a este actor, descontando lo que cualquier otro en su lugar tambi\u00e9n habr\u00eda producido.</td></tr>' +
    '<tr><td>Asunci\u00f3n (\u03b1)</td><td>Coeficiente de asunci\u00f3n</td><td>Grado en que el actor reconoci\u00f3 e integr\u00f3 su responsabilidad mediante acciones verificables. No mide intenci\u00f3n: mide conducta documentada.</td></tr>' +
    '<tr><td>D\u00e9ficit (\u0394)</td><td>D\u00e9ficit de asunci\u00f3n</td><td>Brecha entre lo que el actor caus\u00f3 (R*) y lo que ha asumido (\u03b1). \u0394 positivo: caus\u00f3 m\u00e1s de lo que asumi\u00f3. \u0394 negativo: est\u00e1 asumiendo m\u00e1s de lo que caus\u00f3 (posible chivo expiatorio).</td></tr>' +
    '<tr><td>Congruencia institucional (IIC)</td><td>\u00cdndice de Integridad Causal</td><td>Mide cu\u00e1n congruente fue lo que el nodo de dise\u00f1o declar\u00f3 que producir\u00eda con lo que realmente produjo. IIC = 1.00: congruencia total. IIC = 0.00: divergencia total.</td></tr>' +
    '<tr><td>Incumplimiento agravado (Fraude annona)</td><td>Fraude annona</td><td>Producto de alta centralidad causal, baja asunci\u00f3n y baja congruencia. Es la posici\u00f3n m\u00e1s grave que el sistema puede medir en un nodo de dise\u00f1o.</td></tr>' +
    '<tr><td>Robustez del an\u00e1lisis</td><td>Estabilidad del ranking \u03c3(R*)</td><td>Porcentaje de combinaciones de pesos plausibles en las que el ordenamiento de responsabilidad se mantiene igual. Base de la Declaraci\u00f3n A, B, C o D.</td></tr>' +
    '<tr><td>Presión de consecuencias</td><td>Fobos (k=1)</td><td>El actor actuó principalmente por presión del entorno o miedo a consecuencias. Alta sustituibilidad: cualquier otro en esa posición habría actuado igual.</td></tr>' +
    '<tr><td>Parálisis estructural</td><td>Deimos (k=2)</td><td>El actor actuó desde la incertidumbre o el vértigo ante las opciones disponibles. Alta sustituibilidad.</td></tr>' +
    '<tr><td>Reciprocidad</td><td>Anteros (k=3)</td><td>El actor actuó desde la inercia o la costumbre del intercambio. Sustituibilidad media.</td></tr>' +
    '<tr><td>Apertura</td><td>Eros (k=4)</td><td>El actor actuó desde una disposición de apertura genuina hacia el otro. Sustituibilidad media.</td></tr>' +
    '<tr><td>Afirmaci\u00f3n propia</td><td>Pot\u00f3s (k=5)</td><td>El actor actuó desde una afirmación idiosincrática propia. Baja sustituibilidad: pocos otros habrían actuado igual.</td></tr>' +
    '<tr><td>Integraci\u00f3n plena</td><td>Harmon\u00eda (k=6)</td><td>El actor actuó desde una integración completa de su identidad. Sustituibilidad mínima: el acto es genuinamente propio.</td></tr>' +
    '<tr><td>Localización ontológica</td><td>DI-ECO + SDO</td><td>Diagnóstico de la disposición interna desde la que actuó cada actor, y su posición en el sistema de diagnóstico ontológico. Requiere entrevista presencial para confirmación.</td></tr>' +
    '<tr><td>Acompañamiento ontológico</td><td>HISTOS</td><td>Protocolo de trabajo sobre la brecha entre lo que el actor causó y lo que ha integrado como propio. Opera cuando |Δ| > 0.10.</td></tr>' +
    '</tbody></table></div>\n';
}
function deslinde(folio, fecha) {
  return '<div class="deslinde">' +
    '<strong>Deslinde de responsabilidad.</strong> ' +
    'El Centro Multidisciplinario Meriadock Formaci\u00f3n y Asesor\u00eda A.C. se responsabiliza de la correcta aplicaci\u00f3n del M\u00e9todo Prometeo y de la precisi\u00f3n matem\u00e1tica del c\u00e1lculo. No se responsabiliza de los par\u00e1metros aportados por el usuario. Este expediente no constituye peritaje judicial, diagn\u00f3stico cl\u00ednico ni asesor\u00eda legal.' +
    '</div>' +
    '<div class="pie-pagina">Folio ' + folio + ' \u00b7 Generado el ' + fecha + ' \u00b7 M\u00e9todo Prometeo \u00b7 Centro Multidisciplinario Meriadock</div>\n';
}

function pie() { return ''; }
