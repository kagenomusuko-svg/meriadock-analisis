var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');

// Función helper para traducir tipos — agregarla antes de seccion1
var helper = "function tipoLabel(t) {\n  return t==='diseno'?'Dise\u00f1o':t==='ejecucion'?'Ejecuci\u00f3n':t==='final'?'Final':t;\n}\n\n";
c = c.replace('function matrizW(grafoCausal)', helper + 'function matrizW(grafoCausal)');

// Usar tipoLabel en la tabla de nodos (sección 1)
c = c.replace(
  "'<td>' + nd.tipo + '</td><td>' + (nd.descripcion",
  "'<td>' + tipoLabel(nd.tipo) + '</td><td>' + (nd.descripcion"
);

// Usar tipoLabel en tabla de equivalencias (sección 5)
c = c.replace(
  "(t==='diseno'?'Nodo de dise\\u00f1o':t==='ejecucion'?'Nodo de ejecuci\\u00f3n':t==='final'?'Nodo final':t)",
  "tipoLabel(t)"
);

// Usar tipoLabel en sección 3 localización
c = c.replace(
  "'<td>' + nd.tipo + '</td>'",
  "'<td>' + tipoLabel(nd.tipo) + '</td>'"
);

// Usar tipoLabel en narrativa sección 5
c = c.replace(
  "(nd?(nd.tipo==='diseno'?'nodo de dise\\u00f1o':nd.tipo==='ejecucion'?'nodo de ejecuci\\u00f3n':nd.tipo==='final'?'nodo final':nd.tipo):'')",
  "(nd?tipoLabel(nd.tipo):'')"
);

fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo');
