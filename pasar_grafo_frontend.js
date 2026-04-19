var fs = require('fs');
var c = fs.readFileSync('pages/api/chat.js', 'utf8');

// Cuando el motor procesa el grafo, incluirlo en la respuesta final
c = c.replace(
  "enviarFinal(textoFinal)",
  "enviarFinal(textoFinal, grafoData)"
);

// Actualizar la función enviarFinal para incluir el grafo
c = c.replace(
  "function enviarFinal(texto) {\n    res.write('data: ' + JSON.stringify({ tipo: 'final', contenido: texto }) + '\\n\\n')\n    res.end()\n  }",
  "function enviarFinal(texto, grafo) {\n    res.write('data: ' + JSON.stringify({ tipo: 'final', contenido: texto, grafo: grafo || null }) + '\\n\\n')\n    res.end()\n  }"
);

fs.writeFileSync('pages/api/chat.js', c);
console.log('Listo');
