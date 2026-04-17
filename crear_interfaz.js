const fs = require('fs');

// ── CHAT PAGE ─────────────────────────────────────────────
const chat = `import { useState, useRef, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const OCUPACIONES = [
  'Psicólogo / Terapeuta / Acompañante',
  'Abogado / Jurista',
  'Consultor / Auditor',
  'Investigador / Académico',
  'Gestor / Directivo organizacional',
  'Trabajador social / Educador',
  'Particular / Uso personal',
  'Otro'
]

const USOS = [
  'Análisis de un caso jurídico o penal',
  'Gestión de riesgos organizacionales',
  'Acompañamiento ontológico o clínico',
  'Investigación o análisis cultural',
  'Explorar el sistema por curiosidad',
  'Otro'
]

function saludo() {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function validarNombre(n) {
  const prohibidos = ['idiota','imbecil','pendejo','estupido','idiota','mierda','puta','puto','cabrón','cabron']
  const limpio = n.toLowerCase().trim()
  return limpio.length >= 2 && !prohibidos.some(p => limpio.includes(p))
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { window.location.href = '/login'; return }
      setUser(session.user)
      cargarPerfil(session.user.id)
    })
  }, [])

  async function cargarPerfil(uid) {
    const { data } = await supabase
      .from('analisis_usuarios')
      .select('*')
      .eq('id', uid)
      .single()
    if (data) {
      setPerfil(data)
      if (!data.onboarding_completado) {
        setModal(true)
      } else {
        iniciarChat(data.nombre_preferido)
        cargarSesiones(uid)
      }
    }
  }

  async function cargarSesiones(uid) {
    const { data } = await supabase
      .from('sesiones_analisis')
      .select('id, created_at, dominio_detectado, modo')
      .eq('usuario_id', uid)
      .order('created_at', { ascending: false })
      .limit(20)
    if (data) setSesiones(data)
  }

  function iniciarChat(nom) {
    setMensajes([{
      rol: 'sistema',
      contenido: nom
        ? 'Estoy listo para trabajar contigo. ¿Por dónde empezamos?'
        : 'Estoy listo para trabajar contigo. ¿Por dónde empezamos?'
    }])
  }

  async function guardarOnboarding() {
    if (!validarNombre(nombre)) {
      setErrorNombre('Por favor ingresa un nombre válido.')
      return
    }
    if (!ocupacion || !uso) return
    await supabase
      .from('analisis_usuarios')
      .update({ nombre_preferido: nombre.trim(), ocupacion, uso_principal: uso, onboarding_completado: true })
      .eq('id', user.id)
    setModal(false)
    setPerfil(p => ({ ...p, nombre_preferido: nombre.trim(), onboarding_completado: true }))
    iniciarChat(nombre.trim())
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
        body: JSON.stringify({
          messages: nuevos.map(m => ({
            role: m.rol === 'usuario' ? 'user' : 'assistant',
            content: m.contenido
          })),
          contexto: {
            nombre: perfil?.nombre_preferido,
            ocupacion: perfil?.ocupacion,
            uso: perfil?.uso_principal
          }
        })
      })
      const data = await res.json()
      setMensajes([...nuevos, { rol: 'sistema', contenido: data.respuesta }])
    } catch {
      setMensajes([...nuevos, { rol: 'sistema', contenido: 'Error al conectar. Intenta de nuevo.' }])
    } finally {
      setCargando(false)
    }
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  if (!user) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#f8f6f1', fontFamily:'Georgia, serif', color:'#1E4C45' }}>
      Cargando...
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', fontFamily:'Georgia, serif', background:'#f8f6f1', position:'relative' }}>

      {modal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(10,30,25,0.7)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
          <div style={{ background:'#fff', borderRadius:'16px', padding:'40px', maxWidth:'480px', width:'100%', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>

            <div style={{ textAlign:'center', marginBottom:'28px' }}>
              <div style={{ fontSize:'28px', marginBottom:'8px' }}>⊕</div>
              <div style={{ fontSize:'20px', fontWeight:'600', color:'#1E4C45', marginBottom:'6px' }}>Calculadora Prometeo</div>
              <div style={{ fontSize:'13px', color:'#9a9080', lineHeight:'1.6' }}>
                Análisis causal para casos jurídicos, gestión de riesgos organizacionales y acompañamiento ontológico. Basada en el Sistema de la Doble Mediación.
              </div>
            </div>

            {paso === 1 && (
              <div>
                <div style={{ fontSize:'14px', color:'#2c2820', marginBottom:'8px', fontWeight:'500' }}>
                  ¿Cómo te gusta que te llamen?
                </div>
                <input
                  value={nombre}
                  onChange={e => { setNombre(e.target.value); setErrorNombre('') }}
                  placeholder="Tu nombre o apodo"
                  style={{ width:'100%', padding:'12px', border:'1.5px solid rgba(30,76,69,0.2)', borderRadius:'8px', fontSize:'14px', fontFamily:'Georgia, serif', outline:'none', boxSizing:'border-box', color:'#2c2820' }}
                />
                {errorNombre && <div style={{ fontSize:'12px', color:'#c0392b', marginTop:'6px' }}>{errorNombre}</div>}
                <button
                  onClick={() => { if (validarNombre(nombre)) { setErrorNombre(''); setPaso(2) } else setErrorNombre('Por favor ingresa un nombre válido.') }}
                  style={{ marginTop:'16px', width:'100%', padding:'12px', background:'#1E4C45', color:'#D9D9D9', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontFamily:'Georgia, serif', letterSpacing:'0.05em' }}
                >
                  Continuar
                </button>
              </div>
            )}

            {paso === 2 && (
              <div>
                <div style={{ fontSize:'14px', color:'#2c2820', marginBottom:'12px', fontWeight:'500' }}>
                  ¿Cuál es tu ocupación?
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                  {OCUPACIONES.map(op => (
                    <button key={op} onClick={() => { setOcupacion(op); setPaso(3) }}
                      style={{ padding:'10px 14px', border:'1.5px solid rgba(30,76,69,0.2)', borderRadius:'8px', background: ocupacion === op ? '#1E4C45' : '#fff', color: ocupacion === op ? '#D9D9D9' : '#2c2820', cursor:'pointer', fontSize:'13px', fontFamily:'Georgia, serif', textAlign:'left', transition:'all 0.15s' }}>
                      {op}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {paso === 3 && (
              <div>
                <div style={{ fontSize:'14px', color:'#2c2820', marginBottom:'12px', fontWeight:'500' }}>
                  ¿Para qué usarás la herramienta principalmente?
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                  {USOS.map(u => (
                    <button key={u} onClick={() => setUso(u)}
                      style={{ padding:'10px 14px', border:'1.5px solid rgba(30,76,69,0.2)', borderRadius:'8px', background: uso === u ? '#1E4C45' : '#fff', color: uso === u ? '#D9D9D9' : '#2c2820', cursor:'pointer', fontSize:'13px', fontFamily:'Georgia, serif', textAlign:'left', transition:'all 0.15s' }}>
                      {u}
                    </button>
                  ))}
                </div>
                {uso && (
                  <button onClick={guardarOnboarding}
                    style={{ marginTop:'16px', width:'100%', padding:'12px', background:'#1E4C45', color:'#D9D9D9', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontFamily:'Georgia, serif', letterSpacing:'0.05em' }}>
                    Comenzar
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      <header style={{ background:'#1E4C45', color:'#D9D9D9', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:'64px', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'rgba(217,217,217,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>⊕</div>
          <div>
            <div style={{ fontSize:'14px', fontWeight:'600', color:'#D9D9D9', letterSpacing:'0.05em' }}>CALCULADORA PROMETEO</div>
            <div style={{ fontSize:'11px', color:'rgba(217,217,217,0.6)', letterSpacing:'0.08em' }}>CENTRO MULTIDISCIPLINARIO MERIADOCK</div>
          </div>
        </div>
        <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login' }}
          style={{ fontSize:'12px', color:'rgba(217,217,217,0.6)', background:'none', border:'none', cursor:'pointer', letterSpacing:'0.05em', fontFamily:'Georgia, serif' }}>
          SALIR
        </button>
      </header>

      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <div style={{ padding:'24px 32px 8px', borderBottom:'1px solid rgba(30,76,69,0.08)', background:'#f8f6f1', flexShrink:0 }}>
            <div style={{ fontSize:'22px', color:'#1E4C45', fontWeight:'600' }}>
              {saludo()}{perfil?.nombre_preferido ? ', ' + perfil.nombre_preferido : ''}.
            </div>
          </div>

          <div style={{ flex:1, overflowY:'auto', padding:'24px 32px', display:'flex', flexDirection:'column', gap:'20px' }}>
            {mensajes.map((m, i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: m.rol === 'usuario' ? 'flex-end' : 'flex-start' }}>
                {m.rol === 'sistema' && <div style={{ fontSize:'11px', color:'#9a9080', marginBottom:'6px', letterSpacing:'0.06em' }}>PROMETEO</div>}
                <div style={{ maxWidth:'72%', padding: m.rol === 'sistema' ? '16px 20px' : '12px 18px', borderRadius: m.rol === 'sistema' ? '2px 16px 16px 16px' : '16px 2px 16px 16px', background: m.rol === 'usuario' ? '#1E4C45' : '#ffffff', color: m.rol === 'usuario' ? '#D9D9D9' : '#2c2820', fontSize:'15px', lineHeight:'1.7', boxShadow: m.rol === 'sistema' ? '0 2px 12px rgba(0,0,0,0.06)' : '0 2px 8px rgba(30,76,69,0.2)', borderLeft: m.rol === 'sistema' ? '3px solid #1E4C45' : 'none' }}>
                  {m.contenido}
                </div>
              </div>
            ))}
            {cargando && (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
                <div style={{ fontSize:'11px', color:'#9a9080', marginBottom:'6px', letterSpacing:'0.06em' }}>PROMETEO</div>
                <div style={{ background:'#ffffff', padding:'16px 20px', borderRadius:'2px 16px 16px 16px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', borderLeft:'3px solid #1E4C45' }}>
                  <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
                    <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#1E4C45', opacity:0.4 }} />
                    <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#1E4C45', opacity:0.4 }} />
                    <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#1E4C45', opacity:0.4 }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={{ background:'#ffffff', borderTop:'1px solid rgba(30,76,69,0.12)', padding:'16px 32px', flexShrink:0 }}>
            <div style={{ display:'flex', gap:'12px', alignItems:'flex-end' }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() } }}
                placeholder="Escribe tu mensaje..."
                rows={1}
                style={{ flex:1, padding:'12px 16px', border:'1.5px solid rgba(30,76,69,0.2)', borderRadius:'8px', fontSize:'14px', fontFamily:'Georgia, serif', outline:'none', resize:'none', lineHeight:'1.6', color:'#2c2820', background:'#fafaf8' }}
              />
              <button onClick={enviar} disabled={cargando}
                style={{ padding:'12px 20px', background: cargando ? '#8aada9' : '#1E4C45', color:'#D9D9D9', border:'none', borderRadius:'8px', cursor: cargando ? 'not-allowed' : 'pointer', fontSize:'13px', letterSpacing:'0.08em', fontFamily:'Georgia, serif', flexShrink:0 }}>
                ENVIAR
              </button>
            </div>
          </div>
        </div>

        <div style={{ width:'240px', borderLeft:'1px solid rgba(30,76,69,0.12)', background:'#ffffff', display:'flex', flexDirection:'column', flexShrink:0 }}>
          <div style={{ padding:'16px', borderBottom:'1px solid rgba(30,76,69,0.08)' }}>
            <div style={{ fontSize:'11px', letterSpacing:'0.08em', color:'#9a9080', fontWeight:'500' }}>ANÁLISIS ANTERIORES</div>
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'8px' }}>
            {sesiones.length === 0 && (
              <div style={{ padding:'16px', fontSize:'12px', color:'#b0a898', textAlign:'center', lineHeight:'1.6' }}>
                Tus análisis aparecerán aquí
              </div>
            )}
            {sesiones.map(s => (
              <div key={s.id} style={{ padding:'10px 12px', borderRadius:'8px', marginBottom:'4px', cursor:'pointer', fontSize:'12px', color:'#2c2820', lineHeight:'1.5' }}
                onMouseEnter={e => e.currentTarget.style.background='#f8f6f1'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                <div style={{ fontWeight:'500', color:'#1E4C45', marginBottom:'2px' }}>
                  {s.dominio_detectado || 'Análisis ' + new Date(s.created_at).toLocaleDateString('es-MX', { day:'2-digit', month:'short' })}
                </div>
                <div style={{ fontSize:'11px', color:'#9a9080' }}>
                  {s.modo || 'general'} · {new Date(s.created_at).toLocaleDateString('es-MX', { day:'2-digit', month:'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <footer style={{ background:'#1E4C45', color:'rgba(217,217,217,0.4)', textAlign:'center', padding:'8px', fontSize:'11px', letterSpacing:'0.06em', flexShrink:0 }}>
        © {new Date().getFullYear()} CENTRO MULTIDISCIPLINARIO MERIADOCK FORMACIÓN Y ASESORÍA A.C.
      </footer>

    </div>
  )
}
`;

fs.writeFileSync('pages/chat.tsx', chat);
console.log('chat.tsx creado');
