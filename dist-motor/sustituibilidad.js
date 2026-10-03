'use strict';
function calcularS(componentes,pesos) {
 if(!Array.isArray(componentes)||!componentes.length||componentes.some(x=>x===null||x===undefined))return null;
 if(componentes.some(x=>!Number.isFinite(x)||x<0||x>1))throw new Error('Componentes S fuera de [0,1]');
 if(pesos===undefined)return componentes.reduce((s,x)=>s+x,0)/componentes.length;
 if(!Array.isArray(pesos)||pesos.length!==componentes.length||pesos.some(x=>!Number.isFinite(x)||x<0)||pesos.reduce((s,x)=>s+x,0)===0)throw new Error('Pesos S inválidos');
 const escala=Math.max(...pesos),normal=pesos.map(x=>x/escala);return componentes.reduce((s,x,i)=>s+x*normal[i],0)/normal.reduce((s,x)=>s+x,0);
}
module.exports={calcularS};
