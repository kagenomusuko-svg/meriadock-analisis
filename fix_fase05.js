var fs = require('fs');
var c = fs.readFileSync('pages/api/chat.js', 'utf8');

var marca = "FASE 1 — CONSTRUCCIÓN DEL GRAFO";

var fase05 = "FASE 0.5 — EVALUACIÓN DE CRITERIOS UNIVERSALES\n**INSTRUCCIÓN IMPORTANTE:** Los valores numéricos en este prompt son ILUSTRATIVOS. NO los uses como valores por defecto. Cada nodo debe ser evaluado INDEPENDIENTEMENTE desde el texto del caso.\nPara CADA nodo identificado, evalúa:\n\nCRITERIO 1: Alternativa (para S)\nPregunta: ¿El nodo tenía una opción real diferente a la que tomó?\nExtrae del texto: La frase exacta que responde esta pregunta.\nAsigna: 0.0 = No había alternativa · 0.5 = Parcial · 1.0 = Había alternativa clara\n\nCRITERIO 2: Conformidad (para S)\nPregunta: ¿La conducta era la esperada según el estándar del dominio?\nAsigna: 1.0 = Conforme · 0.5 = Parcial · 0.0 = No conforme\n\nCRITERIO 3: Replicabilidad (para S)\nPregunta: ¿Otro nodo en la misma posición habría actuado igual?\nAsigna: 1.0 = Totalmente replicable · 0.5 = Parcial · 0.0 = No replicable\n\nS = (alternativa + conformidad + replicabilidad) / 3\n\nAsignación de Hijo: S≥0.85→Fobos · S≥0.70→Deimos · S≥0.50→Anteros · S≥0.30→Potós · S≥0.15→Eros · S<0.15→Harmonía\n\nCRITERIO 4: Conocimiento (para α)\nPregunta: ¿El nodo tenía información suficiente para prever el resultado?\nAsigna: 0.33 (sí) · 0.16 (debía saber) · 0.00 (no)\n\nCRITERIO 5: Acción (para α)\nPregunta: ¿Tomó acciones verificables para modificar/prevenir el resultado?\nAsigna: 0.33 (completa) · 0.16 (parcial) · 0.00 (ninguna)\n\nCRITERIO 6: Oportunidad (para α)\nPregunta: ¿Tuvo momentos donde podía actuar diferente?\nAsigna: 0.33 (sí) · 0.00 (no)\n\nα = conocimiento + acción + oportunidad\n\nAl construir el grafo, usa EXACTAMENTE los valores de S, hijoDominante y α derivados de esta evaluación. Nunca uses valores por defecto ni etiquetas predefinidas.\n\n";

if (c.indexOf(marca) === -1) {
  console.error('ERROR: no se encontró FASE 1');
  process.exit(1);
}

c = c.replace(marca, fase05 + marca);
fs.writeFileSync('pages/api/chat.js', c);
console.log('Listo. Lineas: ' + c.split('\n').length);
