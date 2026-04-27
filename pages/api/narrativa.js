import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const config = { api: { bodyParser: { sizeLimit: '2mb' } } }

const SYSTEM_NARRATIVA = `Eres el sistema de análisis narrativo del Método Prometeo del Centro Multidisciplinario Meriadock Formación y Asesoría A.C.

Tu función es única y acotada: recibir los resultados matemáticos de un análisis causal y producir una narrativa accesible para un cliente, juez o tomador de decisiones que no conoce el sistema formal.

REGLAS ABSOLUTAS:
- NUNCA modifiques, redondees ni interpretes los números. Úsalos exactamente como los recibes.
- NUNCA uses los términos: culpa, dolo, intención, negligencia, culpabilidad, responsabilidad subjetiva.
- NUNCA determinas condenas ni sanciones. Describes posiciones causales.
- NUNCA uses jerga técnica del sistema (eigenvector, softmax, phi, matriz W). El lector no la conoce.
- Tono: neutro, forense, accesible. Como un perito que explica su dictamen a un juez no especialista.
- Idioma: español formal. Sin anglicismos innecesarios.

NOMENCLATURA QUE DEBES USAR EN LA NARRATIVA:
- R* → "índice de convergencia de eventos"
- R*_neta → "contribución atribuible"
- S → "índice de sustituibilidad"
- α → "condiciones adversas atribuibles"
- Δ → "asimetría repercusiva"
- Brecha → "el actor convergió más de lo que sufrió en consecuencias"
- Sobreasunción → "las consecuencias sufridas superan su convergencia causal"
- Equilibrio → "convergencia y consecuencias se encuentran dentro del margen de equilibrio"

ESTRUCTURA DE LA NARRATIVA (produce exactamente estas secciones en HTML):

1. SÍNTESIS DEL CASO (2-3 párrafos)
   Describe qué ocurrió, qué actores participaron y cuál es el hallazgo principal del análisis.
   Si hay inversión causal (nodos con brecha y nodos con sobreasunción), explícala en términos concretos.
   Si el nodo líder es contraintuitivo (por ejemplo, un regulador con mayor índice que el ejecutor visible), explica por qué el análisis llega a ese resultado.

2. POSICIÓN CAUSAL DE CADA ACTOR (un párrafo por actor, excluye el nodo final)
   Para cada actor activo (no el nodo sumidero), explica en lenguaje llano:
   - Qué índice de convergencia tiene y qué significa en este caso concreto
   - Qué tan sustituible era su posición (si S > 0.60: "cualquier otro en esa posición habría actuado de manera similar"; si S < 0.35: "pocas personas en esa posición habrían tomado la misma decisión")
   - Su contribución atribuible específica
   - Su asimetría repercusiva y lo que implica

3. ORIENTACIONES (solo si hay nodos con |Δ| > 0.10)
   Para cada nodo con asimetría repercusiva significativa:
   - Si tiene brecha: qué significa que causó más de lo que sufrió en consecuencias
   - Si tiene sobreasunción: qué significa y el riesgo de que esté asumiendo consecuencias que corresponden a otro actor
   
4. ROBUSTEZ DEL ANÁLISIS (1 párrafo)
   Explica la Declaración A/B/C/D en términos del porcentaje de estabilidad y lo que eso significa para la solidez del resultado.

IMPORTANTE: Produce HTML limpio con etiquetas <h2>, <h3>, <p>. Sin <html>, <head> ni <body>. Sin CSS inline. Solo el contenido narrativo.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' })

  const { resultado, grafo, metadatos } = req.body
  if (!resultado || !grafo) return res.status(400).json({ error: 'Datos incompletos' })

  try {
    // Preparar resumen limpio para la IA (sin datos técnicos innecesarios)
    const resumenParaIA = {
      titulo: grafo.titulo || 'Análisis causal',
      resultado_final: grafo.nodos.find(n => n.tipo === 'final')?.nombre || 'Resultado final',
      actores: resultado.rStar
        .filter(r => r.valor > 0 || resultado.delta.find(d => d.nodo === r.nodo)?.resultado)
        .filter(r => {
          const nd = grafo.nodos.find(n => n.nombre === r.nodo)
          return nd && nd.tipo !== 'final'
        })
        .map(r => {
          const nd  = grafo.nodos.find(n => n.nombre === r.nodo)
          const al  = resultado.alpha.find(a => a.nodo === r.nodo)
          const dl  = resultado.delta.find(d => d.nodo === r.nodo)
          return {
            nombre:                 r.nodo,
            tipo:                   nd?.tipo || '—',
            indice_convergencia:    (r.valor * 100).toFixed(2) + '%',
            sustituibilidad:        ((r.s || 0) * 100).toFixed(2) + '%',
            contribucion_atribuible:(r.neta * 100).toFixed(2) + '%',
            condiciones_adversas:   ((al?.valor || 0) * 100).toFixed(2) + '%',
            asimetria_repercusiva:  dl?.resultado?.valor?.toFixed(3) || '0.000',
            diagnostico:            dl?.resultado?.signo || 'equilibrio',
          }
        }),
      declaracion: {
        nivel:          resultado.declaracion?.nivel,
        pct_estabilidad:(resultado.estabilidad?.pctEstabilidad || 0).toFixed(1) + '%',
        total_vertices: resultado.estabilidad?.totalVertices,
        descripcion:    resultado.declaracion?.descripcion,
      },
      inversion_causal: resultado.delta.some(d => d.resultado?.signo === 'brecha') &&
                        resultado.delta.some(d => d.resultado?.signo === 'sobreasuncion'),
    }

    const prompt = `Genera la narrativa del siguiente análisis causal. Usa exactamente los números proporcionados.

DATOS DEL ANÁLISIS:
${JSON.stringify(resumenParaIA, null, 2)}

Produce la narrativa completa en HTML según las instrucciones del sistema.`

    const response = await anthropic.messages.create({
      model:      'claude-sonnet-4-5',
      max_tokens: 2000,
      system:     SYSTEM_NARRATIVA,
      messages:   [{ role: 'user', content: prompt }]
    })

    const narrativaHTML = response.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')

    // Construir HTML completo con encabezado institucional
    const LOGO_B64 = require('../../dist-motor/logo_b64')
    const folio = metadatos?.folio || 'EN-' + Date.now()
    const fecha  = metadatos?.fecha || new Date().toLocaleDateString('es-MX')
    const titulo = grafo.titulo || 'Análisis causal'

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Análisis narrativo · ${folio}</title>
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Cormorant+Garamond:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'EB Garamond', Georgia, serif;
      font-size: 11.5pt;
      color: #1a1a1a;
      background: #fff;
      line-height: 1.75;
      max-width: 820px;
      margin: 0 auto;
      padding: 48px 56px;
    }
    .header-institucional {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 20px;
      padding-bottom: 16px;
    }
    .header-institucional img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      filter: drop-shadow(2px 3px 3px rgba(120,120,120,0.35));
      flex-shrink: 0;
    }
    .header-texto { flex: 1; text-align: center; }
    .nombre-ac {
      font-family: 'Cormorant Garamond', 'Times New Roman', serif;
      font-size: 13pt;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #1f7a4f;
      margin-bottom: 4px;
    }
    .pleca-tabla { width: 100%; border-collapse: collapse; margin: 4px 0 3px 0; }
    .sub-ac { font-size: 9pt; color: #444; line-height: 1.4; }
    .cluni   { font-size: 9pt; color: #555; }
    .frase {
      font-size: 8pt;
      font-style: italic;
      color: #1f7a4f;
      margin-top: 6px;
      line-height: 1.4;
    }
    .titulo-caso {
      border-top: 2px solid #1E4C45;
      border-bottom: 1px solid #1E4C45;
      padding: 12px 0;
      margin-bottom: 14px;
      text-align: center;
    }
    .titulo-caso h1 {
      font-family: 'EB Garamond', serif;
      font-size: 18pt;
      font-weight: 600;
      color: #1E4C45;
    }
    .titulo-caso .meta {
      font-size: 9pt;
      color: #555;
      margin-top: 5px;
    }
    .etiqueta-narrativa {
      display: inline-block;
      background: #e8f0ee;
      color: #1E4C45;
      font-size: 8pt;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 3px 12px;
      border-radius: 3px;
      margin-bottom: 28px;
    }
    h2 {
      font-family: 'EB Garamond', serif;
      font-size: 13pt;
      font-weight: 600;
      color: #1E4C45;
      border-bottom: 1.5px solid #1E4C45;
      padding-bottom: 5px;
      margin: 32px 0 14px;
    }
    h3 {
      font-family: 'EB Garamond', serif;
      font-size: 11.5pt;
      font-weight: 500;
      color: #2d2d2d;
      margin: 20px 0 8px;
    }
    p { margin-bottom: 12px; }
    strong { font-weight: 600; color: #1E4C45; }
    .deslinde {
      font-size: 8pt;
      color: #666;
      margin-top: 40px;
      padding-top: 14px;
      border-top: 1px solid #e0e0e0;
      line-height: 1.6;
    }
    .pie {
      font-size: 8pt;
      color: #999;
      text-align: center;
      margin-top: 14px;
    }
    @media print {
      body { padding: 28px 36px; }
      .pleca-tabla td { border-top: 1px solid #1f7a4f !important; }
      table { page-break-inside: avoid; }
      h2, h3 { page-break-after: avoid; }
    }
  </style>
</head>
<body>

  <!-- Encabezado institucional -->
  <div class="header-institucional">
    <img src="${LOGO_B64}" alt="Sello institucional">
    <div class="header-texto">
      <div class="nombre-ac">CENTRO MULTIDISCIPLINARIO MERIADOCK</div>
      <table class="pleca-tabla" cellspacing="0" cellpadding="0">
        <tr>
          <td style="border-top:1px solid #1f7a4f;font-size:0;line-height:0;height:1px"></td>
          <td style="width:20px;font-size:0;line-height:0"></td>
          <td style="border-top:1px solid #1f7a4f;font-size:0;line-height:0;height:1px"></td>
        </tr>
      </table>
      <div class="sub-ac">Formación y Asesoría A.C.</div>
      <div class="cluni">CLUNI CMM25080811X9X</div>
      <div class="frase">&ldquo;La fuerza interior nos impulsa, un pequeño apoyo de los demás nos bendice&rdquo;</div>
    </div>
  </div>

  <!-- Título del caso -->
  <div class="titulo-caso">
    <h1>${titulo}</h1>
    <div class="meta">
      Folio: <strong>${folio}</strong> &nbsp;·&nbsp; ${fecha} &nbsp;·&nbsp; Análisis narrativo · Método Prometeo
    </div>
  </div>

  <div class="etiqueta-narrativa">Declaración narrativa — documento complementario al expediente matemático</div>

  <!-- Narrativa generada por IA -->
  ${narrativaHTML}

  <!-- Deslinde -->
  <div class="deslinde">
    <strong>Deslinde de responsabilidad.</strong> El Centro Multidisciplinario Meriadock Formación y Asesoría A.C.
    se responsabiliza de la correcta aplicación del Método Prometeo y de la precisión matemática del cálculo.
    La narrativa es una interpretación del análisis formal producida por sistema de inteligencia artificial
    bajo supervisión del analista responsable. No se responsabiliza de los parámetros aportados por el usuario.
    Este documento no constituye peritaje judicial, diagnóstico clínico ni asesoría legal.
  </div>
  <div class="pie">Folio ${folio} &nbsp;·&nbsp; Generado el ${fecha} &nbsp;·&nbsp; Método Prometeo · Centro Multidisciplinario Meriadock</div>

</body>
</html>`

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    return res.status(200).send(html)

  } catch (error) {
    console.error('Error narrativa:', error)
    return res.status(500).json({ error: 'Error generando la narrativa', detalle: error.message })
  }
}
