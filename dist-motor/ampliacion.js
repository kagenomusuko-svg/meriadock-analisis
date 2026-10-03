'use strict';
const {sumaFinita,exigirFinitud}=require('./numerica');
const ausente=x=>x===null||x===undefined;
const indeterminado=motivo=>({estado:'indeterminado',valor:null,motivo});
function completo(valor,extra={}){exigirFinitud(valor);return {estado:'calculado',valor,motivo:null,...extra};}
function indiceInversion(input,nodos){
 if(!input?.disenadorId||!input?.ejecutorId)return indeterminado('Posiciones diseñador y ejecutor no discriminadas explícitamente');
 const ids=new Set(nodos.map(n=>n.id));if(!ids.has(input.disenadorId)||!ids.has(input.ejecutorId))throw Error('I_inv requiere nodos activos con roles explícitos');
 const {deltaDisenador:d,deltaEjecutor:e}=input;
 if(ausente(d)||ausente(e))return indeterminado('Faltan Delta del diseñador o del ejecutor; no se infieren por nombres');
 if(!Number.isFinite(d)||!Number.isFinite(e))throw Error('Delta no finito');
 const auditoria={...input,numerador:Math.abs(d),denominador:Math.abs(e),formula:'abs(Delta_diseniador)/abs(Delta_ejecutor)',fuente:'RESOLUCION_AUDITORIA_I_INV.md',epsilon:null};
 if(e===0)return {...indeterminado(d===0?'0/0 indeterminado':'Exceso del ejecutor cero: denominador cero, sin epsilon oculto'),auditoria};
 const valor=Math.abs(d)/Math.abs(e);return completo(valor,{auditoria,interpretacion:valor>1?'Más brecha del diseñador que exceso del ejecutor':valor===1?'Magnitudes iguales':'El exceso del ejecutor es mayor'});
}
function shapley(input,nodos,config={}){
 if(!input?.unidad||!Array.isArray(input.coaliciones))return indeterminado('Falta juego cooperativo completo y unidad');
 const ids=nodos.map(n=>n.id),n=ids.length;if(!n)return indeterminado('Universo del juego vacío');
 const presupuesto=config.maxCoaliciones??65536;
 if(!Number.isSafeInteger(presupuesto)||presupuesto<1||presupuesto>1048576)throw Error('Presupuesto técnico de coaliciones inválido (1–1048576)');
 const total=2**n;if(!Number.isSafeInteger(total)||total>presupuesto)return indeterminado('Juego exacto excede presupuesto técnico declarado; no se aproxima ni inventan coaliciones');
 const indice=new Map(ids.map((id,i)=>[id,i])),v=new Map(),vistos=new Set();
 for(const c of input.coaliciones){
  if(!Array.isArray(c.miembros)||new Set(c.miembros).size!==c.miembros.length||c.miembros.some(id=>!indice.has(id)))throw Error('Miembros inválidos/repetidos en coalición');
  const mask=c.miembros.reduce((m,id)=>m+2**indice.get(id),0);if(vistos.has(mask))throw Error('Coalición duplicada');vistos.add(mask);
  if(ausente(c.valor))continue;if(!Number.isFinite(c.valor))throw Error('Valor de coalición no finito');v.set(mask,c.valor);
 }
 if(v.size!==total)return {...indeterminado('Juego incompleto: ninguna coalición ausente equivale a cero'),completitud:{requeridas:total,declaradas:v.size}};
 if(v.get(0)!==0)throw Error('Juego normalizado requiere v(vacío)=0 declarado');
 function binomial(a,b){let x=1;for(let j=1;j<=b;j++)x=x*(a-j+1)/j;return x;}
 const valores=ids.map((id,i)=>{const terms=[];for(let mask=0;mask<total;mask++)if(!(mask&(2**i))){let k=0;for(let b=mask;b;b=Math.floor(b/2))k+=b%2;const peso=1/(n*binomial(n-1,k));terms.push(sumaFinita([v.get(mask+2**i),-v.get(mask)])*peso);}return {id,valor:sumaFinita(terms)};});
 return completo(valores,{unidad:input.unidad,total:v.get(total-1),auditoria:{metodo:'Shapley exacto factorial marginal',coaliciones:total,maxCoaliciones:presupuesto,sumaAsignada:sumaFinita(valores.map(x=>x.valor)),fuente:'Calculo14 §3.5/§6.4',alcance:'Distribuye el juego discriminado; no estima v(S) ni selecciona PF frente a Shapley'}});
}
function justicia(deltas){if(!Array.isArray(deltas)||!deltas.length||deltas.some(x=>ausente(x)))return indeterminado('Faltan Delta para todo el universo activo');if(deltas.some(x=>!Number.isFinite(x)))throw Error('Delta no finito');return completo(sumaFinita([1,-sumaFinita(deltas.map(Math.abs))]),{auditoria:{formula:'1 − suma(abs(R* − alpha))',deltas,alcance:'Magnitud descriptiva; puede ser negativa, sin clamp ni inferencia moral',fuente:'Calculo4 §2.1; CF13'}});}
function conversionVital(input){
 if(ausente(input?.monto)||ausente(input?.salarioReferencia)||!input?.unidad)return indeterminado('Faltan monto, salario social de referencia explícito o moneda común');
 if(!Number.isFinite(input.monto)||input.monto<0||!Number.isFinite(input.salarioReferencia)||input.salarioReferencia<=0)throw Error('Conversión vital requiere monto no negativo y salario/hora positivo finito');
 return completo(input.monto/input.salarioReferencia,{unidad:'horas',auditoria:{...input,unidadSalario:input.unidad+'/hora',formula:'monto/salarioReferencia',fuente:'Calculo1 §6; Calculo14 §6.4',alcance:'Conversión de magnitud declarada, no equivalencia universal ni reparación automática'}});
}
function comparacion(input,nodos){
 if(!input?.referenciaAntes||!input?.referenciaDespues||!input?.baseComparabilidad||!Array.isArray(input.valores))return null;
 const ids=nodos.map(n=>n.id);if(new Set(input.valores.map(x=>x.id)).size!==input.valores.length||input.valores.length!==ids.length||input.valores.some(x=>!ids.includes(x.id)))throw Error('Comparación requiere mismos IDs únicos y universo completo');
 const filas=ids.map(id=>input.valores.find(x=>x.id===id));for(const campo of ['rAntes','rDespues'])if(filas.every(x=>!ausente(x[campo]))&&Math.abs(sumaFinita(filas.map(x=>x[campo]))-1)>64*Number.EPSILON)throw Error('Vectores R* comparables requieren norma L1=1; no se normalizan silenciosamente');return {filas,auditoria:{...input,alcance:'Comparabilidad discriminada por el analista; no se infiere intervención ni eficacia'}};
}
function impacto(input,nodos){const c=comparacion(input,nodos);if(!c||c.filas.some(x=>ausente(x.rAntes)||ausente(x.rDespues)))return indeterminado('Faltan vectores R* comparables y referencias');for(const f of c.filas)for(const r of [f.rAntes,f.rDespues])if(!Number.isFinite(r)||r<0||r>1)throw Error('R* comparable fuera de [0,1]');return completo(sumaFinita(c.filas.map(x=>Math.abs(x.rDespues-x.rAntes))),{auditoria:{...c.auditoria,formula:'norma L1 de R*(G′) − R*(G)',fuente:'Axiom ApD DefD.6'}});}
function aprendizaje(input,nodos){const c=comparacion(input,nodos);if(!c||c.filas.some(x=>[x.rAntes,x.rDespues,x.alphaAntes,x.alphaDespues].some(ausente)))return indeterminado('Faltan R*/alpha antes/después y base de comparación');for(const f of c.filas)for(const v of [f.rAntes,f.rDespues,f.alphaAntes,f.alphaDespues])if(!Number.isFinite(v)||v<0||v>1)throw Error('R*/alpha comparable fuera de [0,1]');const antes=justicia(c.filas.map(x=>x.rAntes-x.alphaAntes)).valor,despues=justicia(c.filas.map(x=>x.rDespues-x.alphaDespues)).valor;return completo(sumaFinita([despues,-antes]),{auditoria:{...c.auditoria,jAntes:antes,jDespues:despues,formula:'J_post − J_pre',fuente:'Calculo12 §6.3',alcance:'Comparación descriptiva; sin umbrales predictivos de recurrencia'}});}
function brechaBeneficio(input,nodos){
 if(!input?.unidad||!Array.isArray(input.valores))return indeterminado('Faltan beneficio recibido y revertido en la misma unidad');
 const ids=nodos.map(n=>n.id);if(input.valores.length!==ids.length||new Set(input.valores.map(x=>x.id)).size!==ids.length||input.valores.some(x=>!ids.includes(x.id)))throw Error('Beneficiarios deben identificarse sin duplicados');
 if(input.valores.some(x=>ausente(x.recibido)||ausente(x.revertido)))return indeterminado('Beneficio recibido/revertido ausente; cero sólo si declarado');
 for(const x of input.valores)if(!Number.isFinite(x.recibido)||!Number.isFinite(x.revertido)||x.recibido<0||x.revertido<0)throw Error('Beneficio recibido/revertido debe ser finito no negativo');
 return completo(input.valores.map(x=>({id:x.id,valor:sumaFinita([x.recibido,-x.revertido]),recibido:x.recibido,revertido:x.revertido})),{unidad:input.unidad,auditoria:{formula:'B_i − beta_i (magnitudes absolutas)',fuente:'RES-DELTAB-001 §7–9',alcance:'Sin inferir R*_B desde cuotas B* ni beta desde alpha'}});
}
function roiPrevencion(input){
 if([input?.danioTotal,input?.deltaP,input?.costo].some(ausente)||!input?.unidad||!input?.baseDeltaP)return indeterminado('Faltan daño, costo, ΔP externo, unidad común o base de ΔP');
 if(!Number.isFinite(input.danioTotal)||input.danioTotal<0||!Number.isFinite(input.costo)||input.costo<=0||!Number.isFinite(input.deltaP)||Math.abs(input.deltaP)>1)throw Error('ROI requiere daño no negativo, costo positivo y diferencia de probabilidad entre −1 y 1');
 const beneficioEsperado=input.danioTotal*input.deltaP;exigirFinitud(beneficioEsperado);const neto=sumaFinita([beneficioEsperado,-input.costo]);return completo(neto/input.costo,{unidad:'adimensional',auditoria:{...input,beneficioEsperado,beneficioNeto:neto,formula:'(D_total × deltaP − costo)/costo',fuente:'Calculo9 §5.5; inventario OP27; plan Work03',alcance:'ROI neto con ΔP externo discriminado; no predicción desde R*/S. El retorno bruto del ApA §3.1 es otro cociente.'}});
}
module.exports={roiPrevencion,indiceInversion,shapley,justicia,conversionVital,impacto,aprendizaje,brechaBeneficio};
