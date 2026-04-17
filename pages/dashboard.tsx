import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (!user) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <p style={{ fontFamily:'sans-serif' }}>Cargando...</p>
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh', gap:'20px' }}>
      <h1 style={{ fontFamily:'sans-serif' }}>Calculadora Prometeo</h1>
      <p style={{ fontFamily:'sans-serif', color:'#666' }}>Bienvenido, {user.email}</p>
      <button
        onClick={handleLogout}
        style={{ padding:'12px 24px', background:'#1E4C45', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontFamily:'sans-serif' }}
      >
        Cerrar sesión
      </button>
    </div>
  )
}
