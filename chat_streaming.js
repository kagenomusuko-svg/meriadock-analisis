const fs = require('fs');

const patch = `
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

    // Mensaje de paso inicial
    setMensajes(prev => [...prev, { rol: 'sistema', contenido: '...', esPaso: true }])

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

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\\n').filter(l => l.startsWith('data: '))

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6))
            if (data.tipo === 'paso') {
              setMensajes(prev => {
                const sinPaso = prev.filter(m => !m.esPaso)
                return [...sinPaso, { rol: 'sistema', contenido: data.contenido, esPaso: true }]
              })
            } else if (data.tipo === 'final') {
              setMensajes(prev => {
                const sinPaso = prev.filter(m => !m.esPaso)
                return [...sinPaso, { rol: 'sistema', contenido: data.contenido }]
              })
            } else if (data.tipo === 'error') {
              setMensajes(prev => {
                const sinPaso = prev.filter(m => !m.esPaso)
                return [...sinPaso, { rol: 'sistema', contenido: data.contenido }]
              })
            }
          } catch {}
        }
      }
    } catch {
      setMensajes(prev => {
        const sinPaso = prev.filter(m => !m.esPaso)
        return [...sinPaso, { rol: 'sistema', contenido: 'No fue posible conectar. Intenta de nuevo.' }]
      })
    } finally {
      setCargando(false)
    }
  }
`;

console.log('Patch de streaming listo');
console.log('Longitud:', patch.length);