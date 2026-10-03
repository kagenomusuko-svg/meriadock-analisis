'use strict';
// HIST: esta variante sólo se conserva para comparación documental; no está en REGISTRY.
function calcularVarianteLegacy({rStar,alpha,iic}){return rStar*(1-alpha)*(1-iic);}
function calcularFraudeAnnona(){return {estado:'indeterminado',valor:null,reserva:'CON/TAX',motivo:'RESERVADO: falta contrato canónico versionado de intervención/prevención. La fórmula histórica no está activa.'};}
module.exports={calcularFraudeAnnona,calcularVarianteLegacy};
