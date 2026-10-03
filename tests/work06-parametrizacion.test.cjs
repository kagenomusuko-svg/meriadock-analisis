const test=require('node:test');
const assert=require('node:assert/strict');
const {PARAMETROS,prepararParametros,crearObservacion}=require('../dist-motor/calibracion');
const {calcularSolicitud}=require('../dist-motor/entrada');
const fixture=require('../auditoria/fixtures/diferencial.json');

test('Work06 clasifica las 203 reglas pendientes sin confundir calibración con operacionalización',()=>{
 assert.equal(PARAMETROS.reglas.length,203);
 assert.equal(PARAMETROS.resumenReglas.RANGO_PROVISIONAL_UTILIZABLE,119);
 assert.equal(PARAMETROS.resumenReglas.COEFICIENTE_PROVISIONAL_UTILIZABLE,1);
 assert.equal(PARAMETROS.resumenReglas.ORIENTACION_NO_NUMERICA,56);
 assert.equal(PARAMETROS.resumenReglas.NO_OPERACIONALIZADO,27);
 assert.equal(PARAMETROS.operadores.OP24.estado,'PARAMETRIZABLE');
 assert.equal(PARAMETROS.operadores.OP13.estado,'NO_OPERACIONALIZADO');
});

test('parámetro provisional confirmado conserva fuente, rango y sensibilidad; sin confirmación no entra',()=>{
 const regla=PARAMETROS.reglas.find(r=>r.id==='cap04.escala_a1');
 assert.throws(()=>prepararParametros([{reglaId:regla.id,rango:regla.valor,sourceRef:regla.sourceRef}]),/confirmación/);
 const p=prepararParametros([{reglaId:regla.id,rango:regla.valor,sourceRef:regla.sourceRef,confirmado:true,protocoloVersion:'tax-cap04@1',confirmadoPor:'analista'}])[0];
 assert.equal(p.estado,'PARAMETRIZADO_PROVISIONALMENTE'); assert.deepEqual(p.sensibilidad.minimo,regla.valor[0]); assert.equal(p.sourceRef.sha,regla.sourceRef.sha);
});

test('snapshot y expediente conservan parametrización provisional sin llamarla calibrada',()=>{
 const regla=PARAMETROS.reglas.find(r=>r.id==='cap04.escala_a1');
 const q={...structuredClone(fixture),parametrosProvisionales:[{reglaId:regla.id,valor:.8,sourceRef:regla.sourceRef,confirmado:true}]};
 const r=calcularSolicitud(q);
 assert.equal(r.parametrizacion.estado,'PARAMETRIZADO_PROVISIONALMENTE');
 assert.equal(r.snapshot.parametrizacion.parametros[0].estado,'PARAMETRIZADO_PROVISIONALMENTE');
 assert.notEqual(r.parametrizacion.estado,'CALIBRADO');
});

test('observación exportable permite contraste posterior sin sobrescribir el resultado',()=>{
 const regla=PARAMETROS.reglas.find(r=>r.id==='cap04.escala_a1');
 const o=crearObservacion({operador:'OP24',dominio:'penal_civil',protocolo:'tax-cap04@1',parametros:[{reglaId:regla.id,valor:.8,sourceRef:regla.sourceRef,confirmado:true}],inputs:{x:1},resultado:.8,observadoPosterior:.75,referencia:'registro externo'});
 assert.equal(o.schema,'observacion-calibracion@1'); assert.ok(Math.abs(o.diferencia+.05)<1e-12); assert.equal(o.parametros[0].estado,'PARAMETRIZADO_PROVISIONALMENTE');
});
