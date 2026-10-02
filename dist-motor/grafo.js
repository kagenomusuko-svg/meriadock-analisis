'use strict';
const {crearAnalisis,rangoRelacion}=require('./modelo');
// Convención canónica: W_ij = w(N_i → N_j); multiplicación DERECHA W r.
function construirMatrizEmpirica(input, escenario='central') {
  if (!['min','central','max'].includes(escenario)) throw new Error('Escenario inválido');
  const modelo=crearAnalisis(input), ids=modelo.nodosActivos.map(n=>n.id), indice=Object.fromEntries(ids.map((id,i)=>[id,i]));
  const entradas=modelo.relacionesInternas.map(e=>{
    const r=rangoRelacion(e), valor=escenario==='min'?r.min:escenario==='max'?r.max:(r.min+r.max)/2;
    return {fila:indice[e.origen],columna:indice[e.destino],valor,relacion:e.id,evidenciaNivel:e.evidenciaNivel};
  });
  return {representacion:'sparse-aristas',n:ids.length,ids,entradas,escenario,convencion:'W_ij = w(N_i → N_j)',empirica:true};
}
function desdeDensa(W) {
  const n=W.length, entradas=[];
  if (!n || W.some(r=>!Array.isArray(r)||r.length!==n)) throw new Error('Matriz cuadrada no vacía requerida');
  W.forEach((r,i)=>r.forEach((valor,j)=>{if(!Number.isFinite(valor)||valor<0)throw new Error('Matriz no negativa requerida');if(valor)entradas.push({fila:i,columna:j,valor});}));
  return {representacion:'sparse-aristas',n,ids:Array.from({length:n},(_,i)=>String(i)),entradas,empirica:true};
}
function multiplicar(W,r) {
  const v=new Array(W.n).fill(0);
  for(const e of W.entradas) v[e.fila]+=e.valor*r[e.columna];
  if(W.regularizacion){const {epsilon,K}=W.regularizacion;
    if(K.tipo==='constante'){const aporte=epsilon*K.valor*r.reduce((s,x)=>s+x,0);for(let i=0;i<W.n;i++)v[i]+=aporte;}
    else for(const e of K.entradas)v[e.fila]+=epsilon*e.valor*r[e.columna];
  }
  return v;
}
function regularizarMatriz(W,config) {
  if(!config||!Number.isFinite(config.epsilon)||config.epsilon<=0||!config.K)throw new Error('Regularización exige epsilon positivo y K explícitos');
  const K=config.K;
  if(K.tipo==='constante'){if(!Number.isFinite(K.valor)||K.valor<=0)throw new Error('K constante positiva requerida');}
  else if(K.tipo==='sparse'){if(!Array.isArray(K.entradas)||K.entradas.some(e=>!Number.isInteger(e.fila)||!Number.isInteger(e.columna)||e.fila<0||e.columna<0||e.fila>=W.n||e.columna>=W.n||!Number.isFinite(e.valor)||e.valor<0))throw new Error('K sparse inválida');}
  else throw new Error('K no soportada');
  return {...W,empirica:false,regularizacion:{epsilon:config.epsilon,K:structuredClone(K),esEvidencia:false}};
}
function diagnosticar(W) {
  const n=W.n;
  if(!n)return {irreducible:false,primitiva:false,periodo:null};
  if(W.regularizacion?.K.tipo==='constante')return {irreducible:true,primitiva:true,periodo:1,porRegularizacion:true};
  const ady=Array.from({length:n},()=>[]), rev=Array.from({length:n},()=>[]);
  const edges=[...W.entradas,...(W.regularizacion?.K.entradas||[])];
  for(const e of edges)if(e.valor>0){ady[e.fila].push(e.columna);rev[e.columna].push(e.fila);}
  function visitar(g){const seen=new Set([0]),stack=[0];while(stack.length){for(const j of g[stack.pop()])if(!seen.has(j)){seen.add(j);stack.push(j);}}return seen.size===n;}
  const irreducible=visitar(ady)&&visitar(rev);
  if(!irreducible)return {irreducible:false,primitiva:false,periodo:null};
  const dist=new Array(n).fill(-1),q=[0];dist[0]=0;
  for(let i=0;i<q.length;i++)for(const j of ady[q[i]])if(dist[j]<0){dist[j]=dist[q[i]]+1;q.push(j);}
  function gcd(a,b){while(b){[a,b]=[b,a%b];}return a;}
  let periodo=0;for(let i=0;i<n;i++)for(const j of ady[i])periodo=gcd(periodo,Math.abs(dist[i]+1-dist[j]));
  return {irreducible,primitiva:periodo===1,periodo};
}
function matrizDensa(W){return Array.from({length:W.n},(_,i)=>Array.from({length:W.n},(_,j)=>{
 let v=W.entradas.filter(e=>e.fila===i&&e.columna===j).reduce((s,e)=>s+e.valor,0);
 const c=W.regularizacion;if(c)v+=c.epsilon*(c.K.tipo==='constante'?c.K.valor:c.K.entradas.filter(e=>e.fila===i&&e.columna===j).reduce((s,e)=>s+e.valor,0));return v;
}));}
module.exports={construirMatrizEmpirica,desdeDensa,multiplicar,regularizarMatriz,diagnosticar,matrizDensa};
