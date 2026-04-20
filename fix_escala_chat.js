var fs = require('fs');
var c = fs.readFileSync('pages/api/chat.js', 'utf8');

var viejo = "TABLA DE EVIDENCIA E0-E8',\n'',\n'E0: sin evidencia, inferencia pura. Rango [0.00, 0.20].',\n'E1: correlación temporal. Rango [0.05, 0.30].',\n'E2: testimonio único no verificado. Rango [0.10, 0.40].',\n'E3: testimonio múltiple o documento indirecto. Rango [0.20, 0.55].',\n'E4: documento directo sin firma. Rango [0.35, 0.65].',\n'E5: documento firmado o testigos presenciales. Rango [0.50, 0.80].',\n'E6: registro oficial o pericial. Rango [0.60, 0.88].',\n'E7: evidencia forense o documental múltiple verificada. Rango [0.72, 0.95].',\n'E8: evidencia irrefutable. Rango [0.85, 1.00].',";

var nuevo = "TABLA DE EVIDENCIA — ESCALA GENERAL Y POR DOMINIO',\n'',\n'E1 es la evidencia más fuerte (documento directo). E8 es la más débil (dicho único). E0 es ausencia total, peso cero. Cada dominio tiene su propia escala con los mismos niveles pero rangos ajustados. Cuando una arista pertenece a un dominio específico, declara el dominio y el nivel: el motor consulta la tabla correcta.',\n'',\n'Escala general (aplica cuando no hay dominio específico):',\n'E1: documento directo que registra la instrucción o decisión causal. Rango [0.75, 0.95].',\n'E2: análisis pericial que reconstruye la cadena causal. Rango [0.55, 0.75].',\n'E3: testimonios convergentes de fuentes independientes con documentación parcial. Rango [0.40, 0.60].',\n'E4: correlación estadística documentada. Rango [0.35, 0.55].',\n'E5: testimonio único con documentación parcial corroborante. Rango [0.30, 0.50].',\n'E6: posición estructural del nodo en el sistema sin documentación directa. Rango [0.25, 0.45].',\n'E7: correlación débil o indicio circunstancial sin mecanismo documentado. Rango [0.15, 0.35].',\n'E8: dicho único sin corroboración de ningún tipo. Rango [0.05, 0.20].',\n'E0: ausencia total de evidencia para la arista. Peso = 0.00.',\n'',\n'Dominios con escala específica: penal, laboral, penal_internacional, ambiental, familia, competencia, propiedad_intelectual, medica, tributario, arbitraje, financiero, insolvencia, corporativo, mercado, seguros, comportamiento, digital, comercio, economia_salud, cripto, epidemiologia, oncologia, adicciones, salud_mental, medicina_laboral, bioetica, politica_sanitaria, trasplantes, educacion, acoso_escolar, investigacion, organizacional, historico.',\n'Una arista puede declarar dominio penal y otra del mismo grafo declarar dominio laboral. El motor resuelve cada una con su escala correspondiente.',\n'Regla: E0 es arista nula. E1 es el documento directo más sólido. E7 es correlación temporal sin mecanismo — no establece causalidad.',";

if (c.indexOf(viejo) === -1) {
  console.error('ERROR: no se encontro el bloque.');
  console.log('Primeros 80 chars del area buscada:');
  var idx = c.indexOf('TABLA DE EVIDENCIA');
  if (idx !== -1) console.log(JSON.stringify(c.substring(idx, idx+200)));
  process.exit(1);
}
c = c.replace(viejo, nuevo);
console.log('OK: tabla corregida.');

// Corregir referencia a E1 en FASE 0
c = c.replace(
  'mediante aristas de evidencia E2 o superior con los actores del caso. Si un evento adverso solo puede conectarse con evidencia E0 o E1 (correlación temporal, inferencia pura), no es el nodo final correcto',
  'mediante aristas de evidencia E3 o superior con los actores del caso. Si un evento adverso solo puede conectarse con evidencia E0 (ausencia total) o E7-E8 (correlación temporal, dicho único), no es el nodo final correcto'
);
console.log('OK: referencia FASE 0 corregida.');

// Corregir ejemplo bancario
c = c.replace(
  'un acceso a un sistema bancario con evidencia E1 de conexión con un fraude',
  'un acceso a un sistema bancario con evidencia E7 (correlación temporal sin mecanismo causal) de conexión con un fraude'
);
console.log('OK: ejemplo bancario corregido.');

// Corregir regla 9
c = c.replace(
  'Si la evidencia es E1, declárala E1 aunque debilite el análisis.',
  'Si la evidencia es E7 (correlación temporal), declárala E7 aunque debilite el análisis.'
);
c = c.replace(
  'Una arista con evidencia E0 o E1 no establece causalidad. Establece correlación. Nunca construyas el nodo final sobre una arista E0 o E1 como única conexión.',
  'E0 es arista nula. E7 y E8 (correlación temporal, dicho único) no establecen causalidad. Nunca construyas el nodo final sobre aristas E7-E8 como única conexión.'
);
console.log('OK: reglas 9 y 10 corregidas.');

fs.writeFileSync('pages/api/chat.js', c, 'utf8');
console.log('');
console.log('Listo. Ejecuta: npm run dev');
