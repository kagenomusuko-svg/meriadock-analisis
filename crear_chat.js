const fs = require('fs');

const chatPage = `
import { useState, useRef, useEffect } from 'react'

interface Mensaje {
  rol: 'usuario' | 'sistema'
  contenido: string
}

export default function Chat() {
  const [mensajes, setMensajes] = useState([
    { rol: 'sistema', contenido: 'Bienvenido a la Calculadora Prometeo. Soy tu instrumento de analisis causal. Para comenzar, me gustaria conocerte un poco. Como te llamas?' }
  ])
  const [input, setInput] = useState('')
  const [cargando, setCargando] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  const enviar = async () => {
    if (!input.trim() || cargando) return
    const texto = input.trim()
    setInput('')
    const nuevos = [...mensajes, { rol: 'usuario', contenido: texto }]
    setMensajes(nuevos)
    setCargando(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nuevos.map(m => ({
            role: m.rol === 'usuario' ? 'user' : 'assistant',
            content: m.contenido
          }))
        })
      })
      const data = await res.json()
      setMensajes([...nuevos, { rol: 'sistema', contenido: data.respuesta }])
    } catch {
      setMensajes([...nuevos, { rol: 'sistema', contenido: 'Error al conectar. Intenta de nuevo.' }])
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', fontFamily:'Georgia, serif', background:'#f8f6f1' }}>

      {/* HEADER */}
      <header style={{ background:'#1E4C45', color:'#D9D9D9', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'64px', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'rgba(217,217,217,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>
            ⊕
          </div>
          <div>
            <div style={{ fontSize:'14px', fontWeight:'600', color:'#D9D9D9', letterSpacing:'0.05em' }}>CALCULADORA PROMETEO</div>
            <div style={{ fontSize:'11px', color:'rgba(217,217,217,0.6)', letterSpacing:'0.08em' }}>CENTRO MULTIDISCIPLINARIO MERIADOCK</div>
          </div>
        </div>
        <a href="/" style={{ fontSize:'12px', color:'rgba(217,217,217,0.6)', textDecoration:'none', letterSpacing:'0.05em' }}>
          SALIR
        </a>
      </header>

      {/* CHAT AREA */}
      <div style={{ flex:1, overflowY:'auto', padding:'32px 24px', display:'flex', flexDirection:'column', gap:'20px', maxWidth:'780px', width:'100%', margin:'0 auto', boxSizing:'border-box' }}>

        {mensajes.map((m, i) => (
          <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: m.rol === 'usuario' ? 'flex-end' : 'flex-start' }}>

            {m.rol === 'sistema' && (
              <div style={{ fontSize:'11px', color:'#9a9080', marginBottom:'6px', letterSpacing:'0.06em' }}>
                PROMETEO
              </div>
            )}

            <div style={{
              maxWidth:'72%',
              padding: m.rol === 'sistema' ? '16px 20px' : '12px 18px',
              borderRadius: m.rol === 'sistema' ? '2px 16px 16px 16px' : '16px 2px 16px 16px',
              background: m.rol === 'usuario' ? '#1E4C45' : '#ffffff',
              color: m.rol === 'usuario' ? '#D9D9D9' : '#2c2820',
              fontSize:'15px',
              lineHeight:'1.7',
              boxShadow: m.rol === 'sistema' ? '0 2px 12px rgba(0,0,0,0.06)' : '0 2px 8px rgba(30,76,69,0.2)',
              borderLeft: m.rol === 'sistema' ? '3px solid #1E4C45' : 'none'
            }}>
              {m.contenido}
            </div>

          </div>
        ))}

        {cargando && (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
            <div style={{ fontSize:'11px', color:'#9a9080', marginBottom:'6px', letterSpacing:'0.06em' }}>PROMETEO</div>
            <div style={{ background:'#ffffff', padding:'16px 20px', borderRadius:'2px 16px 16px 16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', borderLeft:'3px solid #1E4C45' }}>
              <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
                <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#1E4C45', opacity:0.4, animation:'pulse 1.4s ease-in-out infinite' }} />
                <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#1E4C45', opacity:0.4, animation:'pulse 1.4s ease-in-out 0.2s infinite' }} />
                <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#1E4C45', opacity:0.4, animation:'pulse 1.4s ease-in-out 0.4s infinite' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div style={{ background:'#ffffff', borderTop:'1px solid rgba(30,76,69,0.12)', padding:'16px 24px', flexShrink:0 }}>
        <div style={{ maxWidth:'780px', margin:'0 auto', display:'flex', gap:'12px', alignItems:'flex-end' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(); } }}
            placeholder="Escribe tu mensaje... (Enter para enviar, Shift+Enter para nueva línea)"
            rows={1}
            style={{ flex:1, padding:'12px 16px', border:'1.5px solid rgba(30,76,69,0.2)', borderRadius:'8px', fontSize:'14px', fontFamily:'Georgia, serif', outline:'none', resize:'none', lineHeight:'1.6', color:'#2c2820', background:'#fafaf8' }}
          />
          <button
            onClick={enviar}
            disabled={cargando}
            style={{ padding:'12px 20px', background: cargando ? '#8aada9' : '#1E4C45', color:'#D9D9D9', border:'none', borderRadius:'8px', cursor: cargando ? 'not-allowed' : 'pointer', fontSize:'13px', letterSpacing:'0.08em', fontFamily:'Georgia, serif', transition:'background 0.2s', flexShrink:0 }}
          >
            ENVIAR
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background:'#1E4C45', color:'rgba(217,217,217,0.5)', textAlign:'center', padding:'10px', fontSize:'11px', letterSpacing:'0.06em', flexShrink:0 }}>
        © {new Date().getFullYear()} CENTRO MULTIDISCIPLINARIO MERIADOCK FORMACIÓN Y ASESORÍA A.C.
      </footer>

      <style>{\`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        textarea:focus {
          border-color: #1E4C45;
          box-shadow: 0 0 0 3px rgba(30,76,69,0.1);
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f8f6f1; }
        ::-webkit-scrollbar-thumb { background: rgba(30,76,69,0.2); border-radius: 3px; }
      \`}</style>

    </div>
  )
}
`;

fs.writeFileSync('pages/chat.tsx', chatPage);
console.log('chat.tsx creado correctamente');
