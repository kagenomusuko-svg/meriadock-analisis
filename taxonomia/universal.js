'use strict';
const protocolos=require('./datos/universal.v1.json');
const {validarDeclarativo}=require('./schema');protocolos.forEach(validarDeclarativo);
function orientarHijo(r={}){
 const salida=(estado,hijo=null,motivo='')=>({estado,hijo,motivo,confirmado:false,sourceRef:protocolos[0].reglas.find(x=>x.id==='u1.arbol').sourceRef});
 const confirmar=h=>r.patronSostenido==='si'?salida('CONFIRMABLE',h,'Requiere confirmación humana'):salida('HIPOTESIS',h,'Patrón sostenido no confirmado');
 if(!['si','no'].includes(r.energia))return salida('INDETERMINADO',null,'Falta discriminación');
 if(r.energia==='no'){
  if(r.ausencia==='selectiva')return confirmar('deimos');
  if(r.ausencia!=='generalizada')return salida('INDETERMINADO');
  if(r.busquedaAusente==='si')return confirmar('deimos');
  return r.busquedaAusente==='no'?salida('REQUIERE_ECO',null,'Ausencia de fricción no acredita Harmonía'):salida('INDETERMINADO');
 }
 if(!['reactiva','proactiva'].includes(r.direccion))return salida('INDETERMINADO');
 if(r.direccion==='reactiva'){if(r.desproporcion==='si')return confirmar('fobos');if(r.desproporcion!=='no')return salida('INDETERMINADO');}
 if(r.friccion==='si')return confirmar('anteros');if(r.friccion!=='no')return salida('INDETERMINADO');
 if(r.orientacion==='pasado')return salida('HIPOTESIS','potos','Incertidumbre alta; requiere presencia para confirmar');
 if(r.orientacion==='nuevo')return salida('HIPOTESIS','eros','Incertidumbre alta; requiere presencia para confirmar');
 return r.orientacion==='no_clara'?salida('REQUIERE_ECO'):salida('INDETERMINADO');
}
function validarDistribucion(p,{presencia=false,noDisponible=false,confirmado=false,justificaciones={}}={}){
 const hs=['fobos','deimos','anteros','eros','potos','harmonia'];if(!confirmado||!p||hs.some(h=>!Number.isFinite(p[h])||p[h]<0||p[h]>1)||Math.abs(hs.reduce((s,h)=>s+p[h],0)-1)>1e-12)return {estado:'indeterminado',motivo:'Distribución completa y confirmación requeridas'};
 if(!presencia&&p.harmonia!==0||noDisponible&&['eros','potos','harmonia'].some(h=>p[h]!==0))return {estado:'error',motivo:'Localización inaccesible'};
 if(hs.some(h=>p[h]>0&&!justificaciones[h]))return {estado:'indeterminado',motivo:'Justificación observacional por peso requerida'};
 return {estado:'calculado',valor:structuredClone(p),concluyente:Math.max(...hs.map(h=>p[h]))>.4,incertidumbreAlta:['potos','eros'].filter(h=>p[h]>0)};
}
function intervaloRutaA(p,contrato){const v=validarDistribucion(p,contrato);if(v.estado!=='calculado')return v;const reglas=protocolos[2].reglas.filter(r=>r.id.startsWith('u3.sa.'));return {estado:'sugerencia',rango:[0,1].map(k=>reglas.reduce((s,r)=>s+p[r.id.split('.').at(-1)]*r.valor[k],0)),distribucion:v,confirmado:false};}
function combinarRangos(rangos){if(!Array.isArray(rangos)||!rangos.length||rangos.some(r=>!Array.isArray(r)||r.length!==2||r.some(x=>!Number.isFinite(x))||r[0]<0||r[1]<r[0]))return {estado:'indeterminado',rango:null};const a=Math.max(...rangos.map(r=>r[0])),b=Math.min(...rangos.map(r=>r[1]));return a<=b?{estado:'sugerencia',rango:[a,b],rangos:structuredClone(rangos),confirmado:false}:{estado:'contradiccion',rango:null,rangos:structuredClone(rangos),motivo:'Intersección vacía: requiere nueva discriminación, no promedio'};}
module.exports={protocolos,orientarHijo,validarDistribucion,intervaloRutaA,combinarRangos};
