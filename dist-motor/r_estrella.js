"use strict";
var grafo = require('./grafo');

function multWtR(W, r) {
  var n = W.length, res = new Array(n).fill(0);
  for (var j=0;j<n;j++) for (var i=0;i<n;i++) res[j] += W[i][j]*r[i];
  return res;
}

function normL1(v) {
  var s = v.reduce(function(a,x){ return a+Math.abs(x); },0);
  if (s<1e-10) return v.map(function(){ return 1/v.length; });
  return v.map(function(x){ return x/s; });
}

function distL1(a,b) {
  return a.reduce(function(s,v,i){ return s+Math.abs(v-b[i]); },0);
}

exports.calcularRStar = function(W, maxIter, tol) {
  maxIter = maxIter||1000; tol = tol||1e-9;
  var n=W.length, r=new Array(n).fill(1/n), iter=0, conv=false;
  for (var k=0;k<maxIter;k++) {
    iter++;
    var rN = normL1(multWtR(W,r));
    var d = distL1(rN,r);
    r = rN;
    if (d<tol) { conv=true; break; }
  }
  var Wtr = multWtR(W,r);
  var eig = Wtr.reduce(function(a,v){ return a+Math.abs(v); },0);
  return { vector:r, iteraciones:iter, convergio:conv, eigenvalor:eig };
};

exports.calcularRStarDesdeGrafo = function(g, eps) {
  var W = grafo.construirMatrizW(g);
  var Wp = grafo.pertrubarMatriz(W, eps||0.01);
  var res = exports.calcularRStar(Wp);

  // Excluir nodo final del resultado — no es actor causal
  // El nodo final es el sumidero, no debe aparecer en R*
  var nodosActores = g.nodos.filter(function(n){ return n.tipo !== 'final'; });
  var indicesActores = g.nodos.map(function(n,i){ return n.tipo !== 'final' ? i : -1; })
                              .filter(function(i){ return i >= 0; });

  // Extraer y renormalizar R* solo para nodos actores
  var vectorActores = indicesActores.map(function(i){ return res.vector[i]; });
  var sumaActores = vectorActores.reduce(function(s,v){ return s+v; },0);
  var vectorNorm = sumaActores > 0
    ? vectorActores.map(function(v){ return v/sumaActores; })
    : vectorActores.map(function(){ return 1/vectorActores.length; });

  return {
    vector: vectorNorm,
    iteraciones: res.iteraciones,
    convergio: res.convergio,
    eigenvalor: res.eigenvalor,
    nombresNodos: nodosActores.map(function(n){ return n.nombre; })
  };
};
