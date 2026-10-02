'use strict';
function calcularBStar(nodos,input){
 if(!input||!input.unidad||!Array.isArray(input.valores))return {estado:'indeterminado',valor:null,motivo:'Beneficios y unidad no declarados'};
 const mapa=new Map(input.valores.map(x=>[x.id,x.valor]));
 if(mapa.size!==input.valores.length||input.valores.some(x=>!nodos.some(n=>n.id===x.id)))throw new Error('Identificadores de beneficio inválidos');
 if(nodos.some(n=>!mapa.has(n.id)||mapa.get(n.id)===null||mapa.get(n.id)===undefined))return {estado:'indeterminado',valor:null,motivo:'Beneficio ausente; declarar cero si no hay beneficio'};
 const total=nodos.reduce((s,n)=>{const b=mapa.get(n.id);if(!Number.isFinite(b))throw new Error('Beneficio no finito');return s+b;},0);
 if(total===0)return {estado:'no_aplicable',valor:null,total,unidad:input.unidad};
 return {estado:'calculado',valor:nodos.map(n=>({id:n.id,nodo:n.nombre,valor:mapa.get(n.id)/total,beneficioNeto:mapa.get(n.id)})),total,unidad:input.unidad};
}
module.exports={calcularBStar};
