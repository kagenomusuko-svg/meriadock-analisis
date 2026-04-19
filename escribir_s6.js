var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');

// Eliminar seccion6 rota si existe
var ini = c.indexOf('\nfunction seccion6(');
var fin = c.indexOf('\nfunction glosario()');
if (ini !== -1) c = c.substring(0, ini) + '\n' + c.substring(fin);

// Construir la función sin caracteres problemáticos
var fn = [
  'function seccion6(resultado) {',
  '  var dt = resultado.dTotal;',
  '  var ad = resultado.ajusteDebitor;',
  '  var sinDatos = !dt || dt.pendiente;',
  '  if (sinDatos) {',
  '    return \'<div class="seccion salto-pagina"><h2>Documento 4 &middot; Ajuste Debitor</h2><div class="nota">No se aportaron componentes del da\\u00f1o. Aporte T_invertido, T_impedido y descripci\\u00f3n de da\\u00f1o a la trayectoria para completar este documento.</div></div>\\n\';',
  '  }',
  '  function fmt(n) { return n.toLocaleString(\'es-MX\'); }',
  '  var montoT = dt.tTrayectoria.aplica',
  '    ? (fmt(dt.tTrayectoria.monto) + (dt.tTrayectoria.estimado ? \' (estimado)\' : \'\'))',
  '    : \'No aplica\';',
  '  var fD =',
  '    \'<tr><td>Da\\u00f1o directo (T_invertido)</td><td>\' + fmt(dt.tInvertido.monto) + \'</td><td>\' + dt.tInvertido.nivelEvidencia + \'</td><td>\' + (dt.tInvertido.tieneDocumentos ? \'Documentado\' : \'Sin documentos\') + \'</td><td>\' + (dt.tInvertido.descripcion || \'\\u2014\') + \'</td></tr>\' +',
  '    \'<tr><td>Lucro cesante (T_impedido)</td><td>\' + fmt(dt.tImpedido.monto) + \'</td><td>\' + dt.tImpedido.nivelEvidencia + \'</td><td>\' + (dt.tImpedido.esEstimacion ? \'Estimaci\\u00f3n\' : \'Documentado\') + \'</td><td>\' + (dt.tImpedido.descripcion || \'\\u2014\') + \'</td></tr>\' +',
  '    \'<tr><td>Da\\u00f1o a la trayectoria</td><td>\' + montoT + \'</td><td>\' + dt.tTrayectoria.nivelEvidencia + \'</td><td>\' + (dt.tTrayectoria.estimado ? \'Estimaci\\u00f3n - requiere pericia\' : \'Declarado\') + \'</td><td>\' + (dt.tTrayectoria.descripcion || \'\\u2014\') + \'</td></tr>\';',
  '  var fA = ad ? ad.map(function(a) {',
  '    return \'<tr><td class="highlight">\' + a.nodo + \'</td><td class="highlight">\' + (a.rStar * 100).toFixed(2) + \'%</td><td>\' + fmt(a.adMin) + \'</td><td>\' + fmt(a.adConservador) + \'</td><td>\' + fmt(a.adCentral) + \'</td></tr>\';',
  '  }).join(\'\') : \'\';',
  '  return \'<div class="seccion salto-pagina">\' +',
  '    \'<h2>Documento 4 \\u00b7 D_total y Ajuste Debitor</h2>\' +',
  '    \'<div class="nota">AD_i = R*_i x D_total. El ajuste debitor es la estimaci\\u00f3n causal del da\\u00f1o restaurador. No es la condena \\u2014 es lo que la causalidad indica antes de cualquier ajuste procesal.</div>\' +',
  '    \'<h3>Componentes del D_total</h3>\' +',
  '    \'<table><thead><tr><th>Componente</th><th>Monto</th><th>Evidencia</th><th>Estado</th><th>Descripci\\u00f3n</th></tr></thead><tbody>\' + fD + \'</tbody></table>\' +',
  '    \'<p><strong>M\\u00ednimo:</strong> \' + fmt(dt.dTotalMin) + \' &middot; <strong>Conservador:</strong> \' + fmt(dt.dTotalConservador) + \' &middot; <strong>Completo:</strong> \' + fmt(dt.dTotal) + \'</p>\' +',
  '    \'<h3>Ajuste debitor por nodo</h3>\' +',
  '    \'<table><thead><tr><th>Nodo</th><th>R*</th><th>AD m\\u00ednimo</th><th>AD conservador</th><th>AD completo</th></tr></thead><tbody>\' + fA + \'</tbody></table>\' +',
  '    \'</div>\\n\';',
  '}'
].join('\n');

c = c.replace('\nfunction glosario()', '\n' + fn + '\nfunction glosario()');
fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo');
