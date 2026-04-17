const fs = require('fs');
const c = `import { useState, useRef, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const OCUPACIONES = ['Psicólogo / Terapeuta / Acompañante','Abogado / Jurista','Consultor / Auditor','Investigador / Académico','Gestor / Directivo organizacional','Trabajador social / Educador','Particular / Uso personal','Otro']
const USOS = ['Análisis de un caso jurídico o penal','Gestión de riesgos organizacionales','Acompañamiento ontológico o clínico','Investigación o análisis cultural','Explorar el sistema por curiosidad','Otro']

function saludo() {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function validarNombre(n) {
  const p = ['idiota','imbecil','pendejo','estupido','mierda','puta','puto','cabron']
  const l = n.toLowerCase().trim()
  return l.length >= 2 && !p.some(x => l.includes(x))
}

export default function Chat() {
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [modal, setModal] = useState(false)
  const [paso, setPaso] = useState(1)
  const [nombre, setNombre] = useState('')
  const [ocupacion, setOcupacion] = useState('')
  const [uso, setUso] = useState('')
  const [errorNombre, setErrorNombre] = useState('')
  const [mensajes, setMensajes] = useState([])
  const [input, setInput] = useState('')
  const [cargando, setCargando] = useState(false)
  const [sesiones, setSesiones] = useState([])
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { window.location.href = '/login'; return }
      setUser(session.user)
      cargarPerfil(session.user.id)
    })
  }, [])

  async function cargarPerfil(uid) {
    const { data } = await supabase.from('analisis_usuarios').select('*').eq('id', uid).single()
    if (data) {
      setPerfil(data)
      if (!data.onboarding_completado) { setModal(true) } 
      else { cargarSesiones(uid) }
    }
  }

  async function cargarSesiones(uid) {
    const { data } = await supabase.from('sesiones_analisis').select('id, created_at, dominio_detectado, modo').eq('usuario_id', uid).order('created_at', { ascending: false }).limit(20)
    if (data) setSesiones(data)
  }

  async function guardarOnboarding() {
    if (!validarNombre(nombre)) { setErrorNombre('Por favor ingresa un nombre válido.'); return }
    if (!ocupacion || !uso) return
    await supabase.from('analisis_usuarios').update({ nombre_preferido: nombre.trim(), ocupacion, uso_principal: uso, onboarding_completado: true }).eq('id', user.id)
    setModal(false)
    setPerfil(p => ({ ...p, nombre_preferido: nombre.trim(), onboarding_completado: true }))
    cargarSesiones(user.id)
  }

  async function enviar() {
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
        body: JSON.stringify({ messages: nuevos.map(m => ({ role: m.rol === 'usuario' ? 'user' : 'assistant', content: m.contenido })), contexto: { nombre: perfil?.nombre_preferido, ocupacion: perfil?.ocupacion, uso: perfil?.uso_principal } })
      })
      const data = await res.json()
      setMensajes([...nuevos, { rol: 'sistema', contenido: data.respuesta }])
    } catch { setMensajes([...nuevos, { rol: 'sistema', contenido: 'Error al conectar. Intenta de nuevo.' }]) }
    finally { setCargando(false) }
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  if (!user) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#faf9f7', fontFamily:'Georgia,serif', color:'#1E4C45' }}>Cargando...</div>

  return (
    <div style={{ display:'flex', height:'100vh', fontFamily:'Georgia,serif', background:'#faf9f7' }}>

      {modal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(10,28,22,0.65)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', backdropFilter:'blur(4px)' }}>
          <div style={{ background:'#fff', borderRadius:'20px', padding:'44px 40px', maxWidth:'460px', width:'100%', boxShadow:'0 24px 80px rgba(0,0,0,0.25)' }}>
            <div style={{ textAlign:'center', marginBottom:'32px' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:'#1E4C45', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:'22px', color:'#D9D9D9' }}>⊕</div>
              <div style={{ fontSize:'22px', fontWeight:'600', color:'#1E4C45', marginBottom:'8px' }}>Calculadora Prometeo</div>
              <div style={{ fontSize:'13px', color:'#8a8070', lineHeight:'1.7' }}>Análisis causal para casos jurídicos, gestión de riesgos organizacionales y acompañamiento ontológico.</div>
            </div>

            {paso === 1 && <div>
              <div style={{ fontSize:'15px', color:'#2c2820', marginBottom:'10px', fontWeight:'500' }}>¿Cómo te gusta que te llamen?</div>
              <input value={nombre} onChange={e => { setNombre(e.target.value); setErrorNombre('') }} onKeyDown={e => e.key === 'Enter' && (validarNombre(nombre) ? setPaso(2) : setErrorNombre('Por favor ingresa un nombre válido.'))} placeholder="Tu nombre o apodo" autoFocus style={{ width:'100%', padding:'13px 16px', border:'1.5px solid #d4cfc8', borderRadius:'10px', fontSize:'15px', fontFamily:'Georgia,serif', outline:'none', boxSizing:'border-box', color:'#2c2820', background:'#faf9f7' }} />
              {errorNombre && <div style={{ fontSize:'12px', color:'#c0392b', marginTop:'6px' }}>{errorNombre}</div>}
              <button onClick={() => { validarNombre(nombre) ? setPaso(2) : setErrorNombre('Por favor ingresa un nombre válido.') }} style={{ marginTop:'16px', width:'100%', padding:'13px', background:'#1E4C45', color:'#D9D9D9', border:'none', borderRadius:'10px', cursor:'pointer', fontSize:'14px', fontFamily:'Georgia,serif', letterSpacing:'0.04em' }}>Continuar →</button>
            </div>}

            {paso === 2 && <div>
              <div style={{ fontSize:'15px', color:'#2c2820', marginBottom:'12px', fontWeight:'500' }}>¿Cuál es tu ocupación?</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'7px' }}>
                {OCUPACIONES.map(op => <button key={op} onClick={() => { setOcupacion(op); setPaso(3) }} style={{ padding:'11px 14px', border:'1.5px solid #d4cfc8', borderRadius:'10px', background:'#faf9f7', color:'#2c2820', cursor:'pointer', fontSize:'13px', fontFamily:'Georgia,serif', textAlign:'left', transition:'all 0.15s' }} onMouseEnter={e => { e.currentTarget.style.background='#1E4C45'; e.currentTarget.style.color='#D9D9D9'; e.currentTarget.style.borderColor='#1E4C45' }} onMouseLeave={e => { e.currentTarget.style.background='#faf9f7'; e.currentTarget.style.color='#2c2820'; e.currentTarget.style.borderColor='#d4cfc8' }}>{op}</button>)}
              </div>
            </div>}

            {paso === 3 && <div>
              <div style={{ fontSize:'15px', color:'#2c2820', marginBottom:'12px', fontWeight:'500' }}>¿Para qué usarás la herramienta principalmente?</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'7px' }}>
                {USOS.map(u => <button key={u} onClick={() => setUso(u)} style={{ padding:'11px 14px', border: uso === u ? '1.5px solid #1E4C45' : '1.5px solid #d4cfc8', borderRadius:'10px', background: uso === u ? '#1E4C45' : '#faf9f7', color: uso === u ? '#D9D9D9' : '#2c2820', cursor:'pointer', fontSize:'13px', fontFamily:'Georgia,serif', textAlign:'left', transition:'all 0.15s' }}>{u}</button>)}
              </div>
              {uso && <button onClick={guardarOnboarding} style={{ marginTop:'16px', width:'100%', padding:'13px', background:'#1E4C45', color:'#D9D9D9', border:'none', borderRadius:'10px', cursor:'pointer', fontSize:'14px', fontFamily:'Georgia,serif', letterSpacing:'0.04em' }}>Comenzar</button>}
            </div>}
          </div>
        </div>
      )}

      {/* SIDEBAR IZQUIERDO */}
      <div style={{ width:'260px', background:'#1E4C45', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'20px 16px 16px', borderBottom:'1px solid rgba(217,217,217,0.1)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px' }}>
            <div style={{ width:'30px', height:'30px', borderRadius:'50%', background:'rgba(217,217,217,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px', color:'#D9D9D9', flexShrink:0 }}>⊕</div>
            <div>
              <div style={{ fontSize:'13px', fontWeight:'600', color:'#D9D9D9', letterSpacing:'0.04em' }}>PROMETEO</div>
              <div style={{ fontSize:'10px', color:'rgba(217,217,217,0.5)', letterSpacing:'0.06em' }}>MERIADOCK</div>
            </div>
          </div>
        </div>

        <button onClick={() => setMensajes([])} style={{ margin:'12px', padding:'10px', background:'rgba(217,217,217,0.1)', border:'1px solid rgba(217,217,217,0.15)', borderRadius:'8px', color:'#D9D9D9', cursor:'pointer', fontSize:'13px', fontFamily:'Georgia,serif', display:'flex', alignItems:'center', gap:'8px' }}>
          <span style={{ fontSize:'16px' }}>+</span> Nuevo análisis
        </button>

        <div style={{ padding:'8px 12px', fontSize:'10px', color:'rgba(217,217,217,0.4)', letterSpacing:'0.08em', marginTop:'4px' }}>ANÁLISIS RECIENTES</div>

        <div style={{ flex:1, overflowY:'auto', padding:'4px 8px' }}>
          {sesiones.length === 0
            ? <div style={{ padding:'16px 8px', fontSize:'12px', color:'rgba(217,217,217,0.3)', lineHeight:'1.6' }}>Tus análisis aparecerán aquí</div>
            : sesiones.map(s => <div key={s.id} style={{ padding:'9px 10px', borderRadius:'7px', marginBottom:'2px', cursor:'pointer', color:'rgba(217,217,217,0.75)', fontSize:'12px', lineHeight:'1.5', transition:'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(217,217,217,0.1)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                <div style={{ fontWeight:'500', marginBottom:'2px', color:'rgba(217,217,217,0.9)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.dominio_detectado || 'Análisis sin título'}</div>
                <div style={{ fontSize:'11px', color:'rgba(217,217,217,0.4)' }}>{new Date(s.created_at).toLocaleDateString('es-MX', { day:'2-digit', month:'short', year:'numeric' })}</div>
              </div>)
          }
        </div>

        <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(217,217,217,0.1)' }}>
          <div style={{ fontSize:'12px', color:'rgba(217,217,217,0.5)', marginBottom:'8px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.email}</div>
          <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login' }} style={{ fontSize:'12px', color:'rgba(217,217,217,0.4)', background:'none', border:'none', cursor:'pointer', fontFamily:'Georgia,serif', padding:0, letterSpacing:'0.04em' }}>Cerrar sesión</button>
        </div>
      </div>

      {/* ÁREA PRINCIPAL */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {mensajes.length === 0
          ? <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
              <div style={{ textAlign:'center', marginBottom:'48px' }}>
                <div style={{ fontSize:'38px', fontWeight:'600', color:'#1E4C45', marginBottom:'8px' }}>
                  {saludo()}{perfil?.nombre_preferido ? ', ' + perfil.nombre_preferido : ''}.
                </div>
                <div style={{ fontSize:'16px', color:'#9a9080' }}>¿En qué puedo ayudarte hoy?</div>
              </div>
              <div style={{ width:'100%', maxWidth:'680px' }}>
                <div style={{ display:'flex', alignItems:'flex-end', gap:'12px', background:'#fff', border:'1.5px solid #d4cfc8', borderRadius:'14px', padding:'14px 16px', boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
                  <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() } }} placeholder="Escribe tu mensaje... (Enter para enviar)" rows={1} style={{ flex:1, border:'none', outline:'none', fontSize:'15px', fontFamily:'Georgia,serif', resize:'none', color:'#2c2820', background:'transparent', lineHeight:'1.6' }} />
                  <button onClick={enviar} disabled={cargando} style={{ padding:'8px 18px', background: cargando ? '#8aada9' : '#1E4C45', color:'#D9D9D9', border:'none', borderRadius:'8px', cursor: cargando ? 'not-allowed' : 'pointer', fontSize:'13px', fontFamily:'Georgia,serif', flexShrink:0, letterSpacing:'0.04em' }}>Enviar</button>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'16px' }}>
                  {['Analizar un caso jurídico','Gestión de riesgos','Acompañamiento ontológico','Explorar el sistema'].map(s => <button key={s} onClick={() => { setInput(s); inputRef.current?.focus() }} style={{ padding:'12px 16px', background:'#fff', border:'1.5px solid #d4cfc8', borderRadius:'10px', cursor:'pointer', fontSize:'13px', fontFamily:'Georgia,serif', color:'#5a5248', textAlign:'left', transition:'all 0.15s' }} onMouseEnter={e => { e.currentTarget.style.borderColor='#1E4C45'; e.currentTarget.style.color='#1E4C45' }} onMouseLeave={e => { e.currentTarget.style.borderColor='#d4cfc8'; e.currentTarget.style.color='#5a5248' }}>{s}</button>)}
                </div>
              </div>
            </div>

          : <>
              <div style={{ flex:1, overflowY:'auto', padding:'32px 24px', display:'flex', flexDirection:'column', gap:'24px', maxWidth:'760px', width:'100%', margin:'0 auto', boxSizing:'border-box' }}>
                {mensajes.map((m, i) => (
                  <div key={i} style={{ display:'flex', gap:'12px', flexDirection: m.rol === 'usuario' ? 'row-reverse' : 'row', alignItems:'flex-start' }}>
                    <div style={{ width:'32px', height:'32px', borderRadius:'50%', background: m.rol === 'usuario' ? '#e8e3db' : '#1E4C45', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', color: m.rol === 'usuario' ? '#5a5248' : '#D9D9D9', flexShrink:0, fontWeight:'600' }}>
                      {m.rol === 'usuario' ? (perfil?.nombre_preferido?.[0]?.toUpperCase() || 'U') : '⊕'}
                    </div>
                    <div style={{ maxWidth:'78%' }}>
                      <div style={{ fontSize:'11px', color:'#9a9080', marginBottom:'5px', letterSpacing:'0.05em' }}>
                        {m.rol === 'usuario' ? (perfil?.nombre_preferido || 'Tú') : 'Prometeo'}
                      </div>
                      <div style={{ fontSize:'15px', lineHeight:'1.75', color:'#2c2820', whiteSpace:'pre-wrap' }}>{m.contenido}</div>
                    </div>
                  </div>
                ))}
                {cargando && (
                  <div style={{ display:'flex', gap:'12px', alignItems:'flex-start' }}>
                    <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'#1E4C45', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', color:'#D9D9D9', flexShrink:0 }}>⊕</div>
                    <div style={{ paddingTop:'8px', display:'flex', gap:'5px' }}>
                      {[0,1,2].map(i => <span key={i} style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#1E4C45', opacity:0.35, display:'inline-block', animation:\`bounce 1.2s ease-in-out \${i*0.2}s infinite\` }} />)}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div style={{ borderTop:'1px solid #e8e3db', padding:'16px 24px', background:'#faf9f7' }}>
                <div style={{ maxWidth:'760px', margin:'0 auto', display:'flex', alignItems:'flex-end', gap:'12px', background:'#fff', border:'1.5px solid #d4cfc8', borderRadius:'14px', padding:'14px 16px', boxShadow:'0 2px 12px rgba(0,0,0,0.04)' }}>
                  <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() } }} placeholder="Escribe tu mensaje..." rows={1} style={{ flex:1, border:'none', outline:'none', fontSize:'15px', fontFamily:'Georgia,serif', resize:'none', color:'#2c2820', background:'transparent', lineHeight:'1.6' }} />
                  <button onClick={enviar} disabled={cargando} style={{ padding:'8px 18px', background: cargando ? '#8aada9' : '#1E4C45', color:'#D9D9D9', border:'none', borderRadius:'8px', cursor: cargando ? 'not-allowed' : 'pointer', fontSize:'13px', fontFamily:'Georgia,serif', flexShrink:0, letterSpacing:'0.04em' }}>Enviar</button>
                </div>
              </div>
            </>
        }
      </div>

      <style>{\`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0);opacity:.35} 40%{transform:translateY(-6px);opacity:1} }
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(30,76,69,0.15);border-radius:3px}
      \`}</style>
    </div>
  )
}`;

fs.writeFileSync('pages/chat.tsx', c);
console.log('OK');
