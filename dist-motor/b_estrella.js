'use strict';
const {sumaFinita,exigirFinitud}=require('./numerica');
function calcularBStar(nodos,input){
 if(!input||!input.unidad||!Array.isArray(input.valores))return {estado:'indeterminado',valor:null,motivo:'Beneficios y unidad no declarados'};
 const mapa=new Map(input.valores.map(x=>[x.id,x.valor]));
 if(mapa.size!==input.valores.length||input.valores.some(x=>!nodos.some(n=>n.id===x.id)))throw new Error('Identificadores de beneficio inválidos');
 if(nodos.some(n=>!mapa.has(n.id)||mapa.get(n.id)===null||mapa.get(n.id)===undefined))return {estado:'indeterminado',valor:null,motivo:'Beneficio ausente; declarar cero si no hay beneficio'};
 let total;try{total=sumaFinita(nodos.map(n=>mapa.get(n.id)));}catch(e){return {estado:'indeterminado',valor:null,motivo:e.message,unidad:input.unidad};}
 if(total===0)return {estado:'no_aplicable',valor:null,total,unidad:input.unidad};
 try{return exigirFinitud({estado:'calculado',valor:nodos.map(n=>({id:n.id,nodo:n.nombre,valor:mapa.get(n.id)/total,beneficioNeto:mapa.get(n.id)})),total,unidad:input.unidad});}catch(e){return {estado:'indeterminado',valor:null,total,unidad:input.unidad,motivo:e.message};}
}
module.exports={calcularBStar};
