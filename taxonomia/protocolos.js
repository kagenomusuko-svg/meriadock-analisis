'use strict';
// Sólo orientación y componentes explícitamente aprobados en instrucciones §12.
const GENERICO={id:'generico',version:'1',dominios:['generico'],componentesS:[{id:'formalizacion',texto:'Formalización / procedimiento'},{id:'sustituibilidad_actor',texto:'Sustituibilidad del actor en la posición'},{id:'sistema_incentivos',texto:'Determinación por sistema / incentivos'}],preguntas:[],rangos:[]};
function validarProtocolo(p){
 if(!p||typeof p.id!=='string'||!p.id||typeof p.version!=='string'||!p.version||!Array.isArray(p.dominios)||!Array.isArray(p.componentesS)||!Array.isArray(p.preguntas)||!Array.isArray(p.rangos))throw new Error('Contrato taxonómico inválido');
 if(p.componentesS.some(x=>!x.id||!x.texto))throw new Error('Componentes sin identificador/texto');
 for(const r of p.rangos)if(!Number.isFinite(r.min)||!Number.isFinite(r.max)||r.min<0||r.max<r.min)throw new Error('Rango taxonómico inválido');
 return structuredClone(p);
}
const REGISTRY=new Map();
function registrarProtocolo(p){const v=validarProtocolo(p),k=`${v.id}@${v.version}`;if(REGISTRY.has(k))throw new Error('Versión ya registrada');REGISTRY.set(k,v);return k;}
function cargarProtocolo(id,version){const p=REGISTRY.get(`${id}@${version}`);if(!p)throw new Error('Protocolo/version desconocidos');return structuredClone(p);}
function cargarJSON(texto){return registrarProtocolo(JSON.parse(texto));}
registrarProtocolo(GENERICO);
module.exports={GENERICO,validarProtocolo,registrarProtocolo,cargarProtocolo,cargarJSON};
