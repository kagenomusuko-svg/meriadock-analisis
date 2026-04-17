const fs = require('fs');

const apiCalcular = `import { calcularRStarDesdeGrafo, calcularSDesdeHijo, calcularAlpha, calcularDelta, calcularRStarNeta, determinarDeclaracion } from '../../dist-motor/index'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo no permitido' })

  const { grafo, alfas } = req.body
  if (!grafo || !grafo.nodos || !grafo.aristas) {
    return res.status(400).json({ error: 'Grafo invalido' })
  }

  try {
    const rStarResult = calcularRStarDesdeGrafo(grafo)
    const rStar = rStarResult.vector
    const nombresNodos = rStarResult.nombresNodos

    const resultados = nombresNodos.map((nombre, i) => {
      const nodo = grafo.nodos.find(n => n.nombre === nombre)
      const hijo = nodo?.hijo_dominante || 'anteros'
      const nivelEP = nodo?.nivel_ep || 3

      const s = calcularSDesdeHijo(hijo, nivelEP)
      const alphaInsumos = alfas?.[nombre] || {
        integrado: true,
        nDoc: Math.round(nivelEP * 1.5),
        nivelEvidencia: nivelEP,
        nDom: 2,
        nI: 4
      }
      const alpha = calcularAlpha(alphaInsumos)
      const delta = calcularDelta(rStar[i], alpha)
      const rNeta = calcularRStarNeta(rStar[i], s.valor)

      return {
        nombre,
        rStar: rStar[i],
        s: s.valor,
        sRango: { min: s.min, max: s.max },
        alpha,
        delta: delta.valor,
        signo: delta.signo,
        diagnostico: delta.diagnostico,
        rNeta
      }
    })

    const lider = resultados.reduce((a, b) => a.rStar > b.rStar ? a : b)
    const evidenciaPromedio = grafo.aristas.reduce((sum, a) => sum + (a.nivelEvidencia || 3), 0) / grafo.aristas.length

    const declaracion = determinarDeclaracion(
      evidenciaPromedio,
      rStarResult.convergio,
      true,
      lider.rStar,
      lider.nombre
    )

    return res.status(200).json({
      resultados,
      declaracion,
      iteraciones: rStarResult.iteraciones,
      convergio: rStarResult.convergio
    })

  } catch (error) {
    console.error('Error motor:', error)
    return res.status(500).json({ error: 'Error en el calculo', detalle: error.message })
  }
}
`;

fs.writeFileSync('pages/api/calcular.js', apiCalcular);
console.log('API calcular creada');