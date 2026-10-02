'use strict';
const {correrAnalisis}=require('./series');
const {mensajesAnalisis}=require('./linter');
function calcularSolicitud(body){
 if(!body||typeof body!=='object')throw new Error('Solicitud inválida');
 const estructura=body.analisis||body.estructura||body.grafo;
 if(!estructura)throw new Error('Análisis estructurado requerido');
 const resultado=correrAnalisis({estructura,insumos:body.insumos||{insumosAlpha:body.insumosAlpha,nodosIIC:body.nodosIIC,danio:body.danio,beneficios:body.beneficios},medicionesSolicitadas:body.medicionesSolicitadas||estructura.medicionesSolicitadas||[],configuracion:body.configuracion||estructura.configuracion||{}});
 resultado.mensajes=mensajesAnalisis(estructura,resultado.medicionesSolicitadas);
 return resultado;
}
module.exports={calcularSolicitud};
