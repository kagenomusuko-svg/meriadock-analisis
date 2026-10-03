'use strict';
const {test}=require('node:test');
const a=require('node:assert/strict');
const {disponibilidad,validarCoberturaOperadores}=require('../dist-motor/operadores-taxonomicos');
const {REGISTRY}=require('../dist-motor/series');
const {calcularSolicitud}=require('../dist-motor/entrada');
const {generarHTML}=require('../dist-motor/expediente');
const fixture=require('../auditoria/fixtures/diferencial.json');

test('Work05 reevalúa OP01–OP45 sin SIN_REVISAR y separa reservas concretas',()=>{
 a.equal(validarCoberturaOperadores(),true);a.equal(disponibilidad.length,45);
 const activos=disponibilidad.filter(x=>x.estado==='ACTIVO');
 a.equal(activos.length,20);
 for(const op of activos){a.ok(op.registro,op.id);a.ok(REGISTRY[op.registro],`${op.id} sin registro ${op.registro}`);a.ok(op.formula,op.id);a.ok(op.inputs.length,op.id);}
 for(const op of disponibilidad.filter(x=>x.estado!=='ACTIVO'))a.ok(op.causaReserva||op.estado==='FUERA',`${op.id} sin causa de reserva`);
});

test('Work05 expone disponibilidad en resultado, snapshot y expediente sin recalcular',()=>{
 const q=structuredClone(fixture);q.medicionesSolicitadas=['rStar'];const r=calcularSolicitud(q);
 a.equal(r.auditoria.operadoresDisponibles.length,45);a.equal(r.snapshot.operadoresDisponibles.length,45);
 a.equal(r.auditoria.operadoresDisponibles.find(x=>x.id==='OP13').estado,'REQUIERE_CALIBRACION');
 a.equal(r.auditoria.operadoresDisponibles.find(x=>x.id==='OP01').registro,'rStar');
 a.match(generarHTML(r),/operadoresDisponibles/);
});

test('Work05 conserva activos avanzados con entradas explícitas y ausencia indeterminada',()=>{
 const q=structuredClone(fixture);q.medicionesSolicitadas=['indiceInversion','conversionVital','roiPrevencion','impactoCausal','brechaBeneficio'];q.insumos={indiceInversion:{disenadorId:'a',ejecutorId:'b',deltaDisenador:.1,deltaEjecutor:-.56},conversionVital:{monto:100,salarioReferencia:10,unidad:'MXN'},roiPrevencion:{danioTotal:50,costo:10,deltaP:.2,unidad:'MXN',baseDeltaP:'estudio externo'},comparacion:{referenciaAntes:'A',referenciaDespues:'B',baseComparabilidad:'misma muestra',valores:[{id:'a',rAntes:.5,rDespues:.4},{id:'b',rAntes:.5,rDespues:.6}]},brechaBeneficio:{unidad:'MXN',valores:[{id:'a',recibido:10,revertido:4},{id:'b',recibido:2,revertido:1}]}};
 const r=calcularSolicitud(q);a.equal(r.resultados.indiceInversion.estado,'calculado');a.equal(r.resultados.conversionVital.estado,'calculado');a.equal(r.resultados.roiPrevencion.estado,'calculado');a.equal(r.resultados.impactoCausal.estado,'calculado');a.equal(r.resultados.brechaBeneficio.estado,'calculado');
 delete q.insumos.roiPrevencion.deltaP;a.equal(calcularSolicitud(q).resultados.roiPrevencion.estado,'indeterminado');
});
