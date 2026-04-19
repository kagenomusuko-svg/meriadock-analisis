var fs = require('fs');
var svg = fs.readFileSync('public/logo.svg');
var b64 = svg.toString('base64');
fs.writeFileSync(
  'dist-motor/logo_b64.js',
  '"use strict";\nmodule.exports = "data:image/svg+xml;base64,' + b64 + '";\n'
);
console.log('Listo — logo_b64.js creado, longitud:', b64.length);
