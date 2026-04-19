var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');

// Reemplazar cualquier variante del objeto modos
c = c.replace(
  /var modos = \{[^}]+\};/,
  "var modos = { fobos:'Presi\u00f3n de consecuencias', deimos:'Par\u00e1lisis estructural', anteros:'Reciprocidad', eros:'Apertura', potos:'Afirmaci\u00f3n propia', harmonia:'Integraci\u00f3n plena' };"
);

// Reemplazar hijoDominante crudo en tabla 1.1
c = c.replace(
  "'<td>' + (nd.hijoDominante||'—') + '</td>'",
  "'<td>' + (function(h){ var m={fobos:'Presi\u00f3n de consecuencias',deimos:'Par\u00e1lisis estructural',anteros:'Reciprocidad',eros:'Apertura',potos:'Afirmaci\u00f3n propia',harmonia:'Integraci\u00f3n plena'}; return m[h]||h||'—'; })(nd.hijoDominante) + '</td>'"
);

fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo');
