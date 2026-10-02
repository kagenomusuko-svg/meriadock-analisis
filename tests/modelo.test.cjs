const {test}=require('node:test'); const assert=require('node:assert/strict');
const {crearAnalisis,rangoRelacion}=require('../dist-motor/modelo');
test('D separado, cierre y E0 no eliminan nodos',()=>{
 const m=crearAnalisis({nodos:[{id:'a'},{id:'b',alpha:{valor:.3}},{id:'nodo_final',tipo:'final'}],aristas:[{origen:'a',destino:'b',nivelEvidencia:0},{origen:'b',destino:'nodo_final',pesoMin:1,pesoMax:1}]});
 assert.deepEqual(m.nodosActivos.map(n=>n.id),['a','b']); assert.equal(m.conexionesCierre.length,1); assert.equal(m.relacionesInternas.length,1);
 assert.deepEqual(rangoRelacion(m.relacionesInternas[0]),{min:0,max:0}); assert.equal(m.nodosActivos[1].alpha.valor,.3);
 assert.throws(()=>rangoRelacion({}),/ausente/);
});
test('modelo rechaza D activo y destinos inexistentes',()=>{
 assert.throws(()=>crearAnalisis({eventoDeterminado:{id:'a'},nodos:[{id:'a'}]}));
 assert.throws(()=>crearAnalisis({nodos:[{id:'a'}],aristas:[{origen:'a',destino:'x'}]}));
});
