const {test}=require('node:test'),a=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {calcularSolicitud}=require('../dist-motor/entrada');
const {calcularRStar}=require('../dist-motor/r_estrella');
const casos=require('../auditoria/fixtures/casos-fuente.json');
for(const f of casos)test(`${f.id}: transcripción fuente ≠ procedimiento PF actual`,()=>{
 const edges=f.aristas.map((e,i)=>({...e,id:String(i),rango:{min:e.min,max:e.max},evidenciaNivel:1}));
 const m={eventoDeterminado:{id:'D'},nodosActivos:f.nodos.map(id=>({id})),relacionesInternas:edges.filter(e=>e.destino!=='D'),conexionesCierre:edges.filter(e=>e.destino==='D')};
 const r=calcularSolicitud({analisis:m,medicionesSolicitadas:['rStar']});
 a.equal(r.resultados.rStar.estado,'indeterminado');a.equal(r.resultados.rStar.valor,null);
 a.deepEqual(r.escenarios.central.W_E.ids,f.nodos);a.ok(!r.escenarios.central.W_E.ids.includes('D'));
});
test('PF formal actual: orientación derecha difiere de izquierda',()=>{const r=calcularRStar([[.9,.4],[.1,.6]]);a.ok(Math.abs(r.vector[0]-.8)<1e-9);a.ok(Math.abs(r.vector[1]-.2)<1e-9);a.ok(Math.abs(r.vector[0]-.5)>.2);});
test('RES-RSTAR-001: ejemplo médico por rutas, contraste independiente sin cambiar motor',()=>{const r=[.905,.29*.905,.15],sum=r.reduce((a,b)=>a+b,0);const q=r.map(x=>x/sum);a.ok(Math.abs(q[0]-.687)<.0005);a.ok(Math.abs(q[1]-.199)<.0005);a.ok(Math.abs(q[2]-.114)<.0005);});
test('MCII IIC por correlaciones y fraude histórico: no convertirlos en contrato actual',()=>{a.ok(Math.abs([.18,.35,.61].reduce((x,y)=>x+y,0)/3-.38)<1e-15);a.ok(Math.abs(.20*(1-.1)*(1-.2)-.144)<1e-15);a.ok(.144<.20);});
