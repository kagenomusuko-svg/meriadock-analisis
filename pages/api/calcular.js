"use strict";

const series = require('../../dist-motor/series');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo no permitido' });

  const { grafo, insumosAlpha, nodosIIC } = req.body;

  if (!grafo || !grafo.nodos || !grafo.aristas) {
    return res.status(400).json({ error: 'Grafo invalido' });
  }

  try {
    const resultado = series.correrAnalisisCompleto(grafo, insumosAlpha || [], nodosIIC || []);

    return res.status(200).json({
      rStar: resultado.rStar,
      alpha: resultado.alpha,
      delta: resultado.delta,
      serieII: resultado.serieII,
      estabilidad: resultado.estabilidad,
      declaracion: resultado.declaracion,
      convergencia: resultado.convergencia
    });

  } catch (error) {
    console.error('Error motor:', error);
    return res.status(500).json({ error: 'Error en el calculo', detalle: error.message });
  }
}
