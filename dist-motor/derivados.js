'use strict';
function calcularContribucionAtribuible(r,s){
 if(r===null||r===undefined||s===null||s===undefined)return null;
 if(!Number.isFinite(r)||r<0||r>1||!Number.isFinite(s)||s<0||s>1)throw new Error('Magnitudes de contribución inválidas');
 return r*(1-s);
}
module.exports={calcularContribucionAtribuible,calcularRStarNeta:calcularContribucionAtribuible};
