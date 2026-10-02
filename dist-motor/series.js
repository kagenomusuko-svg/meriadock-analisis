'use strict';
const {crearAnalisis,VERSION}=require('./modelo');
const {construirMatrizEmpirica}=require('./grafo');const {calcularRStar}=require('./r_estrella');
const {calcularS}=require('./sustituibilidad');const {calcularAlpha}=require('./alpha');const {calcularDelta}=require('./delta');const {calcularContribucionAtribuible}=require('./derivados');
const {calcularIIC}=require('./iic');const {calcularBStar}=require('./b_estrella');const {calcularDTotal,calcularAjusteDebitor}=require('./danio');const {calcularFraudeAnnona}=require('./fraude_annona');const {determinarDeclaracion,sensibilidadExtendida}=require('./hipercubo');
const definido=x=>x!==null&&x!==undefined;
const salida=(valor,motivo)=>({estado:definido(valor)?'calculado':'indeterminado',valor,motivo:definido(valor)?null:motivo});
const REGISTRY={
 rStar:{dependencias:[],inputs:['nodosActivos','relacionesInternas','conexionesCierre'],calcular:c=>{
  if(!c.modelo.conexionesCierre.length)return salida(null,'Sin contribuciones declaradas al cierre del fenómeno');
  c.escenarios=Object.fromEntries(['min','central','max'].map(k=>[k,calcularRStar(construirMatrizEmpirica(c.modelo,k),c.configuracion.pf)]));
  const r=c.escenarios.central;return {...salida(r.vector,r.motivo),auditoria:r};
 }},
 s:{dependencias:[],inputs:['componentes S por nodo'],calcular:c=>salida(c.nodos.map(n=>({id:n.id,nodo:n.nombre,valor:n.tipo==='instrumental'?null:calcularS(n.s?.componentes,n.s?.pesos),componentes:n.s?.componentes??null,pesos:n.s?.pesos??null})))},
 alpha:{dependencias:[],inputs:['estrategia α explícita por nodo'],calcular:c=>salida(c.nodos.map(n=>{const datos=c.insumos.insumosAlpha?.find(x=>x.id===n.id)||n.alpha;const a=calcularAlpha(datos);return {id:n.id,nodo:n.nombre,valor:a?.valor??null,contrato:a};}))},
 rStarNeta:{dependencias:['rStar','s'],inputs:[],calcular:c=>salida(c.nodos.map((n,i)=>({id:n.id,nodo:n.nombre,valor:calcularContribucionAtribuible(c.resultados.rStar.valor?.[i],c.resultados.s.valor[i].valor)})))},
 delta:{dependencias:['rStar','alpha'],inputs:[],calcular:c=>salida(c.nodos.map((n,i)=>({id:n.id,nodo:n.nombre,resultado:calcularDelta(c.resultados.rStar.valor?.[i],c.resultados.alpha.valor[i].valor)})))},
 iic:{dependencias:[],inputs:['declarado','observado','coincidencias'],calcular:c=>salida(c.nodos.map(n=>{const d=c.insumos.nodosIIC?.find(x=>x.id===n.id)||n.iic;return {id:n.id,nodo:n.nombre,valor:d?calcularIIC(d.declarado,d.observado,d.coincidencias):null,insumos:d??null};}))},
 bStar:{dependencias:[],inputs:['beneficios','unidad'],calcular:c=>calcularBStar(c.nodos,c.insumos.beneficios)},
 dTotal:{dependencias:[],inputs:['danio y unidades comparables'],calcular:c=>salida(calcularDTotal(c.insumos.danio),'Componentes de daño o unidad ausentes/incomparables')},
 ajusteDebitor:{dependencias:['rStar','dTotal'],inputs:[],calcular:c=>salida(calcularAjusteDebitor(c.nodos.map((n,i)=>({id:n.id,nodo:n.nombre,valor:c.resultados.rStar.valor?.[i]??null})),c.resultados.dTotal.valor),'Falta R* o D_total')},
 robustez:{dependencias:['rStar'],inputs:[],calcular:c=>{const v=determinarDeclaracion(c.escenarios);return {...v,valor:v.estado==='calculado'?v:null};}},
 sensibilidadExtendida:{dependencias:['rStar'],inputs:['método explícito'],calcular:c=>sensibilidadExtendida(c.modelo,c.configuracion.sensibilidadExtendida,c.configuracion.pf)},
 fraudeAnnona:{dependencias:['rStar','alpha','iic'],inputs:['protocolo versionado','intervención/prevención'],calcular:c=>calcularFraudeAnnona(c.insumos.fraudeAnnona,c.configuracion.protocoloFraude)}
};
function correrAnalisis({estructura,grafo,insumos={},medicionesSolicitadas=[],configuracion={}}){
 const modelo=crearAnalisis(estructura||grafo),resultados={},c={modelo,nodos:modelo.nodosActivos,insumos,configuracion,resultados,escenarios:{}};
 function ejecutar(id){if(resultados[id])return;if(!REGISTRY[id])throw new Error(`Operador desconocido: ${id}`);const op=REGISTRY[id];op.dependencias.forEach(ejecutar);
  try{resultados[id]={...op.calcular(c),dependencias:op.dependencias,inputs:op.inputs};}catch(e){resultados[id]={estado:'error',valor:null,motivo:e.message,dependencias:op.dependencias,inputs:op.inputs};}
  const value=resultados[id].valor;
  if(Array.isArray(value)&&value.some(x=>x&&typeof x==='object'&&(Object.hasOwn(x,'valor')&&!definido(x.valor)||Object.hasOwn(x,'resultado')&&!definido(x.resultado)))){resultados[id].estado='indeterminado';resultados[id].motivo='Uno o más nodos carecen de insumos; resultados parciales conservados';}
 }
 medicionesSolicitadas.forEach(ejecutar);
 const nodos=c.nodos,central=c.escenarios.central;
 const rStar=nodos.map((n,i)=>({id:n.id,nodo:n.nombre,valor:resultados.rStar?.valor?.[i]??null,s:resultados.s?.valor?.[i]?.valor??null,neta:resultados.rStarNeta?.valor?.[i]?.valor??null}));
 return {versionMotor:VERSION,modelo,medicionesSolicitadas,resultados,escenarios:c.escenarios,auditoria:{convencion:'W_ij = w(N_i → N_j); W R*=ρ R*',versionMotor:VERSION,escenarios:c.escenarios},
  rStar,alpha:resultados.alpha?.valor||[],delta:resultados.delta?.valor||[],serieII:resultados.iic?.valor||[],bStar:resultados.bStar?.valor??null,dTotal:resultados.dTotal?.valor??null,ajusteDebitor:resultados.ajusteDebitor?.valor??null,
  convergencia:central?{convergio:central.convergio,iteraciones:central.iteraciones,metodo:central.metodo,residuo:central.residuo}:null,declaracion:resultados.robustez?.valor??null};
}
function correrAnalisisCompleto(grafo,insumosAlpha,nodosIIC,danio){return correrAnalisis({estructura:grafo,insumos:{insumosAlpha,nodosIIC,danio},medicionesSolicitadas:grafo.medicionesSolicitadas||['rStar','s','rStarNeta','alpha','delta','iic','dTotal','ajusteDebitor','robustez'],configuracion:grafo.configuracion||{}});}
module.exports={REGISTRY,correrAnalisis,correrAnalisisCompleto};
