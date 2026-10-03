'use strict';
// MAT ratificado por ORDEN_WORK_04 § Fraude annona. D_design no es evento D.
function calcularFraudeAnnona({rStar,alpha,iic}={}){
 const datos={rStar,alpha,iic};
 if(Object.values(datos).some(v=>v===null||v===undefined))return {estado:'indeterminado',valor:null,motivo:'Falta R*, α o IIC; un factor cero no reemplaza el dato ausente',formula:'R*(1−α)(1−IIC)'};
 if(Object.values(datos).some(v=>!Number.isFinite(v)||v<0||v>1))throw Error('Fraude annona requiere R*, α e IIC finitos en [0,1]');
 return {estado:'calculado',valor:rStar*(1-alpha)*(1-iic),formula:'R*(1−α)(1−IIC)',insumos:datos,interpretacion:'Magnitud canónica para el diseñador explícitamente discriminado; no calificación jurídica automática'};
}
function fraudeDelDisenador(c){
 const input=c.insumos.fraudeAnnona;
 if(!input?.disenadorId||input.rol!=='disenador')return {estado:'indeterminado',valor:null,motivo:'Rol diseñador e ID activo deben discriminarse explícitamente'};
 const index=c.nodos.findIndex(n=>n.id===input.disenadorId);if(index<0)throw Error('Diseñador debe ser un nodo activo, distinto del evento D');
 const variantes=c.protocolo?.variantesIIC||[{id:'congruencia@1',estado:'DERIVADO',formula:'coincidencias/totalDeclarado'}];
 const variante=variantes.find(v=>v.id===input.varianteIIC);
 if(!variante||!['CANONICO','DERIVADO'].includes(variante.estado)||variante.id!=='congruencia@1')return {estado:'indeterminado',valor:null,motivo:'Variante IIC efectiva identificada requerida; variantes históricas/sectoriales no se mezclan'};
 const fila=c.resultados.iic?.valor?.find(n=>n.id===input.disenadorId);
 if(fila?.varianteIIC!==variante.id)return {estado:'indeterminado',valor:null,motivo:'Variante de IIC incompatible con la seleccionada para Fraude annona'};
 const r=calcularFraudeAnnona({rStar:c.resultados.rStar?.valor?.[index],alpha:c.resultados.alpha?.valor?.find(n=>n.id===input.disenadorId)?.valor,iic:fila?.valor});
 return {...r,disenadorId:input.disenadorId,rol:'disenador',varianteIIC:variante.id,sourceRef:{repositorio:'kagenomusuko-svg/meriadock-analisis',sha:'280ef5490e62618c7f6909b388dea30b2b129667',path:'ORDEN_WORK_04_TAXONOMIA_COMPUTABLE_Y_FRAUDE_ANNONA.md',capitulo:'Work04',seccion:'Fraude annona',reglaId:'fraude-annona.producto.v1',estado:'CANONICO'}};
}
module.exports={calcularFraudeAnnona,fraudeDelDisenador};
