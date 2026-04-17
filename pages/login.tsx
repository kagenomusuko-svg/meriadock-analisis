import { supabase } from '../utils/supabaseClient'

export default function Login() {
  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/dashboard'
      }
    })
    if (error) console.error(error)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh', gap:'20px' }}>
      <h1 style={{ fontFamily:'sans-serif' }}>Calculadora Prometeo</h1>
      <p style={{ fontFamily:'sans-serif', color:'#666' }}>Centro Multidisciplinario Meriadock</p>
      <button
        onClick={handleGoogle}
        style={{ padding:'12px 24px', background:'#1E4C45', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontFamily:'sans-serif', fontSize:'16px' }}
      >
        Entrar con Google
      </button>
    </div>
  )
}
