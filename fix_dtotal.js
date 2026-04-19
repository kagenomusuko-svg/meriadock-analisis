var fs = require('fs');
var c = fs.readFileSync('dist-motor/series.js', 'utf8');

// Insertar el cálculo justo antes del return {
c = c.replace(
  '  return {\n    rStar:',
  '  var dTotalObj = calcularDTotal(danio);\n  var ajusteDebitor = calcularAjusteDebitor(nodos.map(function(nd,i){ return {nodo:nd.nombre, valor:rVec[i]}; }), dTotalObj);\n\n  return {\n    rStar:'
);

// Asegurar que declaracion no está duplicada
c = c.replace(
  'declaracion: declaracion,\n    dTotal: dTotalObj,\n    ajusteDebitor: ajusteDebitor\n  };\n  return {',
  'declaracion: declaracion,\n    dTotal: dTotalObj,\n    ajusteDebitor: ajusteDebitor\n  };\n  // return {'
);

fs.writeFileSync('dist-motor/series.js', c);
console.log('Listo');
