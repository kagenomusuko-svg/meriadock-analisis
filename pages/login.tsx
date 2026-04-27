import { supabase } from '../utils/supabaseClient'

export default function Login() {
  const handleGoogle = async () => {
    const isProd = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    const base   = isProd ? window.location.origin : 'http://localhost:3000'
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: base + '/constructor' }
    })
    if (error) console.error(error)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#faf9f7',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Georgia, serif',
      padding: '20px',
    }}>

      {/* Tarjeta central */}
      <div style={{
        background: '#fff',
        border: '1.5px solid #d4cfc8',
        borderRadius: '20px',
        padding: '52px 48px',
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
      }}>

        {/* Logo */}
        <img
          src="/logo.svg"
          alt="Meriadock"
          style={{
            height: '72px',
            width: '72px',
            objectFit: 'contain',
            marginBottom: '20px',
            display: 'block',
            margin: '0 auto 20px',
          }}
        />

        {/* Nombre */}
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#9a9080',
          marginBottom: '6px',
        }}>
          Centro Multidisciplinario Meriadock Formación y Asesoría A.C.
        </div>

        {/* Título */}
        <div style={{
          fontSize: '22px',
          fontWeight: '600',
          color: '#1E4C45',
          marginBottom: '8px',
        }}>
          Calculadora Prometeo
        </div>

        {/* Subtítulo */}
        <div style={{
          fontSize: '14px',
          color: '#9a9080',
          lineHeight: '1.7',
          marginBottom: '40px',
        }}>
          Análisis causal
        </div>

        {/* Divisor */}
        <div style={{
          height: '1px',
          background: '#e8e3db',
          marginBottom: '32px',
        }} />

        {/* Botón Google */}
        <button
          onClick={handleGoogle}
          style={{
            width: '100%',
            padding: '14px 20px',
            background: '#fff',
            border: '1.5px solid #d4cfc8',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            fontSize: '14px',
            color: '#2c2820',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#1E4C45'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30,76,69,0.08)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#d4cfc8'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* Ícono Google SVG */}
          <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          </svg>
          Entrar con Google
        </button>

        {/* Nota de acceso */}
        <div style={{
          fontSize: '11px',
          color: '#b8b0a8',
          marginTop: '20px',
          lineHeight: '1.6',
        }}>
          Acceso restringido a usuarios autorizados
        </div>
      </div>

      {/* Pie */}
      <div style={{
        marginTop: '32px',
        fontSize: '11px',
        color: '#c4bdb5',
        textAlign: 'center',
        lineHeight: '1.7',
      }}>
        Centro Multidisciplinario Meriadock Formación y Asesoría A.C.<br />
        CLUNI CMM25080811X9X
      </div>
    </div>
  )
}