"use strict";

// ============================================================
// EXPEDIENTE — Generador de HTML del análisis causal
// Referencia visual: expediente_dtotal.html
// ============================================================

var phi1 = require('./phi1');
var LOGO_B64 = require('./logo_b64');

// ─── UTILIDADES ─────────────────────────────────────────────

function pct(v) { return (v * 100).toFixed(2) + '%'; }
function pct1(v) { return (v * 100).toFixed(1) + '%'; }
function fix3(v) { return v.toFixed(3); }
function fix2(v) { return v.toFixed(2); }

var NOMBRES_MODO = {
  fobos:    'Presión de consecuencias',
  deimos:   'Parálisis estructural',
  anteros:  'Precedente / práctica habitual',
  eros:     'Apertura (requiere ECO)',
  potos:    'Convicción propia',
  harmonia: 'Deliberación integrada (requiere ECO)'
};

var EQUIVALENCIAS = {
  diseno:       'Derecho: autor mediato (quien diseñó el sistema que hizo posible el daño) · Auditoría: responsable institucional de diseño · Medicina: factor etiológico estructural',
  ejecucion:    'Derecho: ejecutor (quien llevó a cabo el acto) · Auditoría: operador del protocolo · Medicina: agente causal directo',
  omision:      'Derecho: garante omisivo · Auditoría: control no ejecutado · Medicina: factor permisivo por inacción',
  instrumental: 'Derecho: condición necesaria sin autoría directa · Auditoría: punto de bifurcación del sistema · Medicina: factor facilitador',
  final:        '—'
};

// Traducción de tipos internos a español con acentos
var TIPOS_ES = {
  diseno:       'Diseño',
  ejecucion:    'Ejecución',
  omision:      'Omisión',
  instrumental: 'Instrumental',
  final:        'Final',
  victima:      'Víctima'
};
function tipoES(tipo) {
  return TIPOS_ES[(tipo || '').toLowerCase()] || (tipo ? tipo.charAt(0).toUpperCase() + tipo.slice(1) : '—');
}

function nombreModo(hijoDominante) {
  return NOMBRES_MODO[(hijoDominante || 'anteros').toLowerCase()] || 'Reciprocidad';
}

function rangoS(hijoDominante) {
  var hijo  = (hijoDominante || 'anteros').toLowerCase();
  var rango = phi1.RANGOS_S[hijo] || { min: 0.30, max: 0.70, midpoint: 0.50 };
  return '[' + rango.min.toFixed(2) + ', ' + rango.max.toFixed(2) + '] midpoint ' + rango.midpoint.toFixed(2);
}

function badgeDiag(signo) {
  if (!signo) return '';
  // El motor devuelve: 'brecha', 'sobreasuncion', 'equilibrio' (sin acento, minúscula)
  var s = (signo || '').toLowerCase().replace(/ó/g,'o').replace(/ú/g,'u');
  var cls      = s === 'brecha' ? 'brecha' : s === 'sobreasuncion' ? 'sobreasuncion' : 'equilibrio';
  var etiqueta = s === 'brecha' ? 'Brecha'  : s === 'sobreasuncion' ? 'Sobreasunción' : 'Equilibrio';
  return '<span class="badge badge-' + cls + '">' + etiqueta + '</span>';
}

function colorDeclaracion(nivel) {
  var colores = { A: '#1E4C45', B: '#2e7d32', C: '#e65100', D: '#b71c1c' };
  return colores[nivel] || '#1E4C45';
}

function formatMonto(n) {
  if (n === undefined || n === null) return '—';
  return Number(n).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Construye la representación de texto de la matriz W
function formatearMatriz(grafo, resultado) {
  var nodos = grafo.nodos;
  var n     = nodos.length;

  // Nombres cortos (primeros 8 chars)
  var nombres = nodos.map(function(nd) {
    return nd.nombre.substring(0, 8).padEnd(9);
  });

  // Reconstruir midpoints desde aristas
  var indice = {};
  nodos.forEach(function(nd, i) { indice[nd.id] = i; });

  // Normalización por destino (misma lógica que grafo.js)
  var porDestino = {};
  grafo.aristas.forEach(function(a) {
    if (!porDestino[a.destino]) porDestino[a.destino] = [];
    porDestino[a.destino].push(a);
  });

  var W = Array.from({ length: n }, function() { return new Array(n).fill(0); });
  Object.keys(porDestino).forEach(function(destId) {
    var ars  = porDestino[destId];
    var suma = ars.reduce(function(s, a) { return s + (a.pesoMin + a.pesoMax) / 2; }, 0);
    ars.forEach(function(a) {
      var i = indice[a.origen], j = indice[a.destino];
      if (i !== undefined && j !== undefined && suma > 0)
        W[i][j] = ((a.pesoMin + a.pesoMax) / 2) / suma;
    });
  });

  var header = '         ' + nombres.join('');
  var filas  = nodos.map(function(nd, i) {
    var fila = nombres[i] + W[i].map(function(v) { return v.toFixed(4).padEnd(10); }).join('');
    return fila;
  });

  return header + '\n' + filas.join('\n');
}


// ─── CSS ────────────────────────────────────────────────────

var CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Inter",sans-serif;font-size:10pt;color:#1a1a1a;background:#fff;line-height:1.6}
h2{font-size:12pt;font-weight:600;color:#1E4C45;border-bottom:2px solid #1E4C45;padding-bottom:6px;margin:16px 0 10px}
h3{font-size:10pt;font-weight:600;margin:16px 0 8px;color:#2d2d2d}
p{margin-bottom:8px}
.seccion{margin:0 0 16px;padding:0 0 12px;border-bottom:1px solid #e0e0e0}
table{width:100%;border-collapse:collapse;margin:8px 0;font-size:9pt;page-break-inside:auto}
th{background:#1E4C45;color:#fff;padding:6px 10px;text-align:left;font-weight:600;font-size:8.5pt}
td{padding:5px 10px;border-bottom:1px solid #e8e8e8;vertical-align:top}
tr:nth-child(even) td{background:#f8f9fa}
.matriz{font-family:monospace;font-size:8pt;background:#f4f6f4;padding:12px;border-radius:4px;margin:10px 0;white-space:pre;overflow-x:auto}
.declaracion-box{border:2px solid #1E4C45;border-radius:6px;padding:16px 20px;margin:16px 0;background:#f0f5f4}
.declaracion-nivel{font-size:20pt;font-weight:700;color:#1E4C45;display:inline-block;margin-right:12px}
.declaracion-texto{font-size:9.5pt;line-height:1.7}
.badge{display:inline-block;padding:2px 8px;border-radius:3px;font-size:8pt;font-weight:600}
.badge-brecha{background:#fde8e8;color:#c0392b}
.badge-equilibrio{background:#e8f5e9;color:#27ae60}
.badge-sobreasuncion{background:#fff3cd;color:#856404}
.badge-grave{background:#fde8e8;color:#c0392b}
.badge-moderado{background:#fff3cd;color:#856404}
.badge-bajo{background:#e8f5e9;color:#27ae60}
.badge-critica{background:#fde8e8;color:#c0392b}
.badge-estable{background:#e8f5e9;color:#27ae60}
.nota{background:#f0f5f4;padding:8px 12px;border-left:3px solid #1E4C45;margin:8px 0;font-size:9pt}
.highlight{font-weight:600;color:#1E4C45}
.deslinde{font-size:8pt;color:#666;margin:24px 0 8px;padding-top:12px;border-top:1px solid #e0e0e0}
.pie-pagina{font-size:8pt;color:#999;text-align:center;margin-top:16px}
.salto-pagina{page-break-before:auto}
.advertencia-box{border:1px solid #e65100;border-radius:4px;padding:10px 14px;margin:12px 0;background:#fff8f0;font-size:9pt;color:#e65100}
`;


// ─── SECCIONES ──────────────────────────────────────────────

function seccionHeader(grafo, metadatos) {
  var folio  = metadatos.folio  || 'EP-' + Date.now();
  var fecha  = metadatos.fecha  || new Date().toLocaleDateString('es-MX');
  var titulo = grafo.titulo     || 'Análisis causal';

  return `
<div style="margin:0 0 24px">
  <table style="font-family:'Times New Roman',serif;color:#2f2f2f;width:100%;border-collapse:collapse;margin-bottom:14px" cellspacing="0" cellpadding="0">
    <tr>
      <td style="vertical-align:middle;padding-right:20px;width:110px">
        <img src="${LOGO_B64}" alt="Sello institucional" width="90"
          style="display:block;filter:drop-shadow(2px 3px 3px rgba(120,120,120,0.45))">
      </td>
      <td style="text-align:center">
        <div style="font-family:'Times New Roman',serif;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#1f7a4f;white-space:nowrap;margin-bottom:3px">
          CENTRO MULTIDISCIPLINARIO MERIADOCK
        </div>
        <table width="100%" cellspacing="0" cellpadding="0" style="margin:2px 0 3px 0;border-collapse:collapse">
          <tr>
            <td style="border-top:1px solid #1f7a4f;font-size:0;line-height:0"></td>
            <td style="width:20px;font-size:0;line-height:0"></td>
            <td style="border-top:1px solid #1f7a4f;font-size:0;line-height:0"></td>
          </tr>
        </table>
        <div style="font-size:9px;color:#444;margin-top:1px;line-height:1.2">Formación y Asesoría A.C.</div>
        <div style="font-size:9px;color:#555;line-height:1.2">CLUNI CMM25080811X9X</div>
        <div style="margin-top:5px;font-size:7.5px;font-style:italic;color:#1f7a4f;line-height:1.3">
          &ldquo;La fuerza interior nos impulsa, un pequeño apoyo de los demás nos bendice&rdquo;
        </div>
      </td>
    </tr>
  </table>
  <div style="border-top:2px solid #1E4C45;border-bottom:1px solid #1E4C45;padding:8px 0;margin-bottom:10px;text-align:center">
    <div style="font-size:15pt;font-weight:700;color:#1E4C45;font-family:Georgia,serif">${escH(titulo)}</div>
    <div style="font-size:9pt;color:#555;margin-top:4px;font-family:Georgia,serif">
      Folio: <strong>${escH(folio)}</strong> &nbsp;·&nbsp; ${escH(fecha)} &nbsp;·&nbsp; Método Prometeo · Tres Series
    </div>
  </div>
</div>`;
}

function seccion1(grafo, resultado) {
  var nodos   = grafo.nodos;
  var aristas = grafo.aristas;
  var nActivos = nodos.filter(function(n) { return n.tipo !== 'final'; }).length;

  // Tabla de nodos
  var filasNodos = nodos.map(function(nd, i) {
    var rData = resultado.rStar[i];
    var rVal  = rData ? pct(rData.valor) : '—';
    var modo  = nd.tipo === 'final' ? '—' : nombreModo(nd.hijoDominante);
    var cls   = nd.tipo !== 'final' ? ' class="highlight"' : '';
    var desc  = nd.tipo === 'final' ? '—' : escH(nd.descripcion || '');
    return '<tr><td' + cls + '>' + escH(nd.nombre) + '</td><td>' + escH(tipoES(nd.tipo)) + '</td>' +
      '<td>' + desc + '</td><td>' + escH(modo) + '</td>' +
      '<td' + cls + '>' + rVal + '</td></tr>';
  }).join('');

  // Tabla de aristas
  // Índice id → nombre para resolver los IDs internos del constructor
  var indiceNombres = {};
  nodos.forEach(function(nd) { indiceNombres[nd.id] = nd.nombre; });
  indiceNombres['nodo_final'] = grafo.nodos.find(function(n){ return n.tipo === 'final'; })
    ? grafo.nodos.find(function(n){ return n.tipo === 'final'; }).nombre
    : 'Resultado final';

  var filasAristas = aristas.map(function(a) {
    var mp          = ((a.pesoMin + a.pesoMax) / 2).toFixed(3);
    var nombreOrig  = indiceNombres[a.origen]  || a.origen;
    var nombreDest  = indiceNombres[a.destino] || a.destino;
    return '<tr><td>' + escH(nombreOrig) + '</td><td>→</td><td>' + escH(nombreDest) + '</td>' +
      '<td>[' + a.pesoMin + ', ' + a.pesoMax + ']</td>' +
      '<td>' + mp + '</td>' +
      '<td>E' + (a.nivelEvidencia || 0) + '</td>' +
      '<td>' + escH(a.descripcionEvidencia || '') + '</td></tr>';
  }).join('');

  // Convergencia
  var conv = resultado.convergencia;

  return `
<div class="seccion" style="page-break-before:auto">
<h2>Sección 1 · Hoja de Calibración del Grafo G = (N, E, W)</h2>
<h3>1.1 Nodos del sistema causal</h3>
<table>
  <thead><tr><th>Nodo</th><th>Tipo</th><th>Descripción</th><th>Modo de actuación</th><th>Índice de convergencia</th></tr></thead>
  <tbody>${filasNodos}</tbody>
</table>

<h3>1.2 Aristas con rangos de peso y nivel de evidencia</h3>
<div class="nota">E1 = evidencia directa más fuerte (documento con instrucción explícita) · E8 = evidencia más débil (dicho único sin respaldo) · E0 = arista nula documentada (ausencia demostrada). El midpoint es el valor de cálculo para Serie I.</div>
<table>
  <thead><tr><th>Origen</th><th></th><th>Destino</th><th>Rango [a, b]</th><th>Midpoint</th><th>Nivel</th><th>Evidencia</th></tr></thead>
  <tbody>${filasAristas}</tbody>
</table>

<h3>1.3 Matriz W de pesos (midpoints por arista)</h3>
<div class="nota">W[i][j] = midpoint de la arista i→j. El motor calcula influencia(i) = suma de productos de pesos en todos los caminos de i al nodo final. R*_i = influencia(i) / Σ influencias de todos los actores.</div>
<div class="matriz">${escH(formatearMatriz(grafo, resultado))}</div>
</div>`;
}

function seccion2(grafo, resultado) {
  var nodos   = grafo.nodos;
  var conv    = resultado.convergencia;
  var estab   = resultado.estabilidad;
  var decl    = resultado.declaracion;

  // Serie I
  var filasI = nodos.map(function(nd, i) {
    var rs = resultado.rStar[i];
    var al = resultado.alpha[i];
    var dl = resultado.delta[i];
    if (!rs || nd.tipo === 'final') return '';
    var dVal  = dl.resultado ? fix3(dl.resultado.valor) : '—';
    var signo = dl.resultado ? dl.resultado.signo : '—';
    var sVal  = (rs.s !== undefined && rs.s !== null) ? pct(rs.s) : '—';
    return '<tr><td class="highlight">' + escH(nd.nombre) + '</td>' +
      '<td class="highlight">' + pct(rs.valor) + '</td>' +
      '<td>' + sVal + '</td>' +
      '<td>' + pct(rs.neta) + '</td>' +
      '<td>' + pct(al.valor) + '</td>' +
      '<td>' + dVal + '</td>' +
      '<td>' + badgeDiag(signo ? signo.charAt(0).toUpperCase() + signo.slice(1) : signo) + '</td></tr>';
  }).filter(Boolean).join('');

  // Serie II
  var s2 = resultado.serieII || [];
  var filasII = s2.filter(function(n) { return n.iic !== null; }).map(function(n) {
    var iicPct  = n.iic !== null ? pct1(n.iic) : '—';
    var faPct   = n.fraudeAnnona !== null ? pct1(n.fraudeAnnona) : '—';
    var nivelFA = n.fraudeAnnona !== null
      ? (n.fraudeAnnona > 0.30 ? '<span class="badge badge-grave">grave</span>'
        : n.fraudeAnnona > 0.10 ? '<span class="badge badge-moderado">moderado</span>'
        : '<span class="badge badge-bajo">bajo</span>')
      : '—';
    return '<tr><td>' + escH(n.nombre) + '</td>' +
      '<td>' + iicPct + '</td>' +
      '<td>' + escH(n.interpretacionIIC || '') + '</td>' +
      '<td>' + faPct + '</td>' +
      '<td>' + nivelFA + '</td></tr>';
  }).join('');

  var serieIISec = filasII
    ? '<table><thead><tr><th>Nodo</th><th>IIC</th><th>Interpretación</th><th>Fraude annona</th><th>Nivel</th></tr></thead><tbody>' + filasII + '</tbody></table>'
    : '<p>No hay nodos de diseño con declaraciones verificables. Serie II no aplica.</p>';

  // Serie III
  var rankStr    = (estab.rankingBase || []).join(' > ');
  var metodoStr  = estab.exhaustivo
    ? '<span class="badge badge-bajo">exhaustivo</span>'
    : '<span class="badge badge-moderado">muestral</span>';

  // Índice id → nombre para la tabla del hipercubo
  var idxNombres2 = {};
  grafo.nodos.forEach(function(nd) { idxNombres2[nd.id] = nd.nombre; });
  idxNombres2['nodo_final'] = grafo.nodos.find(function(n){ return n.tipo === 'final'; })
    ? grafo.nodos.find(function(n){ return n.tipo === 'final'; }).nombre
    : 'Resultado final';

  var filasAristas = (estab.sensibilidad || []).map(function(s) {
    var critica    = s.esCritica
      ? '<span class="badge badge-critica">⚠ crítica</span>'
      : '<span class="badge badge-estable">estable</span>';
    var nombreOrig = idxNombres2[s.origen]  || s.origen;
    var nombreDest = idxNombres2[s.destino] || s.destino;
    return '<tr><td>' + escH(nombreOrig) + ' → ' + escH(nombreDest) + '</td>' +
      '<td>[' + s.rango[0] + ', ' + s.rango[1] + ']</td>' +
      '<td>' + s.amplitud.toFixed(3) + '</td>' +
      '<td>' + pct1(s.impactoEnInestabilidad) + '</td>' +
      '<td>' + critica + '</td></tr>';
  }).join('');

  var colorDecl = colorDeclaracion(decl.nivel);
  var declBox = `<div class="declaracion-box" style="border-color:${colorDecl}">
    <span class="declaracion-nivel" style="color:${colorDecl}">Declaración ${escH(decl.nivel)}</span>
    <span class="declaracion-texto">${escH(decl.descripcion)}</span>
  </div>`;

  return `
<div class="seccion" style="page-break-before:auto">
<h2>Sección 2 · Cálculo R*, α, Δ — Series I, II y III</h2>

<h3>2.1 Método de cálculo</h3>
<p>Algoritmo: <strong>Influencia causal total</strong> — suma ponderada de contribuciones de todos los caminos de cada actor al nodo final. Método: ${conv.metodo || 'influencia-causal'}. Iteraciones: ${conv.iteraciones || 0}. R* normalizado sobre nodos activos (excluye nodo sumidero).</p>

<h3>2.2 Serie I — Vector R*, R*_neta, α y Δ por nodo</h3>
<div class="nota">Contribución atribuible = Índice de convergencia × (1−S). Asimetría repercusiva = Índice de convergencia − Condiciones adversas atribuibles. Valor positivo (brecha): convergencia mayor que condiciones adversas. Valor negativo (sobreasunción): condiciones adversas mayores que la convergencia.</div>
<table>
  <thead><tr><th>Nodo</th><th>Índice de convergencia</th><th>Sust. (S)</th><th>Contribución atribuible</th><th>Cond. adversas atrib.</th><th>Asimetría repercusiva</th><th>Diagnóstico</th></tr></thead>
  <tbody>${filasI}</tbody>
</table>

<h3>2.3 Serie II — Índice de Integridad Causal (IIC) y Fraude Annona</h3>
<div class="nota">IIC = coincidencias / total declarado. Fraude annona = R* × (1−α) × (1−IIC). Solo aplica a nodos de tipo diseño.</div>
${serieIISec}

<h3>2.4 Serie III — Análisis de estabilidad del ranking σ(R*)</h3>
<div class="nota">El hipercubo evalúa todas las combinaciones de pesos dentro de los rangos [a_ij, b_ij]. ≥ 90% → Declaración A. ≥ 70% → B. ≥ 40% → C. &lt; 40% → D.</div>
<p><strong>Vértices evaluados:</strong> ${estab.totalVertices} ${metodoStr} · <strong>Ranking base:</strong> ${escH(rankStr)} · <strong>Estabilidad:</strong> <span class="highlight">${pct1(estab.pctEstabilidad / 100)}</span></p>
<table>
  <thead><tr><th>Arista</th><th>Rango</th><th>Amplitud</th><th>Impacto en inestabilidad</th><th>Estado</th></tr></thead>
  <tbody>${filasAristas}</tbody>
</table>
${declBox}
</div>`;
}

function seccion3(grafo, resultado) {
  var nodos = grafo.nodos;

  var filas = nodos.filter(function(nd) { return nd.tipo !== 'final'; }).map(function(nd, i) {
    var rs  = resultado.rStar.find(function(r) { return r.nodo === nd.nombre; });
    var sVal = rs ? rs.s : 0.50;
    // Distribución P(Hijos) si viene del constructor
    // Traducción de hijos a términos accesibles
    var TRAD_HIJOS = {
      fobos:   'Actuó bajo presión de consecuencias',
      deimos:  'Actuó por parálisis o ambigüedad del sistema',
      anteros: 'Siguió precedente o práctica habitual',
      potos:   'Actuó por convicción o iniciativa propia'
    };
    var distStr = '';
    if (nd.dist) {
      var hijos = ['fobos','deimos','anteros','potos'];
      var partes = hijos
        .filter(function(k){ return parseFloat(nd.dist[k]) > 0; })
        .sort(function(a,b){ return parseFloat(nd.dist[b]) - parseFloat(nd.dist[a]); })
        .map(function(k){ return TRAD_HIJOS[k]+' ('+(parseFloat(nd.dist[k])*100).toFixed(0)+'%)'; });
      distStr = partes.join(' · ');
      if (distStr) distStr += ' <em style="color:#9a9080;font-size:8pt">— requiere entrevista para confirmar Eros y Harmonía</em>';
    }
    var perfilStr = distStr || 'Requiere entrevista directa';
    var epNivel   = nd.dist ? 'Alta (evidencia documental)' : 'Media (inferido)';
    return '<tr><td class="highlight">' + escH(nd.nombre) + '</td>' +
      '<td>' + escH(tipoES(nd.tipo)) + '</td>' +
      '<td>' + escH(nombreModo(nd.hijoDominante)) + '</td>' +
      '<td>' + escH(rangoS(nd.hijoDominante)) + ' · S combinado ' + sVal.toFixed(2) + '</td>' +
      '<td>' + perfilStr + '</td>' +
      '<td>' + epNivel + '</td></tr>';
  }).join('');

  return `
<div class="seccion" style="page-break-before:auto">
<h2>Sección 3 · Localización ontológica</h2>
<div class="nota">S alto (cerca de 1.00): el contexto explica la mayor parte del acto — cualquier persona en esa posición habría actuado igual. S bajo (cerca de 0.00): la actuación es propia e idiosincrática. El perfil requiere entrevista presencial para confirmación en niveles EP-1.</div>
<table>
  <thead><tr><th>Nodo</th><th>Tipo</th><th>Modo de actuación</th><th>Sustituibilidad (S)</th><th>Modo de actuación documentado</th><th>Certeza</th></tr></thead>
  <tbody>${filas}</tbody>
</table>
</div>`;
}

function seccion4(grafo, resultado) {
  var nodos = grafo.nodos;

  var filas = nodos.map(function(nd, i) {
    var dl = resultado.delta[i];
    if (!dl || !dl.resultado || Math.abs(dl.resultado.valor) <= 0.10) return '';
    var signo = dl.resultado.signo;
    var dVal  = fix3(dl.resultado.valor);
    var orient = signo === 'brecha'
      ? 'El nodo causó más de lo que asumió (asimetría repercusiva = +' + dVal + '). Histos facilita la integración del acto en I(t). El Eje E del SDO es el punto de entrada.'
      : signo === 'sobreasuncion'
        ? 'El nodo asumió más de lo que causó (asimetría repercusiva = ' + dVal + '). Riesgo de chivo expiatorio — verificar completitud del grafo antes de intervenir.'
        : dl.resultado.accion || '';
    return '<tr><td>' + escH(nd.nombre) + '</td><td>' + dVal + '</td>' +
      '<td>' + badgeDiag(signo) + '</td>' +
      '<td>' + escH(orient) + '</td></tr>';
  }).filter(Boolean).join('');

  if (!filas) {
    filas = '<tr><td colspan="4">No hay nodos con |Δ| &gt; 0.10 en este análisis.</td></tr>';
  }

  return `
<div class="seccion">
<h2>Sección 4 · HISTOS — Protocolo de Acompañamiento Ontológico</h2>
<div class="nota">Histos opera cuando |Δ| &gt; 0.10. Las orientaciones son principios de intervención — no el proceso completo.</div>
<table>
  <thead><tr><th>Nodo</th><th>Asimetría repercusiva</th><th>Diagnóstico</th><th>Orientación</th></tr></thead>
  <tbody>${filas}</tbody>
</table>
</div>`;
}

function seccion5(grafo, resultado) {
  var nodos    = grafo.nodos;
  var decl     = resultado.declaracion;
  var estab    = resultado.estabilidad;
  var nActivos = nodos.filter(function(n) { return n.tipo !== 'final'; }).length;
  var nAristas = grafo.aristas.length;

  // Detectar inversión causal
  var hayBrechas = resultado.delta.some(function(d) { return d.resultado && d.resultado.signo === 'brecha'; });
  var haySobre   = resultado.delta.some(function(d) { return d.resultado && d.resultado.signo === 'sobreasuncion'; });
  var inversionStr = (hayBrechas && haySobre)
    ? '<p><strong>Inversión causal detectada:</strong> El sistema muestra el patrón del Teorema de Inversión Causal: hay nodos con brecha activa y nodos con sobreasunción simultáneamente.</p>'
    : '';

  // Advertencia si nodo líder es ejecución con S alto
  var lider    = resultado.rStar.filter(function(r) { return r.valor > 0; }).sort(function(a,b){ return b.valor-a.valor; })[0];
  var ndLider  = lider ? nodos.find(function(n) { return n.nombre === lider.nodo; }) : null;
  var advStr   = '';
  if (ndLider && ndLider.tipo === 'ejecucion' && lider.s > 0.60) {
    var ndDiseno = nodos.find(function(n) { return n.tipo === 'diseno'; });
    var nombreD  = ndDiseno ? ndDiseno.nombre : 'el nodo de diseño';
    advStr = `<div class="advertencia-box">
      R* = ${pct(lider.valor)} en un nodo de ejecución con sustituibilidad S = ${(lider.s * 100).toFixed(1)}% no indica responsabilidad de diseño. Indica que este nodo es el punto de convergencia de cadenas causales diseñadas por otros. El ${(lider.s * 100).toFixed(1)}% de su peso causal es estructural: cualquier actor en esa posición, bajo las mismas condiciones, habría producido el mismo resultado. El peso causal atribuible específicamente a este actor es contribución atribuible = ${pct(lider.neta)}. El nodo de diseño que construyó esas condiciones es: ${escH(nombreD)}.
    </div>`;
  }

  // Distribución narrativa
  var distTexto = resultado.rStar.filter(function(r) { return r.valor > 0.001; }).map(function(r) {
    var nd  = nodos.find(function(n) { return n.nombre === r.nodo; });
    var al  = resultado.alpha.find(function(a) { return a.nodo === r.nodo; });
    var dl  = resultado.delta.find(function(d) { return d.nodo === r.nodo; });
    var sig = dl && dl.resultado ? dl.resultado.signo : '—';
    return 'El nodo <strong>' + escH(r.nodo) + '</strong> (' + escH(tipoES(nd ? nd.tipo : '')) + ') exhibe índice de convergencia = ' +
      pct(r.valor) + ', contribución atribuible = ' + pct(r.neta) + ', condiciones adversas = ' + pct(al ? al.valor : 0) + '. asimetría repercusiva = ' +
      (dl && dl.resultado ? fix3(dl.resultado.valor) : '—') + ' (' + (sig==='sobreasuncion'?'Sobreasunción':sig==='brecha'?'Brecha':'Equilibrio') + ').';
  }).join(' ');

  // IIC narrativo
  var iicTexto = '';
  var s2con = (resultado.serieII || []).filter(function(n) { return n.iic !== null; });
  if (s2con.length) {
    iicTexto = '<p><strong>Integridad del diseño (Serie II):</strong> ' +
      s2con.map(function(n) {
        return n.interpretacionIIC + ' ' + (n.interpretacionFA || '');
      }).join(' ') + '</p>';
  }

  // Equivalencias por tipo
  var tiposPresentes = {};
  nodos.forEach(function(nd) {
    if (nd.tipo !== 'final' && !tiposPresentes[nd.tipo]) tiposPresentes[nd.tipo] = [];
    if (nd.tipo !== 'final') tiposPresentes[nd.tipo].push(nd.nombre);
  });
  var filasEq = Object.keys(tiposPresentes).map(function(tipo) {
    return '<tr><td>' + escH(tipoES(tipo)) + '</td><td>' + escH(tiposPresentes[tipo].join(', ')) + '</td><td>' + (EQUIVALENCIAS[tipo] || '—') + '</td></tr>';
  }).join('');

  var colorDecl = colorDeclaracion(decl.nivel);

  return `
<div class="seccion" style="page-break-before:auto">
<h2>Sección 5 · Declaración Narrativa</h2>
<div class="nota">Tono: neutro / forense. El análisis describe la estructura causal — no determina culpabilidad.</div>
${advStr}
<h3>5.1 Síntesis del análisis causal</h3>
<p>El análisis aplicó el Método Prometeo en sus tres series sobre un grafo causal de <strong>${nActivos} nodos</strong> y <strong>${nAristas} aristas</strong>. El nodo de mayor peso causal es <strong>${escH(decl.nodoLider)}</strong> con R* = ${pct(decl.rStarLider)}.</p>
${inversionStr}
<h3>5.2 Distribución de responsabilidad causal</h3>
<p>${distTexto}</p>
${iicTexto}
<h3>5.3 Robustez del análisis (Serie III)</h3>
<p>El ranking σ(R*) se mantuvo estable en el <strong>${pct1(estab.pctEstabilidad / 100)}</strong> del espacio de parámetros plausibles. Declaración nivel <strong>${escH(decl.nivel)}</strong>. ${escH(decl.descripcion)}</p>
<h3>5.4 Tabla de equivalencias disciplinares (Metrología Causal Vol. II)</h3>
<div class="nota">La ontología no cambia — el lenguaje sí.</div>
<table>
  <thead><tr><th>Tipo de nodo</th><th>Nodos</th><th>Equivalencias por dominio</th></tr></thead>
  <tbody>${filasEq}</tbody>
</table>
</div>`;
}

function seccionDTotal(resultado, grafo, metadatos) {
  var dt = resultado.dTotal;
  var ad = resultado.ajusteDebitor;

  if (!dt || dt.pendiente) {
    return `
<div class="seccion" style="page-break-before:auto">
<h2>Documento 4 · Ajuste Debitor</h2>
<p>No se aportaron componentes del daño. Aporte T_invertido, T_impedido y descripción de daño a la trayectoria para completar este documento.</p>
</div>`;
  }

  var filasComp = [
    ['Daño directo (T_invertido)',  dt.tInvertido,   dt.tInvertido.tieneDocumentos ? 'Documentado' : 'Estimación'],
    ['Lucro cesante (T_impedido)',  dt.tImpedido,    dt.tImpedido.esEstimacion     ? 'Estimación'  : 'Documentado'],
    ['Daño a la trayectoria',       dt.tTrayectoria, dt.tTrayectoria.aplica ? (dt.tTrayectoria.estimado ? 'Estimación — requiere pericia' : 'Documentado') : 'No aplica']
  ].filter(function(f) { return f[1] && (f[1].monto > 0 || f[1].aplica); }).map(function(f) {
    var comp = f[1];
    return '<tr><td>' + f[0] + '</td>' +
      '<td>' + formatMonto(comp.monto) + '</td>' +
      '<td>' + escH(comp.nivelEvidencia || '—') + '</td>' +
      '<td>' + f[2] + '</td>' +
      '<td>' + escH(comp.descripcion || '') + '</td></tr>';
  }).join('');

  var filasAD = (ad || []).map(function(r) {
    return '<tr><td class="highlight">' + escH(r.nodo) + '</td>' +
      '<td class="highlight">' + pct(r.rStar) + '</td>' +
      '<td>' + formatMonto(r.adMin) + '</td>' +
      '<td>' + formatMonto(r.adConservador) + '</td>' +
      '<td>' + formatMonto(r.adCentral) + '</td></tr>';
  }).join('');

  return `
<div class="seccion" style="page-break-before:auto">
<h2>Documento 4 · D_total y Ajuste Debitor</h2>
<div class="nota">AD_i = R*_i × D_total. El ajuste debitor es la estimación causal del daño restaurador. No es la condena — es lo que la causalidad indica antes de cualquier ajuste procesal.</div>
<h3>Componentes del D_total</h3>
<table>
  <thead><tr><th>Componente</th><th>Monto</th><th>Evidencia</th><th>Estado</th><th>Descripción</th></tr></thead>
  <tbody>${filasComp}</tbody>
</table>
<p><strong>Mínimo:</strong> ${formatMonto(dt.dTotalMin)} &middot; <strong>Conservador:</strong> ${formatMonto(dt.dTotalConservador)} &middot; <strong>Completo:</strong> ${formatMonto(dt.dTotal)}</p>
<h3>Ajuste debitor por nodo</h3>
<table>
  <thead><tr><th>Nodo</th><th>Índice de convergencia</th><th>AD mínimo</th><th>AD conservador</th><th>AD completo</th></tr></thead>
  <tbody>${filasAD}</tbody>
</table>
</div>`;
}

var GLOSARIO = `
<div class="seccion" style="page-break-before:auto"><h2>Glosario de términos</h2>
<div class="nota">Este glosario conecta el lenguaje del análisis con la terminología técnica del sistema formal. No es necesario conocerlo para leer el expediente.</div>
<table><thead><tr><th>Término en el documento</th><th>Término técnico</th><th>Definición operativa</th></tr></thead><tbody>
<tr><td>Índice de convergencia de eventos (R*)</td><td>Vector de responsabilidad causal</td><td>Fracción del resultado total que se explica por la posición del nodo en el sistema. Calculado como la influencia causal total: suma ponderada de todos los caminos del nodo al resultado final.</td></tr>
<tr><td>Índice de sustituibilidad (S)</td><td>Índice de sustituibilidad</td><td>Probabilidad de que cualquier otro actor en la misma posición hubiera producido el mismo resultado. S = 1.00: el resultado es completamente estructural. S = 0.00: el actor es completamente idiosincrático.</td></tr>
<tr><td>Peso causal neto (R*_neta)</td><td>R* × (1−S)</td><td>Fracción del resultado atribuible específicamente a este actor, descontando lo que cualquier otro en su lugar también habría producido.</td></tr>
<tr><td>Condiciones adversas atribuibles (α)</td><td>Coeficiente de asunción</td><td>Consecuencias adversas verificables que el evento produjo sobre el actor — voluntarias o impuestas. No mide intención: mide efecto documentado sobre el actor.</td></tr>
<tr><td>Asimetría repercusiva (Δ)</td><td>Déficit de asunción</td><td>Diferencia entre el índice de convergencia (R*) y las condiciones adversas atribuibles (α). Valor positivo: el actor convergió más de lo que sufrió en consecuencias. Valor negativo: las consecuencias superan su convergencia — posible chivo expiatorio estructural.</td></tr>
<tr><td>Congruencia institucional (IIC)</td><td>Índice de Integridad Causal</td><td>Mide cuán congruente fue lo que el nodo de diseño declaró que produciría con lo que realmente produjo. IIC = 1.00: congruencia total. IIC = 0.00: divergencia total.</td></tr>
<tr><td>Incumplimiento agravado (Fraude annona)</td><td>Fraude annona</td><td>Producto de alta centralidad causal, baja asunción y baja congruencia. Es la posición más grave que el sistema puede medir en un nodo de diseño.</td></tr>
<tr><td>Robustez del análisis</td><td>Estabilidad del ranking σ(R*)</td><td>Porcentaje de combinaciones de pesos plausibles en las que el ordenamiento de responsabilidad se mantiene igual. Base de la Declaración A, B, C o D.</td></tr>
<tr><td>Presión de consecuencias</td><td>Fobos (k=1)</td><td>El actor actuó principalmente por presión del entorno o miedo a consecuencias. Alta sustituibilidad: cualquier otro en esa posición habría actuado igual.</td></tr>
<tr><td>Parálisis estructural</td><td>Deimos (k=2)</td><td>El actor actuó desde la incertidumbre o el vértigo ante las opciones disponibles. Alta sustituibilidad.</td></tr>
<tr><td>Reciprocidad</td><td>Anteros (k=3)</td><td>El actor actuó desde la inercia o la costumbre del intercambio. Sustituibilidad media.</td></tr>
<tr><td>Apertura</td><td>Eros (k=4)</td><td>El actor actuó desde una disposición de apertura genuina hacia el otro. Sustituibilidad media.</td></tr>
<tr><td>Convicción propia</td><td>Potós (k=5)</td><td>El actor actuó desde una afirmación idiosincrática propia. Baja sustituibilidad: pocos otros habrían actuado igual.</td></tr>
<tr><td>Deliberación integrada</td><td>Harmonía (k=6)</td><td>El actor actuó desde una integración completa de su identidad. Sustituibilidad mínima: el acto es genuinamente propio.</td></tr>
<tr><td>Localización ontológica</td><td>DI-ECO + SDO</td><td>Diagnóstico de la disposición interna desde la que actuó cada actor, y su posición en el sistema de diagnóstico ontológico. Requiere entrevista presencial para confirmación.</td></tr>
<tr><td>Acompañamiento ontológico</td><td>HISTOS</td><td>Protocolo de trabajo sobre la brecha entre lo que el actor causó y lo que ha integrado como propio. Opera cuando |Δ| &gt; 0.10.</td></tr>
</tbody></table></div>`;


// ─── FUNCIÓN PRINCIPAL ──────────────────────────────────────

exports.generarHTML = function(resultado, grafo, metadatos) {
  metadatos = metadatos || {};
  var folio  = metadatos.folio || 'EP-' + Date.now();
  var fecha  = metadatos.fecha || new Date().toLocaleDateString('es-MX');

  var deslinde = '<div class="deslinde"><strong>Deslinde de responsabilidad.</strong> El Centro Multidisciplinario Meriadock Formación y Asesoría A.C. se responsabiliza de la correcta aplicación del Método Prometeo y de la precisión matemática del cálculo. No se responsabiliza de los parámetros aportados por el usuario. Este expediente no constituye peritaje judicial, diagnóstico clínico ni asesoría legal.</div>';
  var pie      = '<div class="pie-pagina">Folio ' + escH(folio) + ' · Generado el ' + escH(fecha) + ' · Método Prometeo · Centro Multidisciplinario Meriadock</div>';

  return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Expediente ' + escH(folio) + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">' +
    '<style>' + CSS + '</style></head><body>' +
    seccionHeader(grafo, metadatos) +
    seccion1(grafo, resultado) +
    seccion2(grafo, resultado) +
    seccion3(grafo, resultado) +
    seccion4(grafo, resultado) +
    seccion5(grafo, resultado) +
    seccionDTotal(resultado, grafo, metadatos) +
    deslinde + pie +
    GLOSARIO +
    '</body></html>';
};


// ─── ESCAPE HTML ────────────────────────────────────────────

function escH(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}