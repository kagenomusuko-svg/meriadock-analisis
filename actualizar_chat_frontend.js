var fs = require('fs');
var c = fs.readFileSync('pages/chat.tsx', 'utf8');

// 1. Agregar estado para guardar el grafo del último análisis
c = c.replace(
  "const [archivos, setArchivos] = useState([])",
  "const [archivos, setArchivos] = useState([])\n  const [ultimoGrafo, setUltimoGrafo] = useState(null)\n  const [generandoExp, setGenerandoExp] = useState(false)"
);

// 2. Guardar el grafo cuando el motor lo procesa
c = c.replace(
  "const calcRes = await fetch(baseUrl + '/api/calcular', {",
  "setUltimoGrafo(grafoData);\n        const calcRes = await fetch(baseUrl + '/api/calcular', {"
);

// Eso está en chat.js no en chat.tsx — necesitamos el botón solo en el frontend
// Agregar función descargarExpediente
c = c.replace(
  "  async function enviar() {",
  `  async function descargarExpediente() {
    if (!ultimoGrafo) return
    setGenerandoExp(true)
    try {
      const res = await fetch('/api/expediente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grafo: ultimoGrafo,
          insumosAlpha: ultimoGrafo.insumosAlpha || [],
          nodosIIC: ultimoGrafo.nodosIIC || [],
          metadatos: { titulo: ultimoGrafo.titulo || 'Análisis Causal', folio: 'EP-' + Date.now() }
        })
      })
      const html = await res.text()
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
    } catch (e) {
      console.error('Error generando expediente:', e)
    } finally {
      setGenerandoExp(false)
    }
  }

  async function enviar() {`
);

// 3. Agregar botón después del área de mensajes, antes del input
c = c.replace(
  "<div style={{ borderTop:'1px solid #e8e3db', padding:'16px 24px', background:'#faf9f7' }}>",
  `{ultimoGrafo && (
              <div style={{ padding:'8px 24px', background:'#faf9f7', display:'flex', justifyContent:'center' }}>
                <button
                  onClick={descargarExpediente}
                  disabled={generandoExp}
                  style={{ padding:'10px 24px', background: generandoExp ? '#8aada9' : '#1E4C45', color:'#D9D9D9', border:'none', borderRadius:'8px', cursor: generandoExp ? 'not-allowed' : 'pointer', fontSize:'13px', fontFamily:'Georgia,serif', display:'flex', alignItems:'center', gap:'8px' }}
                >
                  {generandoExp ? 'Generando...' : '↓ Descargar expediente'}
                </button>
              </div>
            )}
            <div style={{ borderTop:'1px solid #e8e3db', padding:'16px 24px', background:'#faf9f7' }}>`
);

fs.writeFileSync('pages/chat.tsx', c);
console.log('Listo');
