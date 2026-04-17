"use strict";

const espacio = require('./espacio');
const phi1 = require('./phi1');
const grafo = require('./grafo');
const rEstrella = require('./r_estrella');
const alpha = require('./alpha');
const delta = require('./delta');
const derivados = require('./derivados');

console.log('\n=== PRUEBA DEL MOTOR MERIADOCK ===\n');

// BLOQUE 1 — Espacio vectorial
console.log('--- Bloque 1: Espacio vectorial ---');
const v = espacio.vectorCero(6);
console.log('Vector cero:', v);
console.log('Norma de [3,4,0,0,0,0]:', espacio.norma([3,4,0,0,0,0]));
console.log('Similitud coseno paralela:', espacio.similitudCoseno([1,0,0],[1,0,0]));
console.log('Similitud coseno ortogonal:', espacio.similitudCoseno([1,0,0],[0,1,0]));

// BLOQUE 2 — Softmax
console.log('\n--- Bloque 2: Softmax sobre Hijos ---');
const params = phi1.parametrosIniciales();
const estado = { a_t: [1,0,0,0,0,0], tau: 1.0, norma_I: 0 };
const dist = phi1.softmax(params, estado);
console.log('Distribución P(Hijos):', dist.map((h) => h.toFixed(3)));
const kStar = phi1.hijoDominante(dist);
console.log('Hijo dominante:', kStar.hijo, 'p=', kStar.probabilidad.toFixed(3));

// BLOQUE 6+7 — Grafo y R*
console.log('\n--- Bloques 6+7: Grafo causal y R* ---');
const grafoCaso = {
  nodos: [
    { id: 'directivo', nombre: 'Directivo', tipo: 'diseno', descripcion: 'Diseñó el protocolo' },
    { id: 'gerente', nombre: 'Gerente', tipo: 'ejecucion', descripcion: 'Ejecutó el protocolo' },
    { id: 'resultado', nombre: 'Daño', tipo: 'final', descripcion: 'Resultado final' }
  ],
  aristas: [
    { origen: 'directivo', destino: 'resultado', pesoMin: 0.55, pesoMax: 0.75, nivelEvidencia: 4, descripcionEvidencia: 'Protocolo firmado' },
    { origen: 'gerente', destino: 'resultado', pesoMin: 0.25, pesoMax: 0.45, nivelEvidencia: 5, descripcionEvidencia: 'Registros de ejecución' }
  ]
};

const resultadoR = rEstrella.calcularRStarDesdeGrafo(grafoCaso);
console.log('¿Convergió?', resultadoR.convergio);
console.log('Iteraciones:', resultadoR.iteraciones);
resultadoR.nombresNodos.forEach((nombre, i) => {
  console.log(`R*(${nombre}) = ${(resultadoR.vector[i] * 100).toFixed(2)}%`);
});

// BLOQUE 5 — S
console.log('\n--- Bloque 5: Sustituibilidad S ---');
const sGerente = phi1.RANGOS_S['fobos'];
const sDirectivo = phi1.RANGOS_S['anteros'];
console.log(`S(Gerente/Fobos) midpoint: ${sGerente.midpoint}`);
console.log(`S(Directivo/Anteros) midpoint: ${sDirectivo.midpoint}`);

// BLOQUE 8 — Alpha
console.log('\n--- Bloque 8: Coeficiente α ---');
const alphaDirectivo = alpha.calcularAlpha({
  integrado: true, nDoc: 1, nivelEvidencia: 4, nDom: 1, nI: 3
});
const alphaGerente = alpha.calcularAlpha({
  integrado: true, nDoc: 4, nivelEvidencia: 4, nDom: 2, nI: 3
});
console.log(`α(Directivo) = ${alphaDirectivo.toFixed(3)}`);
console.log(`α(Gerente)   = ${alphaGerente.toFixed(3)}`);

// BLOQUE 9 — Delta
console.log('\n--- Bloque 9: Déficit Δ ---');
const rStarDirectivo = resultadoR.vector[0];
const rStarGerente = resultadoR.vector[1];
const deltaDirectivo = delta.calcularDelta(rStarDirectivo, alphaDirectivo);
const deltaGerente = delta.calcularDelta(rStarGerente, alphaGerente);
console.log(`Δ(Directivo) = ${deltaDirectivo.valor.toFixed(3)} → ${deltaDirectivo.signo}`);
console.log(`Δ(Gerente)   = ${deltaGerente.valor.toFixed(3)} → ${deltaGerente.signo}`);

// BLOQUE 10 — Declaración
console.log('\n--- Bloque 10: Declaración ---');
const indiceLider = resultadoR.vector.indexOf(Math.max(...resultadoR.vector));
const declaracion = derivados.determinarDeclaracion(
  4, true, true,
  resultadoR.vector[indiceLider],
  resultadoR.nombresNodos[indiceLider]
);
console.log(`Declaración tipo: ${declaracion.nivel}`);
console.log(declaracion.descripcion);

console.log('\n=== MOTOR MERIADOCK — PRUEBA COMPLETADA ===\n');