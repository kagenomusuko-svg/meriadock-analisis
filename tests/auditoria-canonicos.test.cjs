const {test}=require('node:test'),a=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {calcularSolicitud}=require('../dist-motor/entrada');
const {calcularRStar}=require('../dist-motor/r_estrella');
const casos=require('../auditoria/fixtures/casos-fuente.json');
for(const f of casos.filter(x=>x.id!=='MCI-ALTAMIRANO'))test(`${f.id}: transcripción fuente ≠ procedimiento PF actual`,()=>{
 const edges=f.aristas.map((e,i)=>({...e,id:String(i),rango:{min:e.min,max:e.max},evidenciaNivel:1}));
 const m={eventoDeterminado:{id:'D'},nodosActivos:f.nodos.map(id=>({id})),relacionesInternas:edges.filter(e=>e.destino!=='D'),conexionesCierre:edges.filter(e=>e.destino==='D')};
 const r=calcularSolicitud({analisis:m,medicionesSolicitadas:['rStar']});
 a.equal(r.resultados.rStar.estado,'indeterminado');a.equal(r.resultados.rStar.valor,null);
 a.deepEqual(r.escenarios.central.W_E.ids,f.nodos);a.ok(!r.escenarios.central.W_E.ids.includes('D'));
});
test('PF formal actual: orientación derecha difiere de izquierda',()=>{const r=calcularRStar([[.9,.4],[.1,.6]]);a.ok(Math.abs(r.vector[0]-.8)<1e-9);a.ok(Math.abs(r.vector[1]-.2)<1e-9);a.ok(Math.abs(r.vector[0]-.5)>.2);});
test('RES-RSTAR-001: ejemplo médico por rutas, contraste independiente sin cambiar motor',()=>{const r=[.905,.29*.905,.15],sum=r.reduce((a,b)=>a+b,0);const q=r.map(x=>x/sum);a.ok(Math.abs(q[0]-.687)<.0005);a.ok(Math.abs(q[1]-.199)<.0005);a.ok(Math.abs(q[2]-.114)<.0005);});
test('MCII IIC por correlaciones y fraude histórico: no convertirlos en contrato actual',()=>{a.ok(Math.abs([.18,.35,.61].reduce((x,y)=>x+y,0)/3-.38)<1e-15);a.ok(Math.abs(.20*(1-.1)*(1-.2)-.144)<1e-15);a.ok(.144<.20);});

test('Altamirano: PF actual registra reducibilidad y no reproduce el vector histórico',()=>{const f=casos.find(x=>x.id==='MCI-ALTAMIRANO');const e=f.aristas.map((e,i)=>({...e,id:String(i),rango:{min:e.min,max:e.max},evidenciaNivel:1}));const r=calcularSolicitud({analisis:{eventoDeterminado:{id:'D'},nodosActivos:f.nodos.map(id=>({id})),relacionesInternas:e.filter(x=>x.destino!=='D'),conexionesCierre:e.filter(x=>x.destino==='D')},medicionesSolicitadas:['rStar']});a.equal(r.resultados.rStar.estado,'indeterminado');a.equal(r.escenarios.central.diagnostico.irreducible,false);a.equal(r.escenarios.central.diagnostico.periodo,null);a.equal(r.escenarios.central.aproximacion[3],0);});

test('CF12 Chevron: enumeración independiente de Shapley localiza errata de porcentajes',()=>{const f=require('../auditoria/fixtures/aritmetica-fuente.json').chevron;const permutations=[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],phi=[0,0,0];for(const order of permutations){const s=[];let prev=0;for(const i of order){s.push(i);const v=f.coaliciones[[...s].sort().join('')];phi[i-1]+=(v-prev)/6;prev=v;}}for(let i=0;i<3;i++){a.ok(Math.abs(phi[i]-f.marginalesExactos[i])<1e-14);a.ok(Math.abs(phi[i]-f.impreso[i])>.001);}a.ok(Math.abs(phi.reduce((x,y)=>x+y,0)-1)<1e-14);});
test('CF16 I_inv: bajo numerador fijo, denominador creciente implica cociente decreciente',()=>{const f=require('../auditoria/fixtures/aritmetica-fuente.json').inversion;a.equal(f.brechaDisenador/f.excesoEjecutorAntes,f.cocienteAntes);a.ok(Math.abs(f.brechaDisenador/f.excesoEjecutorDespues-f.cocienteDespues)<1e-14);a.ok(f.cocienteDespues<f.cocienteAntes);});
