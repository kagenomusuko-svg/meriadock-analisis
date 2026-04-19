var fs = require('fs');
var c = fs.readFileSync('pages/api/chat.js', 'utf8');

c = c.replace(
  "const INSTRUCCION_GRAFO = `INSTRUCCION CRITICA SOBRE CALCULOS:\nNUNCA calcules R*, S, alpha o Delta tu mismo.",
  "const INSTRUCCION_GRAFO = `INSTRUCCION CRITICA SOBRE CALCULOS:\nNUNCA calcules R*, S, alpha o Delta tu mismo. NUNCA presentes tablas de resultados numéricos antes de que el motor los calcule. NUNCA uses porcentajes inventados. Si calculas tú mismo algún número de R*, S, α o Δ, el análisis es INCORRECTO y no tiene valor."
);

fs.writeFileSync('pages/api/chat.js', c);
console.log('Listo');
