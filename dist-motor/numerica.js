'use strict';
function sumaFinita(valores){
 if(!valores.every(Number.isFinite))throw new Error('Suma con datos no finitos');
 const escala=Math.max(0,...valores.map(Math.abs));if(!escala)return 0;
 let suma=0,correccion=0;
 for(const valor of valores){const x=valor/escala,t=suma+x;correccion+=Math.abs(suma)>=Math.abs(x)?(suma-t)+x:(x-t)+suma;suma=t;}
 const total=(suma+correccion)*escala;
 if(!Number.isFinite(total))throw new Error('La suma excede la representación numérica finita');return total;
}
function exigirFinitud(valor){
 if(typeof valor==='number'&&!Number.isFinite(valor))throw new Error('Resultado no finito; no calculable con esta representación numérica');
 if(Array.isArray(valor))valor.forEach(exigirFinitud);
 else if(valor&&typeof valor==='object')Object.values(valor).forEach(exigirFinitud);
 return valor;
}
module.exports={sumaFinita,exigirFinitud};
