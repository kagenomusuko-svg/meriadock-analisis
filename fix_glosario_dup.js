var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');

// Quitar la llamada duplicada — dejar solo una
c = c.replace(
  "    glosario(),\n    pie(folio, fecha),\n    glosario(),",
  "    pie(folio, fecha),\n    glosario(),"
);

// Si no encontró ese patrón, intentar el otro orden
c = c.replace(
  "    pie(folio, fecha),\n    glosario(),\n    glosario(),",
  "    pie(folio, fecha),\n    glosario(),"
);

fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo');
