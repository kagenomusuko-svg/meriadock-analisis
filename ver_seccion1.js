var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');
var inicio = c.indexOf('filasN');
console.log(c.substring(inicio, inicio + 300));
