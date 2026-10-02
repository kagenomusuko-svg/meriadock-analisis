'use strict';
// Variante conservada para revisión de fuente; nunca seleccionada por defecto.
function calcularVarianteLegacy({rStar,alpha,iic}){return rStar*(1-alpha)*(1-iic);}
function calcularFraudeAnnona(input,protocolo){
 if(!protocolo||typeof protocolo.calcularFraudeAnnona!=='function')return {estado:'indeterminado',valor:null,motivo:'Falta protocolo canónico versionado de intervención/prevención'};
 return protocolo.calcularFraudeAnnona(input);
}
module.exports={calcularFraudeAnnona,calcularVarianteLegacy};
