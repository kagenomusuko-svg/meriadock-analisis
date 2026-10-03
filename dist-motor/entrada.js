'use strict';
const {correrAnalisis}=require('./series');
const {auditable}=require('./numerica');
const {mensajesAnalisis}=require('./linter');
function calcularSolicitud(body){
 if(!body||typeof body!=='object')throw new Error('Solicitud inválida');
 const estructura=body.analisis||body.estructura||body.grafo;
 if(!estructura)throw new Error('Análisis estructurado requerido');
 const resultado=correrAnalisis({estructura,insumos:body.insumos||{insumosAlpha:body.insumosAlpha,nodosIIC:body.nodosIIC,danio:body.danio,beneficios:body.beneficios},medicionesSolicitadas:body.medicionesSolicitadas||estructura.medicionesSolicitadas||[],configuracion:body.configuracion||estructura.configuracion||{}});
 resultado.mensajes=mensajesAnalisis(resultado.validacion.estructuraValida?resultado.modelo:estructura,resultado.medicionesSolicitadas);
 const normalizados={analisis:estructura,insumos:body.insumos||{insumosAlpha:body.insumosAlpha,nodosIIC:body.nodosIIC,danio:body.danio,beneficios:body.beneficios},medicionesSolicitadas:resultado.medicionesSolicitadas,configuracion:body.configuracion||estructura.configuracion||{}};
 resultado.snapshot={solicitudOriginal:structuredClone(normalizados),estructuraEfectiva:resultado.validacion.estructuraValida?structuredClone(resultado.modelo):null,insumos:structuredClone(normalizados.insumos),configuracion:structuredClone(normalizados.configuracion),taxonomiaVersionSolicitada:estructura.taxonomiaVersion??null,taxonomiaVersionEfectiva:null,versionMotor:resultado.versionMotor,revisionFuente:resultado.auditoria.revisionFuente};
 resultado.auditoria.snapshot=resultado.snapshot;
 resultado.insumos=resultado.snapshot.insumos;resultado.configuracion=resultado.snapshot.configuracion;
 return auditable(resultado);
}
module.exports={calcularSolicitud};
