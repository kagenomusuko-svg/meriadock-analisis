'use strict';
const {construirMatrizEmpirica}=require('./grafo');const {calcularRStar}=require('./r_estrella');const {rangoRelacion}=require('./modelo');
function ranking(vector){const grupos=[];for(const [i,v] of vector.entries()){const grupo=grupos.find(g=>g.valor===v);if(grupo)grupo.indices.push(i);else grupos.push({valor:v,indices:[i]});}return grupos.sort((a,b)=>b.valor-a.valor).map(g=>g.indices);}
// Empates se registran, sin inventar un líder mediante el orden de los identificadores.
function lideres(vector){const m=Math.max(...vector);return vector.flatMap((v,i)=>v===m?[i]:[]);}
function determinarDeclaracion(escenarios){
 const v=['min','central','max'].map(k=>escenarios[k]?.vector);
 if(v.some(x=>!x))return {estado:'indeterminado',nivel:null,motivo:'Algún escenario no converge'};
 const l=v.map(lideres),rk=v.map(ranking),igual=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 if(rk.some(grupos=>grupos.some(g=>g.length>1)))return {estado:'indeterminado',nivel:null,motivo:'Empate en el ranking: el protocolo no adjudica desempate principal ni secundario',lideres:l,rankings:rk};
 const mismoLider=l.every(x=>igual(x,l[0])),ordenEstable=rk.every(x=>igual(x,rk[0]));
 const central=rk[1].flat(), brecha=v[1].length>1?v[1][central[0]]-v[1][central[1]]:1;
 const superaDiezPuntos=v[1].length>1&&v[1][central[0]]>v[1][central[1]]+.10;
 const nivel=mismoLider?(ordenEstable?'A':'B'):(superaDiezPuntos?'C':'D');
 return {estado:'calculado',nivel,mismoLider,ordenEstable,brechaCentral:brecha,lideres:l,rankings:rk,metodo:'Tres escenarios mínimo/central/máximo',descripcion:{A:'Mismo líder y mismo orden en los tres escenarios.',B:'Mismo líder; cambia el orden secundario.',C:'Cambia el líder; brecha central mayor de 10 puntos porcentuales.',D:'Cambia el líder; brecha central no mayor de 10 puntos porcentuales.'}[nivel]};
}
function sensibilidadExtendida(modelo,config,opcionesPF={}){
 if(!config?.metodo)return {estado:'indeterminado',valor:null,motivo:'Selecciona explícitamente un método de sensibilidad extendida'};
 const base=calcularRStar(construirMatrizEmpirica(modelo),opcionesPF);
 if(!base.vector)return {estado:'indeterminado',valor:null,motivo:'Escenario central no convergente'};
 const aristas=modelo.relacionesInternas, muestras=[];
 if(config.metodo==='una_arista_a_la_vez'){
  aristas.forEach((e,i)=>{for(const extremo of ['min','max']){
   const valor=rangoRelacion(e)[extremo];const rel=aristas.map((a,j)=>j===i?{...a,rango:{min:valor,max:valor},pesoMin:valor,pesoMax:valor}:a);
   const r=calcularRStar(construirMatrizEmpirica({...modelo,relacionesInternas:rel}),opcionesPF);
   muestras.push({relacion:e.id,extremo,estado:r.estado,vector:r.vector,diferenciaL1:r.vector?r.vector.reduce((s,x,j)=>s+Math.abs(x-base.vector[j]),0):null});
  }});
 }else if(config.metodo==='hipercubo_exhaustivo'){
  const cantidad=2**aristas.length;
  if(!Number.isInteger(config.maxVertices)||config.maxVertices<1||cantidad>config.maxVertices)return {estado:'indeterminado',valor:null,motivo:`${cantidad} vértices exceden el presupuesto técnico declarado`};
  for(let mask=0;mask<cantidad;mask++){
   const rel=aristas.map((e,i)=>{const range=rangoRelacion(e),v=Math.floor(mask/2**i)%2?range.max:range.min;return {...e,rango:{min:v,max:v},pesoMin:v,pesoMax:v};});
   const r=calcularRStar(construirMatrizEmpirica({...modelo,relacionesInternas:rel}),opcionesPF);muestras.push({vertice:mask,estado:r.estado,vector:r.vector});
  }
 }else throw new Error('Método de sensibilidad no soportado');
 return {estado:'calculado',valor:muestras,metodo:config.metodo,semilla:null,base:base.vector};
}
module.exports={determinarDeclaracion,sensibilidadExtendida,ranking};
