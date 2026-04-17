import Anthropic from '@anthropic-ai/sdk'
import mammoth from 'mammoth'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const config = { api: { bodyParser: { sizeLimit: '20mb' } } }

async function procesarArchivo(archivo) {
  const { nombre, tipo, base64 } = archivo
  const buffer = Buffer.from(base64, 'base64')

  if (tipo === 'application/pdf') {
    return { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 }, nombre }
  }

  if (tipo.startsWith('image/')) {
    const mediaType = tipo
    return { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 }, nombre }
  }

  if (tipo === 'text/plain') {
    const texto = buffer.toString('utf8')
    return { type: 'texto', contenido: texto, nombre }
  }

  if (tipo === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || nombre.endsWith('.docx')) {
    const resultado = await mammoth.extractRawText({ buffer })
    return { type: 'texto', contenido: resultado.value, nombre }
  }

  return null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo no permitido' })

  const { messages, contexto, archivos } = req.body
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Messages requerido' })

  const nombre = contexto?.nombre || 'el usuario'
  const ocupacion = contexto?.ocupacion || 'no especificada'
  const uso = contexto?.uso || 'no especificado'

  const SYSTEM_PROMPT = `Eres la Calculadora Prometeo, instrumento de analisis causal del Centro Multidisciplinario Meriadock, basada en el Sistema de la Doble Mediacion de Miguel Hilario Olvera Aguilar.

CONTEXTO DEL USUARIO:
- Nombre: ${nombre}
- Ocupacion: ${ocupacion}
- Uso principal: ${uso}

IDENTIDAD Y TONO:
- Eres precisa, calida y orientada al analisis.
- Siempre diriges al usuario por su nombre: ${nombre}.
- Eres directa pero empatica. Nunca condescendiente.
- Respondes en el idioma que use el usuario.

CUANDO EL USUARIO SUBE DOCUMENTOS:
- Lees el contenido con atencion forense.
- Identificas todos los actores con capacidad causal (nodos candidatos).
- Clasificas la evidencia segun niveles E0-E8 de Metrologia Causal.
- Reportas: que encontraste, que tipo de evidencia es, que nivel E0-E8 le asignas y por que.
- Identificas automaticamente el dominio del caso segun la Taxonomia General de Aplicaciones.
- Si detectas dominios adicionales que el usuario no menciono, los introduces como hallazgo.

MODOS DE OPERACION:
- CURIOSO: Explica con precision conceptual. Ofrece transitar a introspectivo si detectas intencion personal.
- INTROSPECTIVO: Arbol ECO adaptado para autoreporte. Una pregunta a la vez. Preguntas somaticas sutiles calibradas al modulo activo.
- ANALISTA: Tipo de pregunta causal 1-5. Grafo G=(N,E,W). Calcula R*, S, alpha, Delta. Declaracion A/B/C/D.
- MEDIADOR: Modo tecnico completo. Terminologia formal visible.

INSTRUMENTOS:
- ECO: 6 Hijos de Afrodita (Fobos, Deimos, Anteros, Eros, Potos, Harmonia) + 5 ejes SDO (E,M,V,D,T)
- Prometeo: R* eigenvector dominante de Wt, S sustituibilidad, alpha asuncion, Delta = R* - alpha
- Declaracion: A (alta certeza), B (moderada), C (incertidumbre estructural), D (maxima incertidumbre)

REGLAS:
- Una pregunta a la vez.
- Siempre dos capas de entregables: tecnica y narrativa.
- Si el usuario se sale del analisis causal, redirige con amabilidad.`

  try {
    const ultimoMensaje = messages[messages.length - 1]
    const mensajesAnteriores = messages.slice(0, -1)

    let contenidoUltimo = []

    if (archivos && archivos.length > 0) {
      const procesados = await Promise.all(archivos.map(procesarArchivo))
      const validos = procesados.filter(Boolean)

      for (const doc of validos) {
        if (doc.type === 'document') {
          contenidoUltimo.push({ type: 'document', source: doc.source })
          contenidoUltimo.push({ type: 'text', text: `[Documento adjunto: ${doc.nombre}]` })
        } else if (doc.type === 'image') {
          contenidoUltimo.push({ type: 'image', source: doc.source })
          contenidoUltimo.push({ type: 'text', text: `[Imagen adjunta: ${doc.nombre}]` })
        } else if (doc.type === 'texto') {
          contenidoUltimo.push({ type: 'text', text: `[Documento: ${doc.nombre}]

${doc.contenido}` })
        }
      }
    }

    contenidoUltimo.push({ type: 'text', text: ultimoMensaje.content || ultimoMensaje.contenido || '' })

    const messagesParaAPI = [
      ...mensajesAnteriores,
      { role: ultimoMensaje.role || 'user', content: contenidoUltimo }
    ]

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: messagesParaAPI
    })

    const texto = response.content.filter(b => b.type === 'text').map(b => b.text).join('')
    return res.status(200).json({ respuesta: texto })

  } catch (error) {
    console.error('Error Claude:', error)
    return res.status(500).json({ error: 'Error al conectar con Claude', detalle: error.message })
  }
}
