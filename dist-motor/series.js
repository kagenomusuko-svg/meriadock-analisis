'use strict';
const {crearAnalisis,VERSION}=require('./modelo');
const {construirMatrizEmpirica}=require('./grafo');const {calcularRStar}=require('./r_estrella');
const {calcularS}=require('./sustituibilidad');const {calcularAlpha}=require('./alpha');const {calcularDelta}=require('./delta');const {calcularContribucionAtribuible}=require('./derivados');
const {calcularIIC}=require('./iic');const {calcularBStar}=require('./b_estrella');const {calcularDTotal,calcularAjusteDebitor}=require('./danio');const {fraudeDelDisenador}=require('./fraude_annona');const {determinarDeclaracion,sensibilidadExtendida}=require('./hipercubo');
const ampliacion=require('./ampliacion');
const {disponibilidad}=require('./operadores-taxonomicos');
const {exigirFinitud}=require('./numerica');
const definido=x=>x!==null&&x!==undefined;
const salida=(valor,motivo)=>({estado:definido(valor)?'calculado':'indeterminado',valor,motivo:definido(valor)?null:motivo});
const REGISTRY={
 rStar:{dependencias:[],inputs:['nodosActivos','relacionesInternas','conexionesCierre'],calcular:c=>{
  if(!c.modelo.conexionesCierre.some(e=>e.estadoClausura==='declarado_valido'))return salida(null,'Clausura no acreditada o incompleta: declara nivel E1–E8 y rango válido del cierre; E0 no niega causalidad');
  c.escenarios=Object.fromEntries(['min','central','max'].map(k=>[k,calcularRStar(construirMatrizEmpirica(c.modelo,k),c.configuracion.pf)]));
  const r=c.escenarios.central;return {...salida(r.vector,r.motivo),auditoria:r};
 }},
 s:{dependencias:[],inputs:['componentes S por nodo'],calcular:c=>salida(c.nodos.map(n=>({id:n.id,nodo:n.nombre,valor:n.tipo==='instrumental'||c.protocolo&&n.s?.componentes?.length!==c.protocolo.componentesS.length||c.protocolo?.requiereConfirmacionS&&(n.s?.confirmado!==true||typeof n.s?.referencia!=='string'||!n.s.referencia.trim())?null:calcularS(n.s?.componentes,n.s?.pesos),componentes:n.s?.componentes??null,pesos:n.s?.pesos??null})))},
 alpha:{dependencias:[],inputs:['estrategia α explícita por nodo'],calcular:c=>salida(c.nodos.map(n=>{const datos=c.insumos.insumosAlpha?.find(x=>x.id===n.id)||n.alpha;const a=calcularAlpha(datos,c.protocolo);return {id:n.id,nodo:n.nombre,valor:a?.valor??null,contrato:a};}))},
 rStarNeta:{dependencias:['rStar','s'],inputs:[],calcular:c=>salida(c.nodos.map((n,i)=>({id:n.id,nodo:n.nombre,valor:calcularContribucionAtribuible(c.resultados.rStar.valor?.[i],c.resultados.s.valor[i].valor)})))},
 delta:{dependencias:['rStar','alpha'],inputs:[],calcular:c=>salida(c.nodos.map((n,i)=>({id:n.id,nodo:n.nombre,resultado:calcularDelta(c.resultados.rStar.valor?.[i],c.resultados.alpha.valor[i].valor)})))},
 iic:{dependencias:[],inputs:['declarado','observado','coincidencias'],calcular:c=>salida(c.nodos.map(n=>{const d=c.insumos.nodosIIC?.find(x=>x.id===n.id)||n.iic;return {id:n.id,nodo:n.nombre,valor:d&&(!d.varianteIIC||d.varianteIIC==='congruencia@1')?calcularIIC(d.declarado,d.observado,d.coincidencias):null,motivo:d?.varianteIIC&&d.varianteIIC!=='congruencia@1'?'Variante IIC no activa; no sustituir por congruencia':undefined,insumos:d??null,varianteIIC:d?.varianteIIC||'congruencia@1'};}))},
 bStar:{dependencias:[],inputs:['beneficios','unidad'],calcular:c=>calcularBStar(c.nodos,c.insumos.beneficios)},
 dTotal:{dependencias:[],inputs:['danio y unidades comparables'],calcular:c=>salida(calcularDTotal(c.insumos.danio),'Componentes de daño o unidad ausentes/incomparables')},
 ajusteDebitor:{dependencias:['rStar','dTotal'],inputs:[],calcular:c=>salida(calcularAjusteDebitor(c.nodos.map((n,i)=>({id:n.id,nodo:n.nombre,valor:c.resultados.rStar.valor?.[i]??null})),c.resultados.dTotal.valor),'Falta R* o D_total')},
 robustez:{dependencias:['rStar'],inputs:[],calcular:c=>{const v=determinarDeclaracion(c.escenarios);return {...v,valor:v.estado==='calculado'?v:null};}},
 sensibilidadExtendida:{dependencias:['rStar'],inputs:['método explícito'],calcular:c=>sensibilidadExtendida(c.modelo,c.configuracion.sensibilidadExtendida,c.configuracion.pf)},
 roiPrevencion:{dependencias:[],inputs:['D_total','costo','deltaP externo','unidad y base'],calcular:c=>ampliacion.roiPrevencion(c.insumos.roiPrevencion)},
 indiceInversion:{dependencias:[],inputs:['roles explícitos','Delta diseñador/ejecutor'],calcular:c=>ampliacion.indiceInversion(c.insumos.indiceInversion,c.nodos)},
 shapley:{dependencias:[],inputs:['juego v(S) completo','unidad'],calcular:c=>ampliacion.shapley(c.insumos.shapley,c.nodos,c.configuracion.shapley)},
 justiciaEstructural:{dependencias:['delta'],inputs:[],calcular:c=>ampliacion.justicia(c.nodos.map(n=>c.resultados.delta.valor?.find(x=>x.id===n.id)?.resultado?.valor??null))},
 conversionVital:{dependencias:[],inputs:['monto','salario de referencia por hora','moneda'],calcular:c=>ampliacion.conversionVital(c.insumos.conversionVital)},
 impactoCausal:{dependencias:[],inputs:['dos vectores comparables','referencias','IDs'],calcular:c=>ampliacion.impacto(c.insumos.comparacion,c.nodos)},
 aprendizajeSistemico:{dependencias:[],inputs:['R*/alpha antes/después','referencias'],calcular:c=>ampliacion.aprendizaje(c.insumos.comparacion,c.nodos)},
 brechaBeneficio:{dependencias:[],inputs:['B_i absoluto','beta absoluto','unidad'],calcular:c=>ampliacion.brechaBeneficio(c.insumos.brechaBeneficio,c.nodos)},
 fraudeAnnona:{dependencias:['rStar','alpha','iic'],inputs:['disenadorId activo','rol diseñador explícito','variante IIC identificada'],calcular:fraudeDelDisenador}
};
function correrAnalisis({estructura,grafo,insumos={},medicionesSolicitadas=[],configuracion={},protocolo=null}){
 const fuente=estructura||grafo;if(!Array.isArray(medicionesSolicitadas)||medicionesSolicitadas.some(x=>typeof x!=='string'))throw new Error('Lista de operadores inválida');
 let modelo,errorEstructura=null,errorNodos=null;
 try{modelo=crearAnalisis(fuente);}catch(e){errorEstructura=e.message;try{modelo=crearAnalisis({...fuente,nodosActivos:fuente.nodosActivos||fuente.nodos||[],relacionesInternas:[],aristas:[],conexionesCierre:[]});}catch(n){errorNodos=n.message;modelo={...fuente,nodosActivos:[],relacionesInternas:[],conexionesCierre:[]};}}
 const resultados={},nodos=modelo.nodosActivos.map(n=>({...n,alpha:insumos.insumosAlpha?.find(x=>x.id===n.id)||n.alpha,iic:insumos.nodosIIC?.find(x=>x.id===n.id)||n.iic}));
 modelo={...modelo,nodosActivos:nodos,nodos};
 const c={modelo,nodos,insumos,configuracion,resultados,protocolo,escenarios:{}};
 function ejecutar(id){
  if(resultados[id])return;
  const op=REGISTRY[id];if(!op){resultados[id]={estado:'error',valor:null,motivo:'Operador desconocido: '+id};return;}
  op.dependencias.forEach(ejecutar);
  try{
   if(errorEstructura&&['rStar','sensibilidadExtendida'].includes(id))throw new Error(errorEstructura);
   if(errorNodos&&id!=='dTotal')throw new Error(errorNodos);
   resultados[id]={...op.calcular(c),dependencias:op.dependencias,inputs:op.inputs};
   exigirFinitud(resultados[id]);
  }catch(e){resultados[id]={estado:'error',valor:null,motivo:e.message,dependencias:op.dependencias,inputs:op.inputs};}
  const value=resultados[id].valor;
  if(Array.isArray(value)&&(!value.length||value.some(x=>x&&typeof x==='object'&&(Object.hasOwn(x,'valor')&&!definido(x.valor)||Object.hasOwn(x,'resultado')&&!definido(x.resultado))))){resultados[id].estado='indeterminado';resultados[id].motivo='Uno o más nodos carecen de insumos; resultados parciales conservados';}
 }
 medicionesSolicitadas.forEach(ejecutar);
 for(const id of Object.keys(REGISTRY))if(!resultados[id])resultados[id]={estado:'no_solicitado',valor:null,motivo:'Medición no solicitada ni requerida como dependencia'};
 const central=c.escenarios.central;
 const rStar=nodos.map((n,i)=>({id:n.id,nodo:n.nombre,valor:resultados.rStar?.valor?.[i]??null,s:resultados.s?.valor?.[i]?.valor??null,neta:resultados.rStarNeta?.valor?.[i]?.valor??null}));
 return {versionMotor:VERSION,modelo,medicionesSolicitadas,resultados,escenarios:c.escenarios,validacion:{estructuraValida:!errorEstructura,nodosValidos:!errorNodos,errorEstructura,errorNodos},auditoria:{convencion:'W_ij = w(N_i → N_j); W R*=ρ R*',versionMotor:VERSION,revisionFuente:process.env.VERCEL_GIT_COMMIT_SHA||process.env.GITHUB_SHA||'local-sin-SHA-declarado',escenarios:c.escenarios,operadoresDisponibles:disponibilidad.map(x=>({id:x.id,estado:x.estado,registro:x.registro||null}))},
  rStar,alpha:resultados.alpha?.valor||[],delta:resultados.delta?.valor||[],serieII:resultados.iic?.valor||[],bStar:resultados.bStar?.valor??null,dTotal:resultados.dTotal?.valor??null,ajusteDebitor:resultados.ajusteDebitor?.valor??null,
  convergencia:central?{convergio:central.convergio,iteraciones:central.iteraciones,metodo:central.metodo,residuo:central.residuo}:null,declaracion:resultados.robustez?.valor??null};
}
function correrAnalisisCompleto(grafo,insumosAlpha,nodosIIC,danio){return correrAnalisis({estructura:grafo,insumos:{insumosAlpha,nodosIIC,danio},medicionesSolicitadas:grafo.medicionesSolicitadas||['rStar','s','rStarNeta','alpha','delta','iic','dTotal','ajusteDebitor','robustez'],configuracion:grafo.configuracion||{}});}
module.exports={REGISTRY,correrAnalisis,correrAnalisisCompleto};
