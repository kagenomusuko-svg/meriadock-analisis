"use strict";
var series = require('./series');

console.log('\n=== PRUEBA TRES SERIES — CASO DIRECTIVO/GERENTE ===\n');

var grafoCaso = {
  nodos: [
    { id: 'directivo', nombre: 'Directivo', tipo: 'diseno', hijoDominante: 'anteros', descripcion: 'Diseñó el protocolo' },
    { id: 'gerente',   nombre: 'Gerente',   tipo: 'ejecucion', hijoDominante: 'fobos', descripcion: 'Ejecutó el protocolo' },
    { id: 'resultado', nombre: 'Daño',      tipo: 'final', descripcion: 'Resultado final' }
  ],
  aristas: [
    { origen: 'directivo', destino: 'resultado', pesoMin: 0.45, pesoMax: 0.75, nivelEvidencia: 4 },
    { origen: 'gerente',   destino: 'resultado', pesoMin: 0.25, pesoMax: 0.45, nivelEvidencia: 5 }
  ]
};

var insumosAlpha = [
  { id: 'directivo', integrado: true, nDoc: 1, nivelEvidencia: 4, nDom: 1, nI: 3 },
  { id: 'gerente',   integrado: true, nDoc: 4, nivelEvidencia: 4, nDom: 2, nI: 3 }
];

var nodosIIC = [
  {
    id: 'directivo',
    declarado: ['protocolo de seguridad', 'capacitación mensual', 'supervisión semanal'],
    observado: ['protocolo de seguridad'],
    coincidencias: 1
  }
];

var resultado = series.correrAnalisisCompleto(grafoCaso, insumosAlpha, nodosIIC);

console.log('--- SERIE I ---');
resultado.rStar.forEach(function(n) {
  if (n.valor > 0.001)
    console.log('R*(' + n.nodo + ') = ' + (n.valor*100).toFixed(2) + '%  |  R*_neta = ' + (n.neta*100).toFixed(2) + '%');
});
resultado.delta.forEach(function(n) {
  if (n.resultado)
    console.log('Δ(' + n.nodo + ') = ' + n.resultado.valor.toFixed(3) + ' → ' + n.resultado.signo);
});

console.log('\n--- SERIE II ---');
resultado.serieII.forEach(function(n) {
  if (n.iic !== null) {
    console.log(n.interpretacionIIC);
    console.log(n.interpretacionFA);
  }
});

console.log('\n--- SERIE III ---');
console.log('Vértices evaluados:', resultado.estabilidad.totalVertices, '(' + (resultado.estabilidad.exhaustivo ? 'exhaustivo' : 'muestral') + ')');
console.log('Estabilidad del ranking:', resultado.estabilidad.pctEstabilidad.toFixed(1) + '%');
console.log('Ranking base:', resultado.estabilidad.rankingBase.join(' > '));
console.log('\nAristas críticas:');
resultado.estabilidad.sensibilidad.forEach(function(s) {
  if (s.esCritica)
    console.log('  ' + s.origen + ' → ' + s.destino + ' [' + s.rango[0] + ', ' + s.rango[1] + ']  impacto: ' + (s.impactoEnInestabilidad*100).toFixed(1) + '%');
});

console.log('\n--- DECLARACIÓN ---');
console.log(resultado.declaracion.descripcion);

console.log('\n=== FIN ===\n');
