const {test}=require('node:test');const a=require('node:assert/strict');
const {construirSolicitud}=require('../components/constructor/entrada');const {calcularSolicitud}=require('../dist-motor/entrada');const {generarHTML,generarNarrativa}=require('../dist-motor/expediente');const {mensajesAnalisis}=require('../dist-motor/linter');const {cargarJSON,cargarProtocolo}=require('../taxonomia/protocolos');
function fixture(){return {familia:'contabilidad_ontologica',dominio:'genérico',titulo:'Fenómeno <script>alert(1)</script>',pregunta:'¿Cómo converge?',descripcion:'Fenómeno declarado',evento:'D',nodos:[{id:'a',nombre:'A',componentesS:['0','.4','.1'],estrategiaAlpha:'discriminado',alphaValor:'.08',declarado:'x\ny',observado:'x',coincidencias:'1',beneficio:'30'},{id:'b',nombre:'B',beneficio:'10'}],relaciones:[{id:'1',origen:'a',destino:'a',evidenciaNivel:'1',min:'.9',max:'.9'},{id:'2',origen:'a',destino:'b',evidenciaNivel:'1',min:'.4',max:'.4'},{id:'3',origen:'b',destino:'a',evidenciaNivel:'1',min:'.1',max:'.1'},{id:'4',origen:'b',destino:'b',evidenciaNivel:'1',min:'.6',max:'.6'},{id:'5',origen:'a',destino:'D',evidenciaNivel:'1',min:'1',max:'1'}],mediciones:['delta','iic','bStar','ajusteDebitor','robustez'],unidadDanio:'MXN',unidadBeneficio:'MXN',tInvertido:'100',tImpedido:'20',tTrayectoria:'30'};}
test('Constructor → solicitud → motor → expediente con mismo daño/IIC/B*',()=>{
 const body=construirSolicitud(fixture()),r=calcularSolicitud(body);a.equal(r.dTotal.dTotal,150);a.equal(r.serieII[0].valor,.5);a.equal(r.bStar[0].valor,.75);a.equal(r.rStar.length,2);
 const html=generarHTML(r,r.modelo);a.match(html,/150/);a.match(html,/120/);a.ok(!html.includes('<script>alert'));a.ok(html.includes('&lt;script&gt;'));a.equal(html,generarHTML(r,r.modelo));a.equal(generarNarrativa(r),generarNarrativa(r));a.ok(!html.includes('Tres Series'));a.ok(!html.includes('HISTOS'));
 // Exportar no toca el grafo ni recalcula una matriz.
 const audit=JSON.stringify(r.auditoria);generarHTML(r,{nodos:[],aristas:[]});a.equal(JSON.stringify(r.auditoria),audit);
});
test('familias no bloquean repertorio; campos vacíos se conservan como null',()=>{
 for(const familia of ['imputacion_causal','compliance_causal','contabilidad_ontologica']){const f=fixture();f.familia=familia;f.tTrayectoria='';const body=construirSolicitud(f);a.equal(body.insumos.danio.tTrayectoria.montoEstimado,null);const r=calcularSolicitud(body);a.equal(r.dTotal,null);a.equal(r.resultados.ajusteDebitor.estado,'indeterminado');a.ok(r.rStar[0].valor>.79);}
});
test('linter determinista y E0 epistémico',()=>{
 const f=fixture();f.relaciones.push({id:'e0',origen:'b',destino:'D',evidenciaNivel:'0',min:'0',max:'0',soportes:'declarado'});const body=construirSolicitud(f);const m=mensajesAnalisis(body.analisis,body.medicionesSolicitadas);a.deepEqual(m,mensajesAnalisis(body.analisis,body.medicionesSolicitadas));a.ok(m.some(x=>x.codigo==='WARN_E0'));a.ok(m.some(x=>x.codigo==='ERR_DELTA_SIN_ALPHA'));a.ok(m.some(x=>x.codigo==='WARN_REFERENCIA_AUSENTE'));
});
test('Taxonomía versionada se añade sin cambiar fórmulas',()=>{
 const p={id:'nuevo',version:'1',dominios:['otro'],componentesS:[{id:'x',texto:'Componente X'}],preguntas:[],rangos:[]};cargarJSON(JSON.stringify(p));a.deepEqual(cargarProtocolo('nuevo','1'),p);a.throws(()=>cargarJSON(JSON.stringify(p)));a.throws(()=>cargarProtocolo('nuevo','2'));
});
