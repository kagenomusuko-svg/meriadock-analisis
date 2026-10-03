'use strict';
// Sólo lectura/cálculo sin persistencia. READY se confirma además mediante Vercel.
const {setTimeout:esperar}=require('node:timers/promises');
const fixture=require('../auditoria/fixtures/diferencial.json');
(async()=>{for(let intento=0;intento<30;intento++){
 try{const res=await fetch('https://meriadock-analisis.vercel.app/api/calcular',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...fixture,medicionesSolicitadas:['dTotal']}),signal:AbortSignal.timeout(10000)});const r=await res.json();if(res.ok&&r.snapshot?.revisionFuente===process.env.EXPECTED_COMMIT){console.log('Producción sirve revisión exacta: '+r.snapshot.revisionFuente);return;}}
 catch(e){console.log('Esperando despliegue: '+e.message);}await esperar(5000);
 }throw Error('Producción no sirve la revisión exacta dentro del presupuesto de espera');})().catch(e=>{console.error(e);process.exitCode=1;});
