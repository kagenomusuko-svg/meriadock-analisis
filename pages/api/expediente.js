"use strict";

const series = require('../../dist-motor/series');
const expediente = require('../../dist-motor/expediente');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo no permitido' });

  const { grafo, insumosAlpha, nodosIIC, metadatos } = req.body;

  if (!grafo || !grafo.nodos || !grafo.aristas) {
    return res.status(400).json({ error: 'Grafo invalido' });
  }

  try {
    const resultado = series.correrAnalisisCompleto(grafo, insumosAlpha || [], nodosIIC || []);
    const html = expediente.generarHTML(resultado, grafo, metadatos || {});

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);

  } catch (error) {
    console.error('Error expediente:', error);
    return res.status(500).json({ error: 'Error generando expediente', detalle: error.message });
  }
}
