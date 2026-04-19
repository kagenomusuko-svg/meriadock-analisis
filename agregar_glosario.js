var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');

var glosario = "function glosario() {\n" +
"  return '<div class=\"seccion salto-pagina\">' +\n" +
"    '<h2>Glosario de t\\u00e9rminos</h2>' +\n" +
"    '<div class=\"nota\">Este glosario conecta el lenguaje del an\\u00e1lisis con la terminolog\\u00eda t\\u00e9cnica del sistema formal. No es necesario conocerlo para leer el expediente.</div>' +\n" +
"    '<table><thead><tr><th>T\\u00e9rmino en el documento</th><th>T\\u00e9rmino t\\u00e9cnico</th><th>Definici\\u00f3n operativa</th></tr></thead><tbody>' +\n" +
"    '<tr><td>Peso causal (R*)</td><td>Vector de responsabilidad causal</td><td>Fracci\\u00f3n del resultado total que se explica por la posici\\u00f3n del nodo en el sistema. Calculado como el eigenvector dominante de la matriz de pesos W.</td></tr>' +\n" +
"    '<tr><td>Sustituibilidad (S)</td><td>\\u00cdndice de sustituibilidad</td><td>Probabilidad de que cualquier otro actor en la misma posici\\u00f3n hubiera producido el mismo resultado. S = 1.00: el resultado es completamente estructural. S = 0.00: el actor es completamente idiosincr\\u00e1tico.</td></tr>' +\n" +
"    '<tr><td>Peso causal neto (R*_neta)</td><td>R* \\u00d7 (1\\u2212S)</td><td>Fracci\\u00f3n del resultado atribuible espec\\u00edficamente a este actor, descontando lo que cualquier otro en su lugar tambi\\u00e9n habr\\u00eda producido.</td></tr>' +\n" +
"    '<tr><td>Asunci\\u00f3n (\\u03b1)</td><td>Coeficiente de asunci\\u00f3n</td><td>Grado en que el actor reconoci\\u00f3 e integr\\u00f3 su responsabilidad mediante acciones verificables. No mide intenci\\u00f3n: mide conducta documentada.</td></tr>' +\n" +
"    '<tr><td>D\\u00e9ficit (\\u0394)</td><td>D\\u00e9ficit de asunci\\u00f3n</td><td>Brecha entre lo que el actor caus\\u00f3 (R*) y lo que ha asumido (\\u03b1). \\u0394 positivo: caus\\u00f3 m\\u00e1s de lo que asumi\\u00f3. \\u0394 negativo: est\\u00e1 asumiendo m\\u00e1s de lo que caus\\u00f3 (posible chivo expiatorio).</td></tr>' +\n" +
"    '<tr><td>Congruencia institucional (IIC)</td><td>\\u00cdndice de Integridad Causal</td><td>Mide cu\\u00e1n congruente fue lo que el nodo de dise\\u00f1o declar\\u00f3 que producir\\u00eda con lo que realmente produjo. IIC = 1.00: congruencia total. IIC = 0.00: divergencia total.</td></tr>' +\n" +
"    '<tr><td>Incumplimiento agravado (Fraude annona)</td><td>Fraude annona</td><td>Producto de alta centralidad causal, baja asunci\\u00f3n y baja congruencia. Es la posici\\u00f3n m\\u00e1s grave que el sistema puede medir en un nodo de dise\\u00f1o.</td></tr>' +\n" +
"    '<tr><td>Robustez del an\\u00e1lisis</td><td>Estabilidad del ranking \\u03c3(R*)</td><td>Porcentaje de combinaciones de pesos plausibles en las que el ordenamiento de responsabilidad se mantiene igual. Base de la Declaraci\\u00f3n A, B, C o D.</td></tr>' +\n" +
"    '<tr><td>Presión de consecuencias</td><td>Fobos (k=1)</td><td>El actor actuó principalmente por presión del entorno o miedo a consecuencias. Alta sustituibilidad: cualquier otro en esa posición habría actuado igual.</td></tr>' +\n" +
"    '<tr><td>Parálisis estructural</td><td>Deimos (k=2)</td><td>El actor actuó desde la incertidumbre o el vértigo ante las opciones disponibles. Alta sustituibilidad.</td></tr>' +\n" +
"    '<tr><td>Reciprocidad</td><td>Anteros (k=3)</td><td>El actor actuó desde la inercia o la costumbre del intercambio. Sustituibilidad media.</td></tr>' +\n" +
"    '<tr><td>Apertura</td><td>Eros (k=4)</td><td>El actor actuó desde una disposición de apertura genuina hacia el otro. Sustituibilidad media.</td></tr>' +\n" +
"    '<tr><td>Afirmaci\\u00f3n propia</td><td>Pot\\u00f3s (k=5)</td><td>El actor actuó desde una afirmación idiosincrática propia. Baja sustituibilidad: pocos otros habrían actuado igual.</td></tr>' +\n" +
"    '<tr><td>Integraci\\u00f3n plena</td><td>Harmon\\u00eda (k=6)</td><td>El actor actuó desde una integración completa de su identidad. Sustituibilidad mínima: el acto es genuinamente propio.</td></tr>' +\n" +
"    '<tr><td>Localización ontológica</td><td>DI-ECO + SDO</td><td>Diagnóstico de la disposición interna desde la que actuó cada actor, y su posición en el sistema de diagnóstico ontológico. Requiere entrevista presencial para confirmación.</td></tr>' +\n" +
"    '<tr><td>Acompañamiento ontológico</td><td>HISTOS</td><td>Protocolo de trabajo sobre la brecha entre lo que el actor causó y lo que ha integrado como propio. Opera cuando |Δ| > 0.10.</td></tr>' +\n" +
"    '</tbody></table></div>\\n';\n" +
"}\n";

// Insertar función glosario antes de la función pie
c = c.replace('function pie(folio, fecha)', glosario + 'function pie(folio, fecha)');

// Llamar al glosario antes del pie en generarHTML
c = c.replace("    pie(folio, fecha),", "    glosario(),\n    pie(folio, fecha),");

fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo');
