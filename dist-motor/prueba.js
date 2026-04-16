"use strict";
var e = require('./espacio');
var p1 = require('./phi1');
var gr = require('./grafo');
var rs = require('./r_estrella');
var al = require('./alpha');
var dl = require('./delta');
var dv = require('./derivados');

console.log('\n=== PRUEBA DEL MOTOR MERIADOCK ===\n');

console.log('--- Bloque 1: Espacio vectorial ---');
console.log('vectorCero(3):', e.vectorCero(3));
console.log('norma([3,4]):', e.norma([3,4]));
console.log('similitud coseno paralela:', e.similitudCoseno([1,0,0],[1,0,0]));
console.log('similitud coseno ortogonal:', e.similitudCoseno([1,0,0],[0,1,0]));

console.log('\n--- Bloque 2: Softmax / Hijos ---');
var params = p1.parametrosIniciales();
var estado = { a_t:[1,0,0,0,0,0], tau:1.0, norma_I:0 };
var dist = p1.softmax(params, estado);
console.log('P(Hijos):', dist.map(function(h){ return h.toFixed(3); }));
var kStar = p1.hijoDominante(dist);
console.log('Hijo dominante:', kStar.hijo, 'p=', kStar.probabilidad.toFixed(3));

console.log('\n--- Bloques 6+7: Grafo y R* ---');
var grafoCaso = {
  nodos: [
    {id:'directivo', nombre:'Directivo', tipo:'diseno', descripcion:'Diseñó el protocolo'},
    {id:'gerente',   nombre:'Gerente',   tipo:'ejecucion', descripcion:'Ejecutó el protocolo'},
    {id:'resultado', nombre:'Daño',      tipo:'final', descripcion:'Resultado final'}
  ],
  aristas: [
    {origen:'directivo', destino:'resultado', pesoMin:0.55, pesoMax:0.75, nivelEvidencia:4, descripcionEvidencia:'Protocolo firmado'},
    {origen:'gerente',   destino:'resultado', pesoMin:0.25, pesoMax:0.45, nivelEvidencia:5, descripcionEvidencia:'Registros de ejecución'}
  ]
};
var rRes = rs.calcularRStarDesdeGrafo(grafoCaso);
console.log('¿Convergió?', rRes.convergio, '— Iteraciones:', rRes.iteraciones);
rRes.nombresNodos.forEach(function(n,i){
  console.log('R*('+n+') = '+(rRes.vector[i]*100).toFixed(2)+'%');
});

console.log('\n--- Bloque 5: S por Hijo ---');
console.log('S(Gerente/Fobos):', p1.RANGOS_S.fobos.midpoint);
console.log('S(Directivo/Anteros):', p1.RANGOS_S.anteros.midpoint);

console.log('\n--- Bloque 8: α ---');
var aDir = al.calcularAlpha({integrado:true, nDoc:1, nivelEvidencia:4, nDom:1, nI:3});
var aGer = al.calcularAlpha({integrado:true, nDoc:4, nivelEvidencia:4, nDom:2, nI:3});
console.log('α(Directivo) =', aDir.toFixed(3));
console.log('α(Gerente)   =', aGer.toFixed(3));

console.log('\n--- Bloque 9: Δ ---');
var dDir = dl.calcularDelta(rRes.vector[0], aDir);
var dGer = dl.calcularDelta(rRes.vector[1], aGer);
console.log('Δ(Directivo) =', dDir.valor.toFixed(3), '→', dDir.signo);
console.log(dDir.diagnostico);
console.log('Δ(Gerente)   =', dGer.valor.toFixed(3), '→', dGer.signo);
console.log(dGer.diagnostico);

console.log('\n--- Bloque 10: Declaración ---');
var idx = rRes.vector.indexOf(Math.max.apply(null, rRes.vector));
var decl = dv.determinarDeclaracion(4, true, true, rRes.vector[idx], rRes.nombresNodos[idx]);
console.log('Declaración tipo:', decl.nivel);
console.log(decl.descripcion);

console.log('\n=== MOTOR MERIADOCK — PRUEBA COMPLETADA ===\n');
