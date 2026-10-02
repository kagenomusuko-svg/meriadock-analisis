'use strict';
function calcularDTotal(danio){
 if(!danio||!danio.unidad)return null;
 const campos=['tInvertido','tImpedido','tTrayectoria'];
 const valores=campos.map(k=>{
  const d=danio[k];if(!d||d.unidad&&d.unidad!==danio.unidad)return null;
  const v=d.monto??d.montoEstimado;
  if(v===null||v===undefined)return null;
  if(!Number.isFinite(v)||v<0)throw new Error('Daño no negativo finito requerido');return v;
 });
 if(valores.some(x=>x===null))return null;
 const [ti,tp,tt]=valores;
 return {unidad:danio.unidad,tInvertido:{...danio.tInvertido,monto:ti},tImpedido:{...danio.tImpedido,monto:tp},tTrayectoria:{...danio.tTrayectoria,monto:tt},dTotal:ti+tp+tt,dTotalMin:ti,dTotalConservador:ti+tp};
}
function calcularAjusteDebitor(rStar,d){if(!d||!rStar||rStar.some(r=>r.valor===null))return null;return rStar.map(r=>({id:r.id,nodo:r.nodo,rStar:r.valor,unidad:d.unidad,adMin:r.valor*d.dTotalMin,adConservador:r.valor*d.dTotalConservador,adCentral:r.valor*d.dTotal}));}
module.exports={calcularDTotal,calcularAjusteDebitor};
