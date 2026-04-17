const fs = require('fs');

const api = `import Anthropic from '@anthropic-ai/sdk'
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
    res.write('data: ' + JSON.stringify({ tipo: 'paso', contenido: texto }) + '\\n\\n')
  }

  function enviarFinal(texto) {
    res.write('data: ' + JSON.stringify({ tipo: 'final', contenido: texto }) + '\\n\\n')
    res.end()
  }

  function enviarError(texto) {
    res.write('data: ' + JSON.stringify({ tipo: 'error', contenido: texto }) + '\\n\\n')
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
        else if (doc.type === 'texto') contenidoUltimo.push({ type: 'text', text: '[Documento: ' + doc.nombre + ']\\n\\n' + doc.contenido })
      }
    }

    contenidoUltimo.push({ type: 'text', text: ultimoMensaje.content || ultimoMensaje.contenido || '' })

    const esAnalisis = (ultimoMensaje.content || ultimoMensaje.contenido || '').toLowerCase().includes('analiz') ||
      archivos?.length > 0 ||
      messages.length > 4

    if (esAnalisis) {
      enviarPaso('Identificando actores causales...')
      await new Promise(r => setTimeout(r, 600))
      enviarPaso('Construyendo grafo G=(N,E,W)...')
      await new Promise(r => setTimeout(r, 600))
      enviarPaso('Calculando R*, S, α, Δ...')
      await new Promise(r => setTimeout(r, 800))
      enviarPaso('Generando análisis...')
    }

    const SYSTEM = 'Eres la Calculadora Prometeo del Centro Multidisciplinario Meriadock. Usuario: ' + nombre + ' (' + ocupacion + '). Uso: ' + uso + '.\\n\\n' +
      'INSTRUCCION CRITICA SOBRE CALCULOS:\\n' +
      'NUNCA calcules R*, S, alpha o Delta tu mismo. Cuando necesites estos valores debes incluir en tu respuesta un bloque JSON con el grafo para que el motor matematico lo procese:\\n' +
      '```grafo\\n{\\n  "nodos": [{"id": "N1", "nombre": "Nombre", "tipo": "diseno|ejecucion|instrumental|final", "hijo_dominante": "fobos|deimos|anteros|eros|potos|harmonia", "nivel_ep": 0-8}],\\n  "aristas": [{"origen": "N1", "destino": "N2", "pesoMin": 0.0, "pesoMax": 1.0, "nivelEvidencia": 0-8, "descripcionEvidencia": "..."}]\\n}\\n```\\n\\n' +
      'El motor calculara R*, S, alpha, Delta y te devolvera los resultados. Tu usas esos resultados para generar la narrativa.\\n\\n' +
      'MODOS: CURIOSO (explica conceptos), INTROSPECTIVO (ECO autoreporte, una pregunta a la vez), ANALISTA (grafo + calculo), MEDIADOR (tecnico completo).\\n' +
      'INSTRUMENTOS: ECO con 6 Hijos de Afrodita, SDO 5 ejes, Prometeo R*/S/alpha/Delta, Declaracion A/B/C/D.\\n' +
      'REGLAS: Una pregunta a la vez. Siempre dos capas: tecnica y narrativa. Responde en el idioma del usuario.'

    const messagesAPI = [
      ...mensajesAnteriores.map(m => ({ role: m.role || (m.rol === 'usuario' ? 'user' : 'assistant'), content: m.content || m.contenido })),
      { role: 'user', content: contenidoUltimo }
    ]

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: SYSTEM,
      messages: messagesAPI
    })

    const textoRespuesta = response.content.filter(b => b.type === 'text').map(b => b.text).join('')

    // Detectar si hay un bloque de grafo para procesar con el motor
    const grafoMatch = textoRespuesta.match(/\`\`\`grafo\\n([\\s\\S]*?)\\n\`\`\`/)
    if (grafoMatch) {
      enviarPaso('Ejecutando motor matematico...')
      try {
        const grafoData = JSON.parse(grafoMatch[1])
        const calcRes = await fetch(process.env.NEXTAUTH_URL || 'http://localhost:3000' + '/api/calcular', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ grafo: grafoData })
        })
        const calcData = await calcRes.json()

        // Segunda llamada a Claude con los resultados del motor
        const mensajeConResultados = textoRespuesta.replace(grafoMatch[0], '') + '\\n\\n[RESULTADOS DEL MOTOR]\\n' + JSON.stringify(calcData, null, 2)
        const response2 = await anthropic.messages.create({
          model: 'claude-sonnet-4-5',
          max_tokens: 4096,
          system: SYSTEM + '\\n\\nTienes los resultados del motor matematico. Genera la narrativa usando EXACTAMENTE estos numeros.',
          messages: [...messagesAPI, { role: 'assistant', content: mensajeConResultados }, { role: 'user', content: 'Ahora genera el analisis completo con estos resultados del motor.' }]
        })
        const textoFinal = response2.content.filter(b => b.type === 'text').map(b => b.text).join('')

        // Guardar en Supabase
        if (sesion_id && usuario_id) {
          await supabase.from('mensajes_sesion').insert([
            { sesion_id, rol: 'usuario', contenido: ultimoMensaje.content || ultimoMensaje.contenido || '' },
            { sesion_id, rol: 'sistema', contenido: textoFinal }
          ])
        }

        enviarFinal(textoFinal)
      } catch (e) {
        console.error('Error motor:', e)
        enviarFinal(textoRespuesta)
      }
    } else {
      // Guardar en Supabase
      if (sesion_id && usuario_id) {
        await supabase.from('mensajes_sesion').insert([
          { sesion_id, rol: 'usuario', contenido: ultimoMensaje.content || ultimoMensaje.contenido || '' },
          { sesion_id, rol: 'sistema', contenido: textoRespuesta }
        ])
      }
      enviarFinal(textoRespuesta)
    }

  } catch (error) {
    console.error('Error:', error)
    if (error.status === 429) {
      enviarError('El documento es demasiado extenso. Sube solo el fragmento relevante para el analisis.')
    } else {
      enviarError('Hubo un problema al conectar. Intenta de nuevo.')
    }
  }
}
`;

fs.writeFileSync('pages/api/chat.js', api);
console.log('API chat v2 con streaming creada');