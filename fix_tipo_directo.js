var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');

c = c.replace(
  "return '<tr><td>' + nd.nombre + '</td><td>' + nd.tipo + '</td><td>' + (nd.descripcion",
  "return '<tr><td>' + nd.nombre + '</td><td>' + tipoLabel(nd.tipo) + '</td><td>' + (nd.descripcion"
);

fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo');
