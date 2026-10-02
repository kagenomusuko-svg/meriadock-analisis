const {test}=require('node:test'); const assert=require('node:assert/strict');
const {calcularRStar}=require('../dist-motor/r_estrella');
const {construirMatrizEmpirica,desdeDensa,diagnosticar,regularizarMatriz,multiplicar}=require('../dist-motor/grafo');
test('fixture canónico eigenvector derecho (.8,.2), residuo y rondas',()=>{
 const r=calcularRStar([[.9,.4],[.1,.6]]);assert.ok(r.convergio); assert.ok(Math.abs(r.vector[0]-.8)<1e-9);assert.ok(r.residuo<1e-9);assert.ok(Math.abs(r.eigenvalorDominante-1)<1e-9);assert.ok(r.rondas[1].producto);
});
test('D excluido, pesos empíricos sin normalización; E0 conserva coordenada',()=>{
 const W=construirMatrizEmpirica({nodos:[{id:'a'},{id:'b'},{id:'nodo_final',tipo:'final'}],aristas:[{origen:'a',destino:'b',pesoMin:.2,pesoMax:.4},{origen:'b',destino:'a',nivelEvidencia:0},{origen:'a',destino:'nodo_final',pesoMin:1,pesoMax:1}]});
 assert.equal(W.n,2);assert.deepEqual(W.ids,['a','b']);assert.ok(Math.abs(W.entradas[0].valor-.3)<1e-15); assert.equal(W.entradas[1].valor,0);
 assert.equal(calcularRStar(W).vector,null);
});
test('reducible, periódica y regularización explícita separada',()=>{
 assert.equal(diagnosticar(desdeDensa([[1,0],[0,.5]])).irreducible,false);
 const w=desdeDensa([[0,2],[1,0]]);assert.equal(diagnosticar(w).periodo,2);assert.equal(calcularRStar(w,{maxIteraciones:50}).convergio,false);
 const cfg={epsilon:.01,K:{tipo:'constante',valor:1}};const r=calcularRStar(w,{regularizacion:cfg});assert.ok(r.convergio);assert.ok(r.diagnostico.primitiva);assert.deepEqual(r.W_E,w);assert.equal(w.regularizacion,undefined);
 assert.deepEqual(multiplicar(regularizarMatriz(desdeDensa([[0,0],[0,0]]),cfg),[.8,.2]),[.01,.01]);
 assert.throws(()=>regularizarMatriz(w,{epsilon:.01}));
});
test('1000 nodos sparse deterministas, memoria O(E+N)',()=>{
 const n=1000,modelo={nodos:Array.from({length:n},(_,i)=>({id:String(i)})),aristas:Array.from({length:n},(_,i)=>[{origen:String(i),destino:String(i),pesoMin:1,pesoMax:1},{origen:String(i),destino:String((i+1)%n),pesoMin:.5,pesoMax:.5}]).flat()};
 const w=construirMatrizEmpirica(modelo);const r=calcularRStar(w);assert.ok(r.convergio);assert.equal(w.entradas.length,2000);assert.ok(r.vector.every(x=>x>=0));assert.ok(Math.abs(r.vector.reduce((s,x)=>s+x,0)-1)<1e-12);assert.equal(r.rondas.length,0);assert.equal(r.W_E.matriz,undefined);
});
