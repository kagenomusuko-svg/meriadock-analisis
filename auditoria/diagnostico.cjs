'use strict';
// Caracterización: NO corrige runtime. Ejecutar: node --expose-gc auditoria/diagnostico.cjs
const fs=require('node:fs'),path=require('node:path'),{performance}=require('node:perf_hooks');
const {calcularRStar}=require('../dist-motor/r_estrella');
const {construirMatrizEmpirica,diagnosticar,desdeDensa}=require('../dist-motor/grafo');
const {calcularSolicitud}=require('../dist-motor/entrada');
const {calcularBStar}=require('../dist-motor/b_estrella');
const {calcularDTotal}=require('../dist-motor/danio');
const {crearAnalisis}=require('../dist-motor/modelo');
const {generarHTML}=require('../dist-motor/expediente');
const {determinarDeclaracion}=require('../dist-motor/hipercubo');
function modelo(){return {titulo:'Auditoría sintética',pregunta:'¿Qué calcula?',fenomeno:{descripcion:'Sintético'},eventoDeterminado:{id:'D',descripcion:'D'},nodosActivos:[{id:'a',nombre:'A'},{id:'b',nombre:'B'}],relacionesInternas:[['a','a',.9],['a','b',.4],['b','a',.1],['b','b',.6]].map(([origen,destino,p],i)=>({id:String(i),origen,destino,rango:{min:p,max:p},evidenciaNivel:1})),conexionesCierre:[{origen:'a',destino:'D',rango:{min:1,max:1},evidenciaNivel:1}]};}
function resumen(r){return {estado:r.estado,vector:r.vector,rho:r.eigenvalorDominante,iteraciones:r.iteraciones,residuo:r.residuo,error:r.errorFinal,diagnostico:r.diagnostico,condicionesSuficientes:r.condicionesSuficientes};}
const escala=[];
for(const n of [1,2,10,100,1000,10000]){
 const nodosActivos=Array.from({length:n},(_,i)=>({id:String(i)}));
 const relacionesInternas=nodosActivos.flatMap((a,i)=>[ {origen:a.id,destino:a.id,rango:{min:1+(i%7)/100,max:1+(i%7)/100}},...(n>1?[{origen:a.id,destino:String((i+1)%n),rango:{min:.4,max:.4}}]:[]) ]);
 const m={nodosActivos,relacionesInternas};if(global.gc)global.gc();const antes=process.memoryUsage(),t=performance.now();const W=construirMatrizEmpirica(m);const r=calcularRStar(W,{maxIteraciones:1000,regularizacion:{epsilon:1e-4,K:{tipo:'constante',valor:1/n}}});
 escala.push({n,aristas:W.entradas.length,tiempoMs:performance.now()-t,heapDelta:process.memoryUsage().heapUsed-antes.heapUsed,rss:process.memoryUsage().rss,iteraciones:r.iteraciones,residuo:r.residuo,estado:r.estado,suma:r.sumaVector,entradaJSONBytes:Buffer.byteLength(JSON.stringify(W)),sinMatrizDensa:!W.matriz,rondas:r.rondas.length});
}
const casos={};
for(const [id,W] of Object.entries({canonica:[[.9,.4],[.1,.6]],diagonal:[[1,0],[0,.5]],identidad:[[1,0],[0,1]],periodicaEquilibrada:[[0,1],[1,0]],periodicaDesequilibrada:[[0,2],[1,0]],nula:[[0,0],[0,0]],nilpotente:[[0,.5],[0,0]],unNodo:[[.4]],unNodoNulo:[[0]]}))casos[id]=resumen(calcularRStar(W,{maxIteraciones:100}));
const epsilon=[.1,.01,.001,.0001,.00001].map(e=>({epsilon:e,...resumen(calcularRStar([[1,0],[0,0]],{regularizacion:{epsilon:e,K:{tipo:'constante',valor:1}}}))}));
const m=modelo();
const r=calcularSolicitud({analisis:m,medicionesSolicitadas:['rStar','bStar'],insumos:{beneficios:{unidad:'MXN',valores:[{id:'a',valor:30},{id:'b',valor:10}]}}});
const cierreE0=modelo();cierreE0.conexionesCierre[0].evidenciaNivel=0;
const sinCierre=modelo();sinCierre.conexionesCierre=[];
const idsDuplicados=modelo();idsDuplicados.relacionesInternas[1].id='0';
const html=generarHTML(r,r.modelo);
const empateSecundario=determinarDeclaracion({min:{vector:[.6,.2,.2]},central:{vector:[.6,.20000000000000004,.19999999999999996]},max:{vector:[.6,.2,.2]}});
const resultado={fechaUTC:new Date().toISOString(),node:process.version,escala,casos,epsilon,
 cierreE0:calcularSolicitud({analisis:cierreE0,medicionesSolicitadas:['rStar']}).resultados.rStar.estado,
 sinCierre:calcularSolicitud({analisis:sinCierre,medicionesSolicitadas:['rStar']}).resultados.rStar.estado,
 idsRelacionDuplicadosAceptados:crearAnalisis(idsDuplicados).relacionesInternas.map(e=>e.id),
 expedienteBeneficio:{unidadConservadaEnRespuesta:r.resultados.bStar.unidad,unidadEnHTML:html.replace(/data:image[^\" ]+/g,'').includes('MXN'),totalEnHTML:html.includes('"total": 40')},
 empateSecundario,
 beneficiosConPerdida:calcularBStar(m.nodosActivos,{unidad:'MXN',valores:[{id:'a',valor:-10},{id:'b',valor:20}]}),
 overflowBeneficio:calcularBStar(m.nodosActivos,{unidad:'MXN',valores:[{id:'a',valor:1e308},{id:'b',valor:1e308}]}),
 overflowDanio:calcularDTotal({unidad:'MXN',tInvertido:{monto:1e308},tImpedido:{monto:1e308},tTrayectoria:{monto:0}}),
 alphaExterno:calcularSolicitud({analisis:m,medicionesSolicitadas:['delta'],insumos:{insumosAlpha:[{id:'a',estrategia:'discriminado',valor:.1},{id:'b',estrategia:'discriminado',valor:.1}]}}).mensajes,
 sinDatos:calcularSolicitud({analisis:{nodosActivos:[{id:'a'}]},medicionesSolicitadas:['s','alpha','iic','bStar','dTotal','fraudeAnnona']}).resultados
};
const out=path.join(__dirname,'evidencia','diagnostico.json');fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(resultado,null,2));console.log(out);console.log(JSON.stringify({escala,casos,epsilon,expedienteBeneficio:resultado.expedienteBeneficio,empateSecundario,overflowBeneficio:resultado.overflowBeneficio,overflowDanio:resultado.overflowDanio},null,2));
module.exports={modelo};
