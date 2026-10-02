'use strict';
function calcularDelta(rStar,alpha){
 if(rStar===null||rStar===undefined||alpha===null||alpha===undefined)return null;
 if(!Number.isFinite(rStar)||!Number.isFinite(alpha))throw new Error('Magnitudes Δ inválidas');
 const valor=rStar-alpha,signo=valor>0?'positiva':valor<0?'negativa':'cero';
 return {valor,signo,texto:valor>0?'Índice de convergencia mayor que condiciones adversas atribuibles.':valor<0?'Condiciones adversas atribuibles mayores que índice de convergencia.':'Coincidencia entre ambas magnitudes.'};
}
module.exports={calcularDelta};
