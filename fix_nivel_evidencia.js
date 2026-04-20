var fs = require('fs');
var c = fs.readFileSync('dist-motor/grafo.js', 'utf8');

var viejo = "exports.midpoint = function(a) {\n  if (a.dominio && (a.nivelEvidencia !== undefined)) {\n    return escalas.midpoint(a.dominio, a.nivelEvidencia);\n  }";

var nuevo = "exports.midpoint = function(a) {\n  if (a.dominio && (a.nivelEvidencia !== undefined)) {\n    var nivel = String(a.nivelEvidencia).replace(/[^0-9]/g, '') || '5';\n    return escalas.midpoint(a.dominio, nivel);\n  }";

if (c.indexOf(viejo) === -1) { console.error('ERROR'); process.exit(1); }
c = c.replace(viejo, nuevo);

var viejo2 = "exports.rangoArista = function(a) {\n  if (a.dominio && (a.nivelEvidencia !== undefined)) {\n    return escalas.obtenerRango(a.dominio, a.nivelEvidencia);\n  }";
var nuevo2 = "exports.rangoArista = function(a) {\n  if (a.dominio && (a.nivelEvidencia !== undefined)) {\n    var nivel = String(a.nivelEvidencia).replace(/[^0-9]/g, '') || '5';\n    return escalas.obtenerRango(a.dominio, nivel);\n  }";

if (c.indexOf(viejo2) === -1) { console.error('ERROR rangoArista'); process.exit(1); }
c = c.replace(viejo2, nuevo2);

fs.writeFileSync('dist-motor/grafo.js', c);
console.log('Listo.');
