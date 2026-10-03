'use strict';
const {VERSION}=require('../../dist-motor/modelo');
function numero(v){if(v===''||v===null||v===undefined)return null;return Number(v);}
function lineas(v){return String(v||'').split('\n').map(x=>x.trim()).filter(Boolean);}
function construirSolicitud(estado){
 const nodos=estado.nodos.map(n=>({...n,tipo:n.tipo||'indeterminado',modo:n.modo||'indeterminado',
  s:{componentes:(n.componentesS||['','','']).map(numero)},
  alpha:n.estrategiaAlpha?{estrategia:n.estrategiaAlpha.startsWith('taxonomico:')?'taxonomico':n.estrategiaAlpha,estrategiaId:n.estrategiaAlpha.startsWith('taxonomico:')?n.estrategiaAlpha.split(':')[1]:undefined,valor:numero(n.alphaValor),montoEfectivamenteAsumido:numero(n.alphaMonto),baseComparativa:numero(n.alphaBase),unidad:n.alphaUnidad,soportes:lineas(n.soportesAlpha),referenciaOpcional:n.referenciaAlpha}:null,
  iic:{declarado:lineas(n.declarado),observado:lineas(n.observado),coincidencias:numero(n.coincidencias)},soportes:lineas(n.soportes)}));
 const todas=estado.relaciones.map(e=>({...e,evidenciaNivel:numero(e.evidenciaNivel),rango:{min:numero(e.min),max:numero(e.max)},soportes:lineas(e.soportes)}));
 const analisis={version:VERSION,taxonomiaVersion:estado.taxonomiaVersion??'generico@1',familia:estado.familia,dominio:estado.dominio,titulo:estado.titulo,pregunta:estado.pregunta,fenomeno:{descripcion:estado.descripcion},eventoDeterminado:{id:'D',nombre:estado.evento,descripcion:estado.evento},nodosActivos:nodos,relacionesInternas:todas.filter(e=>e.destino!=='D'),conexionesCierre:todas.filter(e=>e.destino==='D'),medicionesSolicitadas:estado.mediciones};
 const regularizacion=estado.regularizar?{epsilon:numero(estado.epsilon),K:{tipo:'constante',valor:numero(estado.k)}}:undefined;
 return {analisis,medicionesSolicitadas:estado.mediciones,insumos:{nodosIIC:nodos.map(n=>({id:n.id,...n.iic})),insumosAlpha:nodos.filter(n=>n.alpha).map(n=>({id:n.id,...n.alpha})),beneficios:{unidad:estado.unidadBeneficio,valores:estado.nodos.map(n=>({id:n.id,valor:numero(n.beneficio)}))},danio:{unidad:estado.unidadDanio,tInvertido:{monto:numero(estado.tInvertido)},tImpedido:{monto:numero(estado.tImpedido)},tTrayectoria:{montoEstimado:numero(estado.tTrayectoria)}}},configuracion:{pf:{regularizacion,detalleCompleto:estado.detalleCompleto},sensibilidadExtendida:estado.metodoExtendido?{metodo:estado.metodoExtendido,maxVertices:numero(estado.maxVertices)}:undefined}};
}
module.exports={numero,lineas,construirSolicitud};
