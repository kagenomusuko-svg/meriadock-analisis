'use strict';
function calcularAlpha(input, protocolo) {
 if(!input)return null;
 let valor;
 if(input.estrategia==='discriminado')valor=input.valor;
 else if(input.estrategia==='proporcion_monetaria'){
  const {montoEfectivamenteAsumido:m,baseComparativa:b,unidad}=input;
  if(m===null||m===undefined||b===null||b===undefined||!unidad)return null;
  if(!Number.isFinite(m)||m<0||!Number.isFinite(b)||b<=0)throw new Error('Proporción α inválida');
  valor=Math.min(1,m/b);
 }else if(input.estrategia==='taxonomico'){
  if(!protocolo)return null;
  const regla=protocolo.estrategiasAlpha?.find(x=>x.id===input.estrategiaId);
  if(!regla)return null;
  const aplicado=calcularAlpha({...input,estrategia:regla.regla});if(!aplicado)return null;valor=aplicado.valor;
 }else return null;
 if(valor===null||valor===undefined)return null;
 if(!Number.isFinite(valor)||valor<0||valor>1)throw new Error('α fuera de [0,1]');
 return {...input,valor,soportes:input.soportes||[]};
}
module.exports={calcularAlpha};
