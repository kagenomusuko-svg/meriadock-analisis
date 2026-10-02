const {test}=require('node:test');const a=require('node:assert/strict');
const {calcularSolicitud}=require('../dist-motor/entrada'); const {calcularIIC}=require('../dist-motor/iic');const {calcularBStar}=require('../dist-motor/b_estrella');const {calcularDTotal}=require('../dist-motor/danio');const {determinarDeclaracion,sensibilidadExtendida}=require('../dist-motor/hipercubo');
const model={nodos:[{id:'a',nombre:'A',tipo:'ejecucion',s:{componentes:[0,.4,.1]},alpha:{valor:.08,estrategia:'discriminado'}},{id:'b',nombre:'B',alpha:{valor:.03,estrategia:'discriminado'}},{id:'D',tipo:'final'}],aristas:[{origen:'a',destino:'a',pesoMin:.9,pesoMax:.9},{origen:'a',destino:'b',pesoMin:.4,pesoMax:.4},{origen:'b',destino:'a',pesoMin:.1,pesoMax:.1},{origen:'b',destino:'b',pesoMin:.6,pesoMax:.6},{origen:'a',destino:'D',pesoMin:1,pesoMax:1}]};
model.aristas.forEach(e=>e.evidenciaNivel=1);
const damage={unidad:'MXN',tInvertido:{monto:100},tImpedido:{monto:20},tTrayectoria:{montoEstimado:30}};
test('API → PF/α/Δ/IIC/B*/D_total/AD, sin restricción por tipo',()=>{
 const r=calcularSolicitud({grafo:model,medicionesSolicitadas:['delta','rStarNeta','iic','bStar','ajusteDebitor','robustez'],nodosIIC:[{id:'a',declarado:['x','y'],observado:['x'],coincidencias:1}],danio:damage,beneficios:{unidad:'MXN',valores:[{id:'a',valor:30},{id:'b',valor:10}]}});
 a.equal(r.rStar.length,2);a.equal(r.dTotal.dTotal,150);a.ok(Math.abs(r.ajusteDebitor[0].adCentral-120)<1e-7);a.equal(r.serieII[0].valor,.5);a.equal(r.bStar[0].valor,.75);a.equal(r.declaracion.nivel,'A');a.equal(r.resultados.rStarNeta.estado,'indeterminado');a.equal(r.rStar[1].neta,null);
 for(const k of ['min','central','max'])a.ok(Math.abs(r.escenarios[k].vector[0]-.8)<1e-9);
});
test('operadores independientes; datos ausentes ≠ cero',()=>{
 const r=calcularSolicitud({grafo:model,medicionesSolicitadas:['iic']});a.equal(r.resultados.rStar,undefined);a.equal(r.convergencia,null);
 a.equal(calcularIIC([],[],0),null);a.throws(()=>calcularIIC(['x'],[],1));a.equal(calcularDTotal({...damage,tTrayectoria:{narrativa:'sin monto'}}),null);a.equal(calcularDTotal({...damage,tImpedido:{monto:20,unidad:'USD'}}),null);
 a.equal(calcularBStar(model.nodos.slice(0,2),{unidad:'MXN',valores:[{id:'a',valor:0},{id:'b',valor:0}]}).estado,'no_aplicable');a.equal(calcularBStar(model.nodos.slice(0,2),{unidad:'MXN',valores:[{id:'a',valor:0}]}).estado,'indeterminado');
});
test('declaraciones canónicas A/B/C/D, umbral exacto y empates explícitos',()=>{
 const d=(min,central,max)=>determinarDeclaracion({min:{vector:min},central:{vector:central},max:{vector:max}});
 a.equal(d([.6,.3,.1],[.6,.3,.1],[.7,.2,.1]).nivel,'A');a.equal(d([.6,.3,.1],[.6,.3,.1],[.6,.1,.3]).nivel,'B');a.equal(d([.3,.7],[.7,.3],[.7,.3]).nivel,'C');a.equal(d([.4,.6],[.54,.46],[.6,.4]).nivel,'D');a.equal(d([.4,.6],[.55,.45],[.6,.4]).nivel,'D');a.equal(d([.5,.5],[.5,.5],[.5,.5]).estado,'indeterminado');
});
test('sensibilidad marginal determinista: método explícito, aristas identificadas',()=>{
 const {crearAnalisis}=require('../dist-motor/modelo'); const m=crearAnalisis(model);
 const x=sensibilidadExtendida(m,{metodo:'una_arista_a_la_vez'});a.deepEqual(x,sensibilidadExtendida(m,{metodo:'una_arista_a_la_vez'}));a.equal(x.valor.length,8);a.ok(x.valor.every(r=>r.relacion));a.equal(sensibilidadExtendida(m,{}).estado,'indeterminado');
});
