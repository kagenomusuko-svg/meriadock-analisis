const fs = require('fs');

let c = fs.readFileSync('pages/chat.tsx', 'utf8');

// Reemplazar la funcion enviar completa
const enviarNueva = `
  async function enviar() {
    if (!input.trim() && archivos.length === 0) return
    if (cargando) return
    const texto = input.trim()
    setInput('')

    let archivosData = []
    if (archivos.length > 0) {
      archivosData = await Promise.all(archivos.map(async f => ({ nombre: f.name, tipo: f.type, base64: await fileToBase64(f) })))
      setArchivos([])
    }

    const etiqueta = archivosData.length > 0 ? ' [' + archivosData.map(a => a.nombre).join(', ') + ']' : ''
    const nuevos = [...mensajes, { rol: 'usuario', contenido: texto + etiqueta }]
    setMensajes(nuevos)
    setCargando(true)
    setMensajes(prev => [...prev, { rol: 'sistema', contenido: 'Analizando...', esPaso: true }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nuevos.map(m => ({ role: m.rol === 'usuario' ? 'user' : 'assistant', content: m.contenido })),
          contexto: { nombre: perfil?.nombre_preferido, ocupacion: perfil?.ocupacion, uso: perfil?.uso_principal },
          archivos: archivosData
        })
      })

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\\n')
        buffer = lines.pop()
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const data = JSON.parse(line.slice(6))
            if (data.tipo === 'paso') {
              setMensajes(prev => [...prev.filter(m => !m.esPaso), { rol: 'sistema', contenido: data.contenido, esPaso: true }])
            } else if (data.tipo === 'final' || data.tipo === 'error') {
              setMensajes(prev => [...prev.filter(m => !m.esPaso), { rol: 'sistema', contenido: data.contenido }])
            }
          } catch {}
        }
      }
    } catch {
      setMensajes(prev => [...prev.filter(m => !m.esPaso), { rol: 'sistema', contenido: 'No fue posible conectar. Intenta de nuevo.' }])
    } finally {
      setCargando(false)
    }
  }
`;

// Encontrar y reemplazar la funcion enviar
const inicio = c.indexOf('  async function enviar()');
const fin = c.indexOf('\n  if (!user)', inicio);

if (inicio === -1 || fin === -1) {
  console.log('No encontre la funcion enviar. inicio:', inicio, 'fin:', fin);
  process.exit(1);
}

c = c.slice(0, inicio) + enviarNueva + '\n' + c.slice(fin);

// Actualizar el renderizado de mensajes para mostrar pasos diferente
c = c.replace(
  '<div style={{ fontSize:\'15px\', lineHeight:\'1.75\', color:\'#2c2820\', whiteSpace:\'pre-wrap\' }}>{m.contenido}</div>',
  '<div style={{ fontSize: m.esPaso ? \'13px\' : \'15px\', lineHeight:\'1.75\', color: m.esPaso ? \'#9a9080\' : \'#2c2820\', whiteSpace:\'pre-wrap\', fontStyle: m.esPaso ? \'italic\' : \'normal\' }}>{m.contenido}</div>'
);

fs.writeFileSync('pages/chat.tsx', c);
console.log('Streaming aplicado correctamente');