'use strict';
const {correrAnalisis}=require('./series');
const {resolverProtocolo}=require('../taxonomia/protocolos');
const {auditable}=require('./numerica');
const {mensajesAnalisis}=require('./linter');
const {prepararParametros,PARAMETROS}=require('./calibracion');
function calcularSolicitud(body){
 if(!body||typeof body!=='object')throw new Error('Solicitud inválida');
 const estructura=body.analisis||body.estructura||body.grafo;
 if(!estructura)throw new Error('Análisis estructurado requerido');
 const protocolo=resolverProtocolo(estructura.taxonomiaVersion,estructura.dominio);
 const parametrosProvisionales=prepararParametros(body.parametrosProvisionales||body.configuracion?.parametrosProvisionales);
 const resultado=correrAnalisis({estructura,insumos:body.insumos||{insumosAlpha:body.insumosAlpha,nodosIIC:body.nodosIIC,danio:body.danio,beneficios:body.beneficios},medicionesSolicitadas:body.medicionesSolicitadas||estructura.medicionesSolicitadas||[],configuracion:body.configuracion||estructura.configuracion||{},protocolo});
 resultado.mensajes=mensajesAnalisis(resultado.validacion.estructuraValida?{...resultado.modelo,nodosActivos:resultado.modelo.nodosActivos.map(n=>({...n,alpha:resultado.resultados.alpha?.valor?.find(x=>x.id===n.id)?.contrato||n.alpha}))}:estructura,resultado.medicionesSolicitadas,protocolo);
 const normalizados={analisis:estructura,insumos:body.insumos||{insumosAlpha:body.insumosAlpha,nodosIIC:body.nodosIIC,danio:body.danio,beneficios:body.beneficios},medicionesSolicitadas:resultado.medicionesSolicitadas,configuracion:body.configuracion||estructura.configuracion||{},parametrosProvisionales};
 resultado.parametrizacion={version:PARAMETROS.version,estado:parametrosProvisionales.length?'PARAMETRIZADO_PROVISIONALMENTE':'SIN_PARAMETROS_PROVISIONALES',parametros:parametrosProvisionales,reglasPendientes:PARAMETROS.resumenReglas};
 resultado.auditoria.parametrizacion=resultado.parametrizacion;
 resultado.snapshot={operadoresDisponibles:resultado.auditoria.operadoresDisponibles,parametrizacion:resultado.parametrizacion,solicitudOriginal:structuredClone(normalizados),estructuraEfectiva:resultado.validacion.estructuraValida?structuredClone(resultado.modelo):null,insumos:structuredClone(normalizados.insumos),configuracion:structuredClone(normalizados.configuracion),taxonomiaVersionSolicitada:estructura.taxonomiaVersion??null,taxonomiaVersionEfectiva:protocolo?protocolo.id+'@'+protocolo.version:null,protocoloEfectivo:protocolo,versionMotor:resultado.versionMotor,revisionFuente:resultado.auditoria.revisionFuente};
 resultado.auditoria.snapshot=resultado.snapshot;resultado.auditoria.protocolo=protocolo;
 resultado.insumos=resultado.snapshot.insumos;resultado.configuracion=resultado.snapshot.configuracion;
 return auditable(resultado);
}
module.exports={calcularSolicitud};
