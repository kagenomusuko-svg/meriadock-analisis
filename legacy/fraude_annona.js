'use strict';
// HIST INACTIVO: fórmula del prototipo, no autoridad canónica y sin import en runtime.
function calcularVarianteLegacy({rStar,alpha,iic}){return rStar*(1-alpha)*(1-iic);}
module.exports={calcularVarianteLegacy};
