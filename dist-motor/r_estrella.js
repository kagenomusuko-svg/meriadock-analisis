'use strict';
const {desdeDensa,multiplicar,regularizarMatriz,diagnosticar}=require('./grafo');
function calcularRStar(input,{tolerancia=1e-10,maxIteraciones=10000,regularizacion,detalleCompleto=false}={}) {
  const W_E=Array.isArray(input)?desdeDensa(input):input;
  if(!W_E || !Number.isInteger(W_E.n) || W_E.n<1) return {estado:'indeterminado',vector:null,convergio:false,motivo:'Sin nodos activos'};
  if(!Number.isFinite(tolerancia)||tolerancia<=0||!Number.isInteger(maxIteraciones)||maxIteraciones<1)throw new Error('Parámetros numéricos inválidos');
  const W=regularizacion?regularizarMatriz(W_E,regularizacion):W_E;
  const diagnostico=diagnosticar(W), diagnosticoEmpirico=diagnosticar(W_E);
  let r=new Array(W.n).fill(1/W.n),errorFinal=null,iteraciones=0,convergio=false;
  const detalle=detalleCompleto||W.n<=12, rondas=detalle?[{ronda:0,vector:[...r]}]:[];
  let motivo=null;
  for(let t=1;t<=maxIteraciones;t++){
    const producto=multiplicar(W,r),suma=producto.reduce((a,b)=>a+b,0);
    if(!Number.isFinite(suma)||suma<=0){motivo='Producto nulo o no finito; no existe distribución calculable por esta iteración';break;}
    const siguiente=producto.map(x=>x/suma);errorFinal=siguiente.reduce((s,x,i)=>s+Math.abs(x-r[i]),0);iteraciones=t;
    if(detalle)rondas.push({ronda:t,anterior:[...r],producto,suma,vector:[...siguiente],error:errorFinal});
    r=siguiente;if(errorFinal<tolerancia){convergio=true;break;}
  }
  const wr=multiplicar(W,r),rho=wr.reduce((s,x)=>s+x,0),residuo=wr.reduce((s,x,i)=>s+Math.abs(x-rho*r[i]),0);
  convergio=convergio&&rho>0&&residuo<tolerancia*Math.max(1,rho);
  return {estado:convergio?'calculado':'indeterminado',vector:convergio?r:null,aproximacion:convergio?null:r,
    eigenvalorDominante:rho,iteraciones,convergio,errorFinal,residuo,tolerancia,maxIteraciones,
    motivo:motivo||(!convergio?'No convergente con los parámetros declarados':null),
    regularizacionAplicada:!!regularizacion,epsilon:regularizacion?.epsilon??null,
    diagnostico,diagnosticoEmpirico,W_E,W_epsilon:regularizacion?W:null,rondas,
    condicionesSuficientes:diagnostico.primitiva,metodo:'Perron–Frobenius, iteración de potencia; W r, norma L1'};
}
module.exports={calcularRStar};
