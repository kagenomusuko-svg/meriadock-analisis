const fs = require('fs');
let c = fs.readFileSync('pages/chat.tsx', 'utf8');

c = c.replace(
  "setMensajes([...nuevos, { rol: 'sistema', contenido: 'Error al conectar. Intenta de nuevo.' }])",
  `const errorMsg = data?.error?.includes('rate_limit') || data?.detalle?.includes('rate_limit')
        ? 'El documento es demasiado extenso para procesarlo de una vez. Por favor sube solo el capítulo o fragmento relevante para el análisis.'
        : data?.error?.includes('tokens')
        ? 'El contenido excede el límite de procesamiento. Reduce el tamaño del documento o divide el análisis en partes.'
        : 'Hubo un problema al conectar con el servidor. Intenta de nuevo en unos segundos.'
      setMensajes([...nuevos, { rol: 'sistema', contenido: errorMsg }])`
);

// También manejar el catch
c = c.replace(
  "} catch {\n      setMensajes([...nuevos, { rol: 'sistema', contenido: 'Error al conectar. Intenta de nuevo.' }])",
  "} catch {\n      setMensajes([...nuevos, { rol: 'sistema', contenido: 'No fue posible conectar con el servidor. Verifica tu conexión e intenta de nuevo.' }])"
);

fs.writeFileSync('pages/chat.tsx', c);
console.log('Manejo de errores actualizado');
