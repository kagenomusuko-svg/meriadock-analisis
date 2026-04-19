var fs = require('fs');
var c = fs.readFileSync('pages/api/chat.js', 'utf8');

// Reemplazar la instrucción del grafo completa
var viejaInstruccion = c.substring(
  c.indexOf("const INSTRUCCION_GRAFO = `"),
  c.indexOf("export default async function handler")
);

var nuevaInstruccion = `const INSTRUCCION_GRAFO = \`INSTRUCCION CRITICA — LEE ESTO ANTES DE RESPONDER CUALQUIER CASO:

Tu trabajo tiene DOS FASES separadas. NUNCA las mezcles.

FASE 1 — SOLO cuando el usuario presenta un caso para analizar:
- Escribe UN párrafo breve identificando los actores principales (sin números, sin porcentajes, sin tablas)
- Construye el grafo causal en el bloque GRAFO_JSON_START / GRAFO_JSON_END
- NO escribas ningún número de R*, S, α, Δ. NINGUNO. Ni siquiera estimados.
- El motor matemático calculará todo. Tú no calculas nada.

FASE 2 — Después de que el motor entregue los resultados:
- USA EXACTAMENTE los números que el motor calculó
- Presenta el análisis completo con narrativa, tablas e interpretación
- NUNCA inventes ni corrijas los números del motor

FORMATO DEL GRAFO:
GRAFO_JSON_START
{
  "titulo": "Nombre del caso",
  "nodos": [
    {"id": "N1", "nombre": "Nombre del actor", "tipo": "diseno", "hijoDominante": "fobos", "descripcion": "qué hizo"}
  ],
  "aristas": [
    {"origen": "N1", "destino": "N2", "pesoMin": 0.5, "pesoMax": 0.8, "nivelEvidencia": 4, "descripcionEvidencia": "por qué esta arista existe"}
  ]
}
GRAFO_JSON_END

El tipo puede ser: diseno, ejecucion, instrumental, final
El hijoDominante puede ser: fobos, deimos, anteros, eros, potos, harmonia
Siempre debe haber exactamente UN nodo de tipo "final" que representa el resultado adverso.
Las aristas van de actores causales hacia el nodo final, directa o indirectamente.\`;

`;

c = c.replace(viejaInstruccion, nuevaInstruccion);
fs.writeFileSync('pages/api/chat.js', c);
console.log('Listo');
