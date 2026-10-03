'use strict';
const disponibilidad=require('./operadores-taxonomicos.json');
const porId=new Map(disponibilidad.map(x=>[x.id,x]));
function listarOperadoresTaxonomicos(){return disponibilidad.map(x=>structuredClone(x));}
function obtenerOperadorTaxonomico(id){const x=porId.get(id);return x?structuredClone(x):null;}
function validarCoberturaOperadores(){if(disponibilidad.length!==45)throw Error('Work05 requiere exactamente OP01–OP45');if(new Set(disponibilidad.map(x=>x.id)).size!==45)throw Error('IDs OP repetidos');if(disponibilidad.some(x=>x.estado==='SIN_REVISAR'))throw Error('Operador sin revisión Work05');return true;}
validarCoberturaOperadores();
module.exports={disponibilidad,listarOperadoresTaxonomicos,obtenerOperadorTaxonomico,validarCoberturaOperadores};
