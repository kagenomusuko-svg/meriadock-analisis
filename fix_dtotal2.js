var fs = require('fs');
var lines = fs.readFileSync('dist-motor/series.js', 'utf8').split('\n');

// Insertar el cálculo en línea 141 (índice 140)
var insercion = [
  '  var dTotalObj = calcularDTotal(danio);',
  '  var ajusteDebitor = calcularAjusteDebitor(',
  '    nodos.map(function(nd,i){ return {nodo:nd.nombre, valor:rVec[i]}; }),',
  '    dTotalObj',
  '  );',
  ''
];

// Encontrar la línea exacta del return final
var idx = -1;
for (var i = lines.length - 1; i >= 0; i--) {
  if (lines[i].trim() === 'return {') {
    idx = i;
    break;
  }
}

if (idx === -1) {
  console.log('ERROR: no encontré el return final');
  process.exit(1);
}

lines.splice(idx, 0, ...insercion);
fs.writeFileSync('dist-motor/series.js', lines.join('\n'));
console.log('Insertado antes de línea', idx + 1, ':', lines[idx + insercion.length]);
