var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');

var doc4 = `
function seccion6(resultado) {
  var dt = resultado.dTotal;
  var ad = resultado.ajusteDebitor;

  if (!dt || dt.pendiente) {
    return '<div class="seccion salto-pagina">' +
      '<h2>Documento 4 \u00b7 D_total y Ajuste Debitor</h2>' +
      '<div class="nota">El usuario no aport\u00f3 los componentes del da\u00f1o. ' +
      'El ajuste debitor no puede calcularse sin D_total. ' +
      'Para completar este documento aporte: monto del da\u00f1o directo documentable (T_invertido), ' +
      'monto del lucro cesante (T_impedido), y descripci\u00f3n del da\u00f1o permanente a la trayectoria (\u0394T_trayectoria).' +
      '</div></div>\\n';
  }

  var filasD = [
    '<tr><td>Da\u00f1o directo documentable (T_invertido)</td>' +
    '<td>$' + dt.tInvertido.monto.toLocaleString('es-MX') + '</td>' +
    '<td>' + dt.tInvertido.nivelEvidencia + '</td>' +
    '<td>' + (dt.tInvertido.tieneDocumentos ? 'Documentado' : 'Sin documentos') + '</td>' +
    '<td>' + (dt.tInvertido.descripcion || '\u2014') + '</td></tr>',

    '<tr><td>Lo que dej\u00f3 de ganar (T_impedido)</td>' +
    '<td>$' + dt.tImpedido.monto.toLocaleString('es-MX') + '</td>' +
    '<td>' + dt.tImpedido.nivelEvidencia + '</td>' +
    '<td>' + (dt.tImpedido.esEstimacion ? 'Estimaci\u00f3n' : 'Documentado') + '</td>' +
    '<td>' + (dt.tImpedido.descripcion || '\u2014') + '</td></tr>',

    '<tr><td>Da\u00f1o permanente a la trayectoria (\u0394T_trayectoria)</td>' +
    '<td>' + (dt.tTrayectoria.aplica ? '$' + dt.tTrayectoria.monto.toLocaleString('es-MX') + (dt.tTrayectoria.estimado ? ' (estimado)' : '') : 'No aplica') + '</td>' +
    '<td>' + dt.tTrayectoria.nivelEvidencia + '</td>' +
    '<td>' + (dt.tTrayectoria.estimado ? 'Estimaci\u00f3n autom\u00e1tica \u2014 requiere pericia especializada' : 'Declarado') + '</td>' +
    '<td>' + (dt.tTrayectoria.descripcion || '\u2014') + '</td></tr>'
  ].join('');

  var filasAD = ad ? ad.map(function(a) {
    return '<tr>' +
      '<td class="highlight">' + a.nodo + '</td>' +
      '<td class="highlight">' + (a.rStar * 100).toFixed(2) + '%</td>' +
      '<td>$' + a.adMin.toLocaleString('es-MX') + '</td>' +
      '<td>$' + a.adConservador.toLocaleString('es-MX') + '</td>' +
      '<td>$' + a.adCentral.toLocaleString('es-MX') + '</td>' +
      '</tr>';
  }).join('') : '';

  return '<div class="seccion salto-pagina">' +
    '<h2>Documento 4 \u00b7 D_total y Ajuste Debitor</h2>' +
    '<div class="nota">El ajuste debitor (AD_i = R*_i \u00d7 D_total) es la estimaci\u00f3n causal del da\u00f1o restaurador proporcional a cada actor. ' +
    'No es la condena \u2014 es lo que la causalidad indica que corresponde antes de cualquier ajuste procesal. ' +
    'El monto que la legislaci\u00f3n aplicable pueda otorgar puede diferir.</div>' +
    '<h3>Componentes del D_total</h3>' +
    '<table><thead><tr><th>Componente</th><th>Monto</th><th>Nivel evidencia</th><th>Estado</th><th>Descripci\u00f3n</th></tr></thead>' +
    '<tbody>' + filasD + '</tbody></table>' +
    '<div style="margin:12px 0;padding:12px;background:#f0f5f4;border-radius:4px">' +
    '<strong>D_total m\u00ednimo (solo T_invertido):</strong> $' + dt.dTotalMin.toLocaleString('es-MX') + ' \u00b7 ' +
    '<strong>D_total conservador (sin \u0394T):</strong> $' + dt.dTotalConservador.toLocaleString('es-MX') + ' \u00b7 ' +
    '<strong>D_total completo:</strong> $' + dt.dTotal.toLocaleString('es-MX') +
    '</div>' +
    '<h3>Ajuste debitor por nodo (AD_i = R*_i \u00d7 D_total)</h3>' +
    '<table><thead><tr><th>Nodo</th><th>R*</th><th>AD m\u00ednimo</th><th>AD conservador</th><th>AD completo</th></tr></thead>' +
    '<tbody>' + filasAD + '</tbody></table>' +
    '<div class="nota">El AD del nodo instrumental sin voluntad (si aplica) se suma al AD del nodo de dise\u00f1o que lo cre\u00f3. ' +
    'Ver secci\u00f3n de equivalencias disciplinares.</div>' +
    '</div>\\n';
}

`;

// Insertar función antes de glosario
c = c.replace('function glosario()', doc4 + 'function glosario()');

// Agregar seccion6 al array de generarHTML
c = c.replace(
  "    deslinde(folio, fecha),\n    glosario(),",
  "    seccion6(resultado),\n    deslinde(folio, fecha),\n    glosario(),"
);

fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo');
