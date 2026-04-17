const motor = require('../../dist-motor/r_estrella')
const phi1 = require('../../dist-motor/phi1')
const alphaMotor = require('../../dist-motor/alpha')
const deltaMotor = require('../../dist-motor/delta')
const derivados = require('../../dist-motor/derivados')

function calcularSDesdeHijo(hijo, nivelEP) {
  const rango = phi1.RANGOS_S[hijo] || phi1.RANGOS_S['anteros']
  let valor = rango.midpoint
  const min = nivelEP >= 4 ? rango.midpoint - 0.05 : rango.min
  const max = nivelEP >= 4 ? rango.midpoint + 0.05 : rango.max
  return { valor, min, max }
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo no permitido' })

  const { grafo, alfas } = req.body
  if (!grafo || !grafo.nodos || !grafo.aristas) {
    return res.status(400).json({ error: 'Grafo invalido' })
  }

  try {
    const rStarResult = motor.calcularRStarDesdeGrafo(grafo)
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
      const alphaVal = alphaMotor.calcularAlpha(alphaInsumos)
      const deltaVal = deltaMotor.calcularDelta(rStar[i], alphaVal)
      const rNeta = derivados.calcularRStarNeta(rStar[i], s.valor)

      return {
        nombre,
        rStar: parseFloat((rStar[i] * 100).toFixed(2)),
        s: parseFloat(s.valor.toFixed(3)),
        sRango: { min: s.min, max: s.max },
        alpha: parseFloat(alphaVal.toFixed(3)),
        delta: parseFloat(deltaVal.valor.toFixed(3)),
        signo: deltaVal.signo,
        diagnostico: deltaVal.diagnostico,
        rNeta: parseFloat((rNeta * 100).toFixed(2))
      }
    })

    const lider = resultados.reduce((a, b) => a.rStar > b.rStar ? a : b)
    const evidenciaPromedio = grafo.aristas.reduce((sum, a) => sum + (a.nivelEvidencia || 3), 0) / grafo.aristas.length

    const declaracion = derivados.determinarDeclaracion(
      evidenciaPromedio,
      rStarResult.convergio,
      true,
      lider.rStar / 100,
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