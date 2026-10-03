'use strict';
const {crearAnalisis}=require('./modelo');
const {calcularAlpha}=require('./alpha');
function alphaDisponible(n,protocolo){try{return !!calcularAlpha(n.alpha,protocolo);}catch{return false;}}
const REGLAS=[
 {codigo:'ERR_TITULO_AUSENTE',nivel:'ERROR',operadores:[],test:m=>!m.titulo?.trim(),texto:'Falta el título del análisis.'},
 {codigo:'ERR_PREGUNTA_AUSENTE',nivel:'ERROR',operadores:[],test:m=>!m.pregunta?.trim(),texto:'Falta la pregunta del análisis.'},
 {codigo:'ERR_FENOMENO_AUSENTE',nivel:'ERROR',operadores:[],test:m=>!m.fenomeno?.descripcion?.trim(),texto:'Falta describir el fenómeno.'},
 {codigo:'ERR_NODOS_AUSENTES',nivel:'ERROR',operadores:['rStar'],test:m=>!m.nodosActivos.length,texto:'Faltan nodos activos.'},
 {codigo:'ERR_RSTAR_SIN_APORTES',nivel:'ERROR',operadores:['rStar'],test:(m,s)=>s.has('rStar')&&!m.conexionesCierre.length,texto:'R* requiere declarar contribuciones al cierre del fenómeno.'},
 {codigo:'ERR_DELTA_SIN_ALPHA',nivel:'ERROR',operadores:['delta'],porNodo:true,test:(m,s,n,p)=>s.has('delta')&&!alphaDisponible(n,p),texto:'Δ requiere una estrategia y un valor de α para este nodo.'},
 {codigo:'INFO_S_DISPONIBLE',nivel:'INFO',operadores:['s'],porNodo:true,test:(m,s,n)=>n.tipo!=='instrumental'&&(!n.s?.componentes?.length||!n.s.componentes.every(x=>x!==null&&x!==undefined)),texto:'Puedes discriminar los componentes de S.'},
 {codigo:'INFO_IIC_DISPONIBLE',nivel:'INFO',operadores:['iic'],porNodo:true,test:(m,s,n)=>!!n.iic?.declarado?.length&&!!n.iic?.observado?.length,texto:'Hay declaraciones y observaciones para calcular IIC con coincidencias identificadas.'},
 {codigo:'WARN_E0',nivel:'WARN',operadores:['rStar'],porRelacion:true,test:(m,s,e)=>e.evidenciaNivel===0||e.nivelEvidencia===0,texto:'E0 es cero epistémico: la transición no está materialmente acreditada; el nodo permanece.'},
 {codigo:'WARN_REFERENCIA_AUSENTE',nivel:'WARN',operadores:[],porRelacion:true,test:(m,s,e)=>!!e.soportes?.length&&!e.referencia,texto:'Hay soporte declarado sin referencia opcional.'},
 {codigo:'WARN_MODO_NO_LOCALIZADO',nivel:'WARN',operadores:[],porNodo:true,test:(m,s,n)=>!!n.observacionModo&&!n.modo||n.modo==='indeterminado'&&!!n.observacionModo,texto:'Observación modal conservada sin localización definitiva; protocolo taxonómico pendiente.'}
];
function mensajesAnalisis(input,solicitadas=[],protocolo=null){
 let m;try{m=crearAnalisis(input);}catch(e){return [{codigo:'ERR_ESTRUCTURA_INVALIDA',nivel:'ERROR',operadores:['rStar'],texto:e.message}];}const s=new Set(solicitadas);
 if(['rStarNeta','delta','ajusteDebitor','robustez','sensibilidadExtendida','fraudeAnnona'].some(x=>s.has(x)))s.add('rStar');
 return REGLAS.flatMap(r=>(r.porNodo?m.nodosActivos:r.porRelacion?[...m.relacionesInternas,...m.conexionesCierre]:[null]).filter(x=>r.test(m,s,x,protocolo)).map(x=>({codigo:r.codigo,nivel:r.nivel,operadores:r.operadores,nodo:r.porNodo?x.id:undefined,relacion:r.porRelacion?x.id:undefined,texto:r.texto})));
}
module.exports={REGLAS,mensajesAnalisis};
