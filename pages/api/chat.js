import Anthropic from '@anthropic-ai/sdk'
import mammoth from 'mammoth'
import { createClient } from '@supabase/supabase-js'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const config = { api: { bodyParser: { sizeLimit: '20mb' } } }

async function procesarArchivo(archivo) {
  const { nombre, tipo, base64 } = archivo
  const buffer = Buffer.from(base64, 'base64')
  if (tipo === 'application/pdf') return { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 }, nombre }
  if (tipo.startsWith('image/')) return { type: 'image', source: { type: 'base64', media_type: tipo, data: base64 }, nombre }
  if (tipo === 'text/plain') return { type: 'texto', contenido: buffer.toString('utf8'), nombre }
  if (tipo.includes('wordprocessingml') || nombre.endsWith('.docx')) {
    const r = await mammoth.extractRawText({ buffer })
    return { type: 'texto', contenido: r.value, nombre }
  }
  return null
}

const INSTRUCCION_GRAFO = `INSTRUCCION CRITICA SOBRE CALCULOS:
NUNCA calcules R*, S, alpha o Delta tu mismo. Cuando necesites estos valores incluye en tu respuesta un bloque con el grafo exactamente asi:

GRAFO_JSON_START
{
  "nodos": [
    {"id": "N1", "nombre": "Nombre del actor", "tipo": "diseno", "hijo_dominante": "fobos", "nivel_ep": 4}
  ],
  "aristas": [
    {"origen": "N1", "destino": "N2", "pesoMin": 0.5, "pesoMax": 0.8, "nivelEvidencia": 4, "descripcionEvidencia": "descripcion"}
  ]
}
GRAFO_JSON_END

El tipo puede ser: diseno, ejecucion, instrumental, final
El hijo_dominante puede ser: fobos, deimos, anteros, eros, potos, harmonia
nivel_ep va de 0 a 8

El motor matematico procesara el grafo y te devolvera R*, S, alpha, Delta. Tu usas esos numeros para la narrativa.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo no permitido' })

  const { messages, contexto, archivos, sesion_id, usuario_id } = req.body
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Messages requerido' })

  const nombre = contexto?.nombre || 'el usuario'
  const ocupacion = contexto?.ocupacion || 'no especificada'
  const uso = contexto?.uso || 'no especificado'

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  function enviarPaso(texto) {
    res.write('data: ' + JSON.stringify({ tipo: 'paso', contenido: texto }) + '\n\n')
  }

  function enviarFinal(texto) {
    res.write('data: ' + JSON.stringify({ tipo: 'final', contenido: texto }) + '\n\n')
    res.end()
  }

  function enviarError(texto) {
    res.write('data: ' + JSON.stringify({ tipo: 'error', contenido: texto }) + '\n\n')
    res.end()
  }

  try {
    const ultimoMensaje = messages[messages.length - 1]
    const mensajesAnteriores = messages.slice(0, -1)
    let contenidoUltimo = []

    if (archivos && archivos.length > 0) {
      enviarPaso('Leyendo documentos adjuntos...')
      const procesados = await Promise.all(archivos.map(procesarArchivo))
      for (const doc of procesados.filter(Boolean)) {
        if (doc.type === 'document') contenidoUltimo.push({ type: 'document', source: doc.source })
        else if (doc.type === 'image') contenidoUltimo.push({ type: 'image', source: doc.source })
        else if (doc.type === 'texto') contenidoUltimo.push({ type: 'text', text: '[Documento: ' + doc.nombre + ']\n\n' + doc.contenido })
      }
    }

    const textoUsuario = ultimoMensaje.content || ultimoMensaje.contenido || ''
    contenidoUltimo.push({ type: 'text', text: textoUsuario })

    const esAnalisis = textoUsuario.toLowerCase().includes('analiz') ||
      textoUsuario.toLowerCase().includes('responsab') ||
      textoUsuario.toLowerCase().includes('caso') ||
      archivos?.length > 0 ||
      messages.length > 3

    if (esAnalisis) {
      enviarPaso('Identificando actores causales...')
      await new Promise(r => setTimeout(r, 500))
      enviarPaso('Construyendo grafo G=(N,E,W)...')
      await new Promise(r => setTimeout(r, 500))
      enviarPaso('Preparando cálculo...')
      await new Promise(r => setTimeout(r, 400))
      enviarPaso('Generando análisis...')
    }

    const SYSTEM = `Eres la Calculadora Prometeo del Centro Multidisciplinario Meriadock. 
Usuario: ${nombre} (${ocupacion}). Uso principal: ${uso}.

${INSTRUCCION_GRAFO}

MODOS: CURIOSO (explica conceptos), INTROSPECTIVO (ECO autoreporte, una pregunta a la vez), ANALISTA (grafo + calculo), MEDIADOR (tecnico completo).
INSTRUMENTOS: ECO con 6 Hijos de Afrodita (Fobos, Deimos, Anteros, Eros, Potos, Harmonia), SDO 5 ejes (E,M,V,D,T), Prometeo R*/S/alpha/Delta, Declaracion A/B/C/D.
REGLAS: Una pregunta a la vez. Siempre dos capas: tecnica y narrativa. Responde en el idioma del usuario.`

    const messagesAPI = [
      ...mensajesAnteriores.map(m => ({
        role: m.role || (m.rol === 'usuario' ? 'user' : 'assistant'),
        content: m.content || m.contenido || ''
      })),
      { role: 'user', content: contenidoUltimo }
    ]

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: SYSTEM,
      messages: messagesAPI
    })

    let textoRespuesta = response.content.filter(b => b.type === 'text').map(b => b.text).join('')

    // Detectar bloque de grafo
    const grafoStart = textoRespuesta.indexOf('GRAFO_JSON_START')
    const grafoEnd = textoRespuesta.indexOf('GRAFO_JSON_END')

    if (grafoStart !== -1 && grafoEnd !== -1) {
      enviarPaso('Ejecutando motor matemático...')

      try {
        const grafoJson = textoRespuesta.substring(grafoStart + 'GRAFO_JSON_START'.length, grafoEnd).trim()
        const grafoData = JSON.parse(grafoJson)

        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
        const calcRes = await fetch(baseUrl + '/api/calcular', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ grafo: grafoData })
        })
        const calcData = await calcRes.json()

        enviarPaso('Generando análisis con resultados del motor...')

        // Segunda llamada con resultados del motor
        const textoSinGrafo = textoRespuesta.substring(0, grafoStart) + textoRespuesta.substring(grafoEnd + 'GRAFO_JSON_END'.length)
        const response2 = await anthropic.messages.create({
          model: 'claude-sonnet-4-5',
          max_tokens: 4096,
          system: SYSTEM + '\n\nIMPORTANTE: El motor matematico ya proceso el grafo. Usa EXACTAMENTE estos resultados para el analisis:\n' + JSON.stringify(calcData, null, 2),
          messages: [
            ...messagesAPI,
            { role: 'assistant', content: textoSinGrafo.trim() || 'He construido el grafo causal.' },
            { role: 'user', content: 'Genera ahora el analisis completo con los resultados del motor matematico.' }
          ]
        })

        const textoFinal = response2.content.filter(b => b.type === 'text').map(b => b.text).join('')

        if (sesion_id && usuario_id) {
          await supabase.from('mensajes_sesion').insert([
            { sesion_id, rol: 'usuario', contenido: textoUsuario },
            { sesion_id, rol: 'sistema', contenido: textoFinal }
          ])
        }

        enviarFinal(textoFinal)

      } catch (e) {
        console.error('Error motor:', e)
        enviarFinal(textoRespuesta.replace('GRAFO_JSON_START', '').replace('GRAFO_JSON_END', ''))
      }

    } else {
      if (sesion_id && usuario_id) {
        await supabase.from('mensajes_sesion').insert([
          { sesion_id, rol: 'usuario', contenido: textoUsuario },
          { sesion_id, rol: 'sistema', contenido: textoRespuesta }
        ])
      }
      enviarFinal(textoRespuesta)
    }

  } catch (error) {
    console.error('Error:', error)
    if (error.status === 429) {
      enviarError('El documento es demasiado extenso. Sube solo el fragmento relevante.')
    } else {
      enviarError('Hubo un problema al conectar. Intenta de nuevo.')
    }
  }
}