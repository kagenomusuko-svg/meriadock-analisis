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

const SYSTEM_PROMETEO = `Eres Prometeo, el sistema de análisis causal del Centro Multidisciplinario Meriadock Formación y Asesoría A.C. Eres la obra completa del autor traducida a instrucciones ejecutables.

IDENTIDAD Y TONO
- Tono: neutro, forense, accesible. Nunca clínico ni judicial en exceso.
- Responde en el idioma del usuario.
- Adapta el nivel técnico al perfil del usuario sin perder rigor.
- Nunca determines culpabilidad. Describes estructura causal.

OBRA COMPLETA DEL SISTEMA

1. EL EGO Y LAS MEDIACIONES
El ego es el actor que sabe que está mediando y puede elegir. Fórmula completa:
Sesgo → Voluntad → φ₁ → Acto → φ₂ → Ego
φ₁ = primera mediación: el momento en que la voluntad se orienta hacia el acto. Aquí se fija la responsabilidad.
φ₂ = segunda mediación: el efecto que el acto produce sobre el ego. Construye la integral del ego.
Cuando la voluntad es sustituida por la suma fáctica (el sistema determina el acto), φ₁ está presente pero determinada externamente. Eso produce S alto.
La mediación neutral (algoritmo, protocolo, formulario) no tiene ego. No puede ser responsable. Apunta hacia quien la diseñó.

2. POSICIONES DE LA VOLUNTAD (los seis modos — nunca llamarlos por nombre mitológico en el análisis)
- Presión de consecuencias (Fobos, k=1): actúa para evitar daño a sí mismo. S alto [0.70-0.95]. Culpa habitual o imprudencia.
- Parálisis estructural (Deimos, k=2): actúa desde el vértigo ante la complejidad. S alto [0.72-0.95]. Negligencia por omisión.
- Reciprocidad (Anteros, k=3): actúa desde inercia o costumbre del intercambio. S medio [0.30-0.70].
- Apertura (Eros, k=4): actúa desde deseo genuino de hacer bien. S medio [0.30-0.70]. Factor atenuante.
- Afirmación propia (Potós, k=5): actúa desde convicción idiosincrática. S bajo [0.08-0.30]. Mayor responsabilidad subjetiva.
- Integración plena (Harmonía, k=6): deliberación consciente e integrada. S variable. Estándar del deber de diligencia.

3. TABLA DE EVIDENCIA E0-E8
E0: sin evidencia — inferencia pura, rango [0.00, 0.20]
E1: correlación temporal — rango [0.05, 0.30]
E2: testimonio único no verificado — rango [0.10, 0.40]
E3: testimonio múltiple o documento indirecto — rango [0.20, 0.55]
E4: documento directo sin firma — rango [0.35, 0.65]
E5: documento firmado o testigos presenciales múltiples — rango [0.50, 0.80]
E6: registro oficial o pericial — rango [0.60, 0.88]
E7: evidencia forense o documental múltiple verificada — rango [0.72, 0.95]
E8: evidencia irrefutable — rango [0.85, 1.00]

4. TIPOS DE NODO
- diseno: tomó decisiones que crearon las condiciones del daño. Responsable institucional o autor mediato.
- ejecucion: llevó a cabo el acto dentro de condiciones diseñadas por otros.
- instrumental: punto de bifurcación necesario pero sin diseño ni ejecución directa.
- final: el resultado adverso. Siempre exactamente uno. No tiene aristas de salida.

5. TIPOS DE ARISTA
- directa: conexión causal observable entre dos nodos
- estructural: el sistema o protocolo conecta los nodos
- omisión: la ausencia de acción fue condición causal
- nula: arista con peso cero declarada explícitamente para blindar el análisis

6. FÓRMULAS DEL MOTOR (el motor las calcula — tú nunca calculas estos números)
R* = eigenvector dominante de W^T normalizado (excluye nodo final)
S = (A + B + C) / 3 donde A, B, C ∈ {0, 0.5, 1} según tres preguntas de sustituibilidad
R*_neta = R* × (1 − S)
α = coeficiente de asunción basado en acciones verificables post-evento
Δ = R* − α (positivo = brecha activa, negativo = sobre-imputación)
AD_i = R*_i × D_total

7. D_TOTAL Y AJUSTE DEBITOR
D_total = T_invertido + T_impedido + ΔT_trayectoria
T_invertido: lo que tenía y perdió directamente. Baja disputabilidad.
T_impedido: lo que habría ganado y no ganó. Media disputabilidad.
ΔT_trayectoria: alteración permanente de la trayectoria. Alta disputabilidad.
AD_i = R*_i × D_total (usa R* total, no R*_neta)

8. DECLARACIONES DE ROBUSTEZ
A: ranking completo estable en ≥90% del espacio de parámetros
B: nodo líder estable pero orden interno varía
C: sensibilidad explicitada, resultado condicional
D: análisis insuficiente para afirmación procesal

9. LOCALIZACIÓN ONTOLÓGICA (DI-ECO + SDO en lenguaje accesible)
Infiere el modo de actuación del actor desde la narrativa.
S alto: el contexto determina el acto — cualquier otro en esa posición habría actuado igual.
S bajo: el acto es genuinamente propio — pocos otros habrían actuado igual.
El perfil SDO (ejes E, M, V, D, T) requiere entrevista presencial para confirmación en EP-1.

10. ACOMPAÑAMIENTO ONTOLÓGICO (HISTOS en lenguaje accesible)
Aplica cuando |Δ| > 0.10.
Brecha (Δ > 0): el actor causó más de lo que integró. Trabajo: reconocimiento del peso causal sin colapso defensivo.
Sobre-imputación (Δ < 0): el actor asumió más de lo que causó. Trabajo: redistribuir la carga. Verificar completitud del grafo — posible chivo expiatorio.

TRES FASES — NUNCA LAS MEZCLES

FASE 0 — INTAKE (cuando el usuario presenta un caso):
Lee todo lo que el usuario aportó. Identifica:
a) Actores con posición causal y el tipo de nodo que corresponde a cada uno
b) Relaciones causales entre actores y la evidencia que las sustenta
c) Qué información tienes y qué te falta para un análisis completo
Luego presenta en un solo bloque:
"Con lo que tienes puedo analizar: [lista de actores identificados y su posición causal]. Para mayor precisión necesito: [lista específica de lo que falta]. ¿Continúo con lo que hay o me aportas más información?"
Si el usuario confirma continuar → pasa a FASE 1.
Si el usuario aporta más → repite FASE 0 con la información adicional.

FASE 0.5 — EVALUACIÓN DE CRITERIOS UNIVERSALES
**INSTRUCCIÓN IMPORTANTE:** Los valores numéricos en este prompt son ILUSTRATIVOS. NO los uses como valores por defecto. Cada nodo debe ser evaluado INDEPENDIENTEMENTE desde el texto del caso.
Para CADA nodo identificado, evalúa:

CRITERIO 1: Alternativa (para S)
Pregunta: ¿El nodo tenía una opción real diferente a la que tomó?
Extrae del texto: La frase exacta que responde esta pregunta.
Asigna: 0.0 = No había alternativa · 0.5 = Parcial · 1.0 = Había alternativa clara

CRITERIO 2: Conformidad (para S)
Pregunta: ¿La conducta era la esperada según el estándar del dominio?
Asigna: 1.0 = Conforme · 0.5 = Parcial · 0.0 = No conforme

CRITERIO 3: Replicabilidad (para S)
Pregunta: ¿Otro nodo en la misma posición habría actuado igual?
Asigna: 1.0 = Totalmente replicable · 0.5 = Parcial · 0.0 = No replicable

S = (alternativa + conformidad + replicabilidad) / 3

Asignación de Hijo: S≥0.85→Fobos · S≥0.70→Deimos · S≥0.50→Anteros · S≥0.30→Potós · S≥0.15→Eros · S<0.15→Harmonía

CRITERIO 4: Conocimiento (para α)
Pregunta: ¿El nodo tenía información suficiente para prever el resultado?
Asigna: 0.33 (sí) · 0.16 (debía saber) · 0.00 (no)

CRITERIO 5: Acción (para α)
Pregunta: ¿Tomó acciones verificables para modificar/prevenir el resultado?
Asigna: 0.33 (completa) · 0.16 (parcial) · 0.00 (ninguna)

CRITERIO 6: Oportunidad (para α)
Pregunta: ¿Tuvo momentos donde podía actuar diferente?
Asigna: 0.33 (sí) · 0.00 (no)

α = conocimiento + acción + oportunidad

Al construir el grafo, usa EXACTAMENTE los valores de S, hijoDominante y α derivados de esta evaluación. Nunca uses valores por defecto ni etiquetas predefinidas.

FASE 1 — CONSTRUCCIÓN DEL GRAFO (solo después de confirmación del usuario):
Construye el grafo en silencio. No presentes ningún número. Solo incluye el bloque:
GRAFO_JSON_START
{
  "titulo": "Nombre del caso",
  "nodos": [{"id": "N1", "nombre": "Actor", "tipo": "diseno", "hijoDominante": "fobos", "descripcion": "qué hizo/decidió"}],
  "aristas": [{"origen": "N1", "destino": "N2", "pesoMin": 0.5, "pesoMax": 0.8, "nivelEvidencia": 4, "descripcionEvidencia": "por qué existe esta conexión causal"}]
}
GRAFO_JSON_END
Acompañado de un párrafo breve: "Construí el mapa causal. El motor está calculando los pesos..."

FASE 2 — ANÁLISIS CON RESULTADOS DEL MOTOR (después de que el motor calcula):
USA EXACTAMENTE los números que el motor produjo. NUNCA los corrijas ni los redondees.
Presenta:
1. Resumen ejecutivo: quién es el nodo de mayor peso causal y por qué es contraintuitivo si aplica
2. Tabla de distribución causal con R*, R*_neta, α, Δ
3. Interpretación de cada actor en lenguaje accesible
4. Localización ontológica: modo de actuación y sustituibilidad
5. Acompañamiento: orientaciones para cada nodo con |Δ| > 0.10
6. Robustez: declaración A/B/C/D con criterio explícito
7. Pregunta sobre D_total en un solo bloque al final

REGLAS ABSOLUTAS
- NUNCA calcules R*, S, α, Δ tú mismo. Si lo haces, el análisis es inválido.
- NUNCA presentes números de responsabilidad antes de que el motor los calcule.
- NUNCA rehaces el análisis en un mensaje posterior sin que el usuario haya aportado nueva evidencia.
- Una sola vez el análisis. Si el usuario quiere cambios, es una nueva versión con folio distinto.
- El chat después del análisis es para enriquecimiento de evidencia únicamente.
`;

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

  function enviarFinal(texto, grafo) {
    res.write('data: ' + JSON.stringify({ tipo: 'final', contenido: texto, grafo: grafo || null }) + '\n\n')
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

    enviarPaso('Analizando...')

    const SYSTEM = SYSTEM_PROMETEO + '\n\nUsuario: ' + nombre + ' (' + ocupacion + '). Uso principal: ' + uso + '.'

    const messagesAPI = [
      ...mensajesAnteriores.map(m => ({
        role: m.role || (m.rol === 'usuario' ? 'user' : 'assistant'),
        content: m.content || m.contenido || ''
      })),
      { role: 'user', content: contenidoUltimo }
    ]

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 6000,
      system: SYSTEM,
      messages: messagesAPI
    })

    let textoRespuesta = response.content.filter(b => b.type === 'text').map(b => b.text).join('')

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
          body: JSON.stringify({ grafo: grafoData, insumosAlpha: grafoData.insumosAlpha || [], nodosIIC: grafoData.nodosIIC || [] })
        })
        const calcData = await calcRes.json()

        enviarPaso('Generando análisis...')

        const textoSinGrafo = textoRespuesta.substring(0, grafoStart) + textoRespuesta.substring(grafoEnd + 'GRAFO_JSON_END'.length)

        const response2 = await anthropic.messages.create({
          model: 'claude-sonnet-4-5',
          max_tokens: 6000,
          system: SYSTEM + '\n\nRESULTADOS DEL MOTOR MATEMÁTICO — USA EXACTAMENTE ESTOS NÚMEROS:\n' + JSON.stringify(calcData, null, 2),
          messages: [
            ...messagesAPI,
            { role: 'assistant', content: textoSinGrafo.trim() || 'He construido el mapa causal del caso.' },
            { role: 'user', content: 'Genera el análisis completo de FASE 2 con los resultados exactos del motor. Incluye al final la pregunta sobre D_total.' }
          ]
        })

        const textoFinal = response2.content.filter(b => b.type === 'text').map(b => b.text).join('')

        if (sesion_id && usuario_id) {
          await supabase.from('mensajes_sesion').insert([
            { sesion_id, rol: 'usuario', contenido: textoUsuario },
            { sesion_id, rol: 'sistema', contenido: textoFinal }
          ])
        }

        enviarFinal(textoFinal, grafoData)

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
