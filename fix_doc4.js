var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');

// Eliminar la seccion6 rota (desde "function seccion6" hasta el siguiente "function glosario")
var inicio = c.indexOf('\nfunction seccion6(');
var fin    = c.indexOf('\nfunction glosario()');
if (inicio === -1 || fin === -1) {
  console.log('ERROR: no encontre los marcadores. inicio='+inicio+' fin='+fin);
  process.exit(1);
}
c = c.substring(0, inicio) + '\n' + c.substring(fin);

// Insertar seccion6 correcta antes de glosario
var fn = '\nfunction seccion6(resultado) {\n' +
'  var dt = resultado.dTotal;\n' +
'  var ad = resultado.ajusteDebitor;\n' +
'  if (!dt || dt.pendiente) {\n' +
'    return \'<div class="seccion salto-pagina">\' +\n' +
'      \'<h2>Documento 4 \\u00b7 D_total y Ajuste Debitor</h2>\' +\n' +
'      \'<div class="nota">No se aportaron componentes del da\\u00f1o. Para completar este documento aporte: monto del da\\u00f1o directo (T_invertido), lucro cesante (T_impedido), y descripci\\u00f3n del da\\u00f1o a la trayectoria.</div></div>\\n\';\n' +
'  }\n' +
'  function fmt(n) { return n.toLocaleString(\'es-MX\'); }\n' +
'  var filasD =\n' +
'    \'<tr><td>Da\\u00f1o directo (T_invertido)</td><td>$\' + fmt(dt.tInvertido.monto) + \'</td><td>\' + dt.tInvertido.nivelEvidencia + \'</td><td>\' + (dt.tInvertido.tieneDocumentos ? \'Documentado\' : \'Sin documentos\') + \'</td><td>\' + (dt.tInvertido.descripcion||\'\\u2014\') + \'</td></tr>\' +\n' +
'    \'<tr><td>Lucro cesante (T_impedido)</td><td>$\' + fmt(dt.tImpedido.monto) + \'</td><td>\' + dt.tImpedido.nivelEvidencia + \'</td><td>\' + (dt.tImpedido.esEstimacion ? \'Estimaci\\u00f3n\' : \'Documentado\') + \'</td><td>\' + (dt.tImpedido.descripcion||\'\\u2014\') + \'</td></tr>\' +\n' +
'    \'<tr><td>Da\\u00f1o a la trayectoria (\\u0394T)</td><td>\' + (dt.tTrayectoria.aplica ? \'$\' + fmt(dt.tTrayectoria.monto) + (dt.tTrayectoria.estimado ? \' (estimado)\' : \'\') : \'No aplica\') + \'</td><td>\' + dt.tTrayectoria.nivelEvidencia + \'</td><td>\' + (dt.tTrayectoria.estimado ? \'Estimaci\\u00f3n \\u2014 requiere pericia\' : \'Declarado\') + \'</td><td>\' + (dt.tTrayectoria.descripcion||\'\\u2014\') + \'</td></tr>\';\n' +
'  var filasAD = ad ? ad.map(function(a) {\n' +
'    return \'<tr><td class="highlight">\' + a.nodo + \'</td><td class="highlight">\' + (a.rStar*100).toFixed(2) + \'%</td><td>$\' + fmt(a.adMin) + \'</td><td>$\' + fmt(a.adConservador) + \'</td><td>$\' + fmt(a.adCentral) + \'</td></tr>\';\n' +
'  }).join(\'\') : \'\';\n' +
'  return \'<div class="seccion salto-pagina">\' +\n' +
'    \'<h2>Documento 4 \\u00b7 D_total y Ajuste Debitor</h2>\' +\n' +
'    \'<div class="nota">AD_i = R*_i \\u00d7 D_total. El ajuste debitor es la estimaci\\u00f3n causal del da\\u00f1o restaurador. No es la condena \\u2014 es lo que la causalidad indica antes de cualquier ajuste procesal.</div>\' +\n' +
'    \'<h3>Componentes del D_total</h3>\' +\n' +
'    \'<table><thead><tr><th>Componente</th><th>Monto</th><th>Evidencia</th><th>Estado</th><th>Descripci\\u00f3n</th></tr></thead><tbody>\' + filasD + \'</tbody></table>\' +\n' +
'    \'<div style="margin:12px 0;padding:12px;background:#f0f5f4;border-radius:4px">\' +\n' +
'    \'<strong>D_total m\\u00ednimo:</strong> $\' + fmt(dt.dTotalMin) + \' \\u00b7 \' +\n' +
'    \'<strong>D_total conservador:</strong> $\' + fmt(dt.dTotalConservador) + \' \\u00b7 \' +\n' +
'    \'<strong>D_total completo:</strong> $\' + fmt(dt.dTotal) + \'</div>\' +\n' +
'    \'<h3>Ajuste debitor por nodo</h3>\' +\n' +
'    \'<table><thead><tr><th>Nodo</th><th>R*</th><th>AD m\\u00ednimo</th><th>AD conservador</th><th>AD completo</th></tr></thead><tbody>\' + filasAD + \'</tbody></table>\' +\n' +
'    \'</div>\\n\';\n' +
'}\n';

c = c.replace('\nfunction glosario()', fn + '\nfunction glosario()');
fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo');
