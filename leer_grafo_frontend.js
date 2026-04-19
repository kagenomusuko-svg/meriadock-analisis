var fs = require('fs');
var c = fs.readFileSync('pages/chat.tsx', 'utf8');

// Cuando llega el mensaje final, guardar el grafo si viene
c = c.replace(
  "} else if (data.tipo === 'final' || data.tipo === 'error') {\n              setMensajes(prev => [...prev.filter(m => !m.esPaso), { rol: 'sistema', contenido: data.contenido }])",
  "} else if (data.tipo === 'final' || data.tipo === 'error') {\n              setMensajes(prev => [...prev.filter(m => !m.esPaso), { rol: 'sistema', contenido: data.contenido }])\n              if (data.grafo) setUltimoGrafo(data.grafo)"
);

fs.writeFileSync('pages/chat.tsx', c);
console.log('Listo');
