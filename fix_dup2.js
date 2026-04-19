var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');
c = c.replace(
  "    glosario(),\n    deslinde(folio, fecha),\n    glosario(),",
  "    deslinde(folio, fecha),\n    glosario(),"
);
fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo');
