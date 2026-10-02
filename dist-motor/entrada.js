'use strict';
const {correrAnalisis}=require('./series');
function calcularSolicitud(body){
 if(!body||typeof body!=='object')throw new Error('Solicitud inválida');
 const estructura=body.analisis||body.estructura||body.grafo;
 if(!estructura)throw new Error('Análisis estructurado requerido');
 return correrAnalisis({estructura,insumos:body.insumos||{insumosAlpha:body.insumosAlpha,nodosIIC:body.nodosIIC,danio:body.danio,beneficios:body.beneficios},medicionesSolicitadas:body.medicionesSolicitadas||estructura.medicionesSolicitadas||[],configuracion:body.configuracion||estructura.configuracion||{}});
}
module.exports={calcularSolicitud};
