'use strict';
const {validarDeclarativo,fusionar,validarFuente}=require('./schema');
const {protocolos:UNIVERSALES}=require('./universal');
// Sólo orientación y componentes explícitamente aprobados en instrucciones §12.
const GENERICO={id:'generico',version:'1',dominios:['generico'],dominioLibre:true,alcance:'piloto_generico',estrategiasAlpha:[{id:'alpha_directa',texto:'Valor discriminado — protocolo genérico',regla:'discriminado'},{id:'alpha_monetaria',texto:'Proporción comparable — protocolo genérico',regla:'proporcion_monetaria'}],componentesS:[{id:'formalizacion',texto:'Formalización / procedimiento'},{id:'sustituibilidad_actor',texto:'Sustituibilidad del actor en la posición'},{id:'sistema_incentivos',texto:'Determinación por sistema / incentivos'}],preguntas:[],rangos:[]};
function validarProtocolo(p){
 if(p?.schemaVersion){validarDeclarativo(p);for(const f of [...p.componentesS,...p.preguntas,...p.rangos,...(p.estrategiasAlpha||[])]){validarFuente(f.sourceRef);if(f.estado!==f.sourceRef.estado)throw Error('Campo sin estado trazable');}}
 if(!p||typeof p.id!=='string'||!p.id||typeof p.version!=='string'||!p.version||!Array.isArray(p.dominios)||!Array.isArray(p.componentesS)||!Array.isArray(p.preguntas)||!Array.isArray(p.rangos))throw new Error('Contrato taxonómico inválido');
 if(new Set(p.componentesS.map(x=>x.id)).size!==p.componentesS.length||new Set(p.preguntas.map(x=>x.id)).size!==p.preguntas.length)throw new Error('IDs de campos taxonómicos repetidos');
 if(new Set((p.estrategiasAlpha||[]).map(x=>x.id)).size!==(p.estrategiasAlpha||[]).length)throw new Error('IDs de estrategias repetidos');
 for(const a of p.estrategiasAlpha||[])if(!a.id||!a.texto||!['discriminado','proporcion_monetaria'].includes(a.regla))throw new Error('Estrategia α sin regla autorizada');
 for(const q of p.preguntas)if(!q.id||!q.texto||!['texto','numero'].includes(q.tipo))throw new Error('Pregunta taxonómica inválida');
 if(p.componentesS.some(x=>!x.id||!x.texto))throw new Error('Componentes sin identificador/texto');
 for(const r of p.rangos)if(!Number.isFinite(r.min)||!Number.isFinite(r.max)||r.min<0||r.max<r.min)throw new Error('Rango taxonómico inválido');
 return structuredClone(p);
}
const REGISTRY=new Map();
function registrarProtocolo(p){const v=validarProtocolo(p),k=`${v.id}@${v.version}`;if(REGISTRY.has(k))throw new Error('Versión ya registrada');REGISTRY.set(k,v);return k;}
function cargarProtocolo(id,version){const p=REGISTRY.get(`${id}@${version}`);if(!p)throw new Error('Protocolo/version desconocidos');return structuredClone(p);}
function cargarJSON(texto){return registrarProtocolo(JSON.parse(texto));}
registrarProtocolo(GENERICO);
const CAPITULOS=[...require('./datos/dominios.v1.json'),...require('./datos/capitulos-03-20.v1.json'),...require('./datos/capitulos-21-40.v1.json'),...require('./datos/capitulos-41-60.v1.json'),...require('./datos/capitulos-61-78.v1.json')];
for(const p of CAPITULOS)registrarProtocolo(fusionar(UNIVERSALES,p));
function resolverProtocolo(version,dominio){
 if(version===null||version===undefined)return null;
 if(typeof version!=='string'||version.split('@').length!==2)throw new Error('Versión taxonómica inválida');
 const [id,v]=version.split('@');const p=cargarProtocolo(id,v);
 if(!p.dominioLibre&&dominio&&!p.dominios.includes(dominio))throw new Error('Dominio incompatible con protocolo solicitado');
 return p;
}
function listarProtocolos(){return [...REGISTRY.values()].map(p=>structuredClone(p));}
module.exports={resolverProtocolo,listarProtocolos,GENERICO,validarProtocolo,registrarProtocolo,cargarProtocolo,cargarJSON};
