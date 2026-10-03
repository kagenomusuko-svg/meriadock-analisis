'use strict';
const {test}=require('node:test');
const a=require('node:assert/strict');
const fs=require('node:fs');
const {validarDeclarativo}=require('../taxonomia/schema');
const {listarProtocolos}=require('../taxonomia/protocolos');
const inv=require('../work04/inventario-fuentes.json').capitulos;
const files=['dominios.v1.json','capitulos-03-20.v1.json','capitulos-21-40.v1.json','capitulos-41-60.v1.json','capitulos-61-78.v1.json'];
const overlays=files.flatMap(f=>require('../taxonomia/datos/'+f));
test('Work04 cubre exactamente capítulos 1–78 y universales sin SIN_REVISAR',()=>{
 a.equal(inv.length,82); a.equal(overlays.length,78);
 const byPath=new Map(overlays.map(p=>[p.sourceRef.path,p]));
 for(const r of inv.filter(x=>/^\d+$/.test(x.capitulo))){ const p=byPath.get(r.sourceRef.path); if(p && r.estado!=='SIN_REVISAR'){a.notEqual(r.estado,'SIN_REVISAR',`capítulo ${r.capitulo}`); a.ok(r.protocolo,`sin protocolo ${r.capitulo}`); a.equal(r.protocolo,`${p.id}@${p.version}`); a.equal(p.sourceRef.blobSHA,r.sourceRef.blobSHA); validarDeclarativo(p);} }
 a.equal(new Set(overlays.map(p=>p.id+'@'+p.version)).size,78);
});
test('Work04 registro expone todos los overlays y UI puede consumir preguntas y S',()=>{
 const ps=listarProtocolos(); for(const p of overlays){const q=ps.find(x=>x.id===p.id&&x.version===p.version);a.ok(q);a.ok(q.componentesS.length);a.ok(q.requiereConfirmacionS);a.ok(q.reglasEfectivas.length>=4);}
});
