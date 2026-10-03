'use strict';
// Diagnóstico de aceptación estricto. Inventario no equivale a revisión.
const {validarDeclarativo}=require('../taxonomia/schema');
const u=require('../taxonomia/datos/universal.v1.json'),d=require('../taxonomia/datos/dominios.v1.json');
const inv=require('../work04/inventario-fuentes.json').capitulos;
const faltantes=[];const ids=new Set();
for(const p of [...u,...d]){validarDeclarativo(p);if(ids.has(p.id+'@'+p.version))throw Error('Versión repetida');ids.add(p.id+'@'+p.version);}
for(const r of inv){const p=[...u,...d].find(p=>p.sourceRef.path===r.sourceRef.path);if(!p||r.estado==='SIN_REVISAR')faltantes.push(r.capitulo);}
if(inv.length!==82)throw Error('Se requieren exactamente 82 capítulos');
if(faltantes.length){console.error('NO ACEPTABLE: capítulos sin revisión/protocolo:',faltantes.join(', '));process.exitCode=1;}else console.log('82 capítulos revisados y protocolos trazables');
