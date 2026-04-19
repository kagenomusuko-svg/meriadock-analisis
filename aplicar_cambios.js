var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');

c = c.replace("fobos:'k=1 \\u00b7 Presi\\u00f3n de consecuencias', deimos:'k=2 \\u00b7 Par\\u00e1lisis estructural',\n    anteros:'k=3 \\u00b7 Inercia y costumbre', eros:'k=4 \\u00b7 Apertura e impulso',\n    potos:'k=5 \\u00b7 Afirmaci\\u00f3n idiosincr\\u00e1tica', harmonia:'k=6 \\u00b7 Integraci\\u00f3n completa'", "fobos:'Presi\\u00f3n de consecuencias', deimos:'Par\\u00e1lisis estructural',\n    anteros:'Reciprocidad', eros:'Apertura',\n    potos:'Afirmaci\\u00f3n propia', harmonia:'Integraci\\u00f3n plena'");
c = c.replace('Secci\\u00f3n 3 \\u00b7 DI-ECO + SDO \\u2014 Localizaci\\u00f3n ontol\\u00f3gica de nodos humanos', 'Secci\\u00f3n 3 \\u00b7 Localizaci\\u00f3n ontol\\u00f3gica');
c = c.replace('Secci\\u00f3n 4 \\u00b7 HISTOS \\u2014 Protocolo de Acompa\\u00f1amiento Ontol\\u00f3gico', 'Secci\\u00f3n 4 \\u00b7 Acompa\\u00f1amiento ontol\\u00f3gico');
c = c.replace('<th>Nodo</th><th>Tipo</th><th>Descripci\\u00f3n</th><th>Hijo dominante</th><th>R*</th>', '<th>Nodo</th><th>Tipo</th><th>Descripci\\u00f3n</th><th>Modo de actuaci\\u00f3n</th><th>R*</th>');
c = c.replace('<th>Nodo</th><th>Tipo</th><th>Modo dominante</th><th>Rango S</th><th>C\\u00f3digo SDO</th><th>Nivel EP</th>', '<th>Nodo</th><th>Tipo</th><th>Modo de actuaci\\u00f3n</th><th>Sustituibilidad (S)</th><th>Perfil SDO</th><th>Nivel EP</th>');
c = c.replace('k=1 (Fobos): S alto [0.70\\u20130.95]. k=6 (Harmon\\u00eda): S bajo [0.00\\u20130.25]. Los c\\u00f3digos SDO requieren ECO presencial para confirmaci\\u00f3n en niveles EP-1.', 'S alto (cerca de 1.00): el contexto explica la mayor parte del acto \\u2014 cualquier persona en esa posici\\u00f3n habr\\u00eda actuado igual. S bajo (cerca de 0.00): la actuaci\\u00f3n es propia e idiosincr\\u00e1tica. El perfil requiere entrevista presencial para confirmaci\\u00f3n en niveles EP-1.');
c = c.replace("(nd?nd.tipo:'')", "(nd?(nd.tipo==='diseno'?'nodo de dise\\u00f1o':nd.tipo==='ejecucion'?'nodo de ejecuci\\u00f3n':nd.tipo==='final'?'nodo final':nd.tipo):'')");
c = c.replace("'<tr><td>' + t + '</td>'", "'<tr><td>' + (t==='diseno'?'Nodo de dise\\u00f1o':t==='ejecucion'?'Nodo de ejecuci\\u00f3n':t==='final'?'Nodo final':t) + '</td>'");
c = c.replace("diseno:'Derecho: autor mediato \\u00b7 Auditor\\u00eda: nodo de dise\\u00f1o institucional \\u00b7 Medicina: factor etiol\\u00f3gico estructural'", "diseno:'Derecho: autor mediato (quien dise\\u00f1\\u00f3 el sistema que hizo posible el da\\u00f1o) \\u00b7 Auditor\\u00eda: responsable institucional de dise\\u00f1o \\u00b7 Medicina: factor etiol\\u00f3gico estructural'");
c = c.replace("ejecucion:'Derecho: ejecutor \\u00b7 Auditor\\u00eda: operador de protocolo \\u00b7 Medicina: agente directo'", "ejecucion:'Derecho: ejecutor (quien llev\\u00f3 a cabo el acto) \\u00b7 Auditor\\u00eda: operador del protocolo \\u00b7 Medicina: agente causal directo'");

fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo');
