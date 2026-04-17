const fs = require('fs');
let c = fs.readFileSync('pages/chat.tsx', 'utf8');

// Sacar InputArea del componente principal â€” causa el bug del foco
const inputAreaComponent = `
function InputArea({ input, setInput, enviar, cargando, archivosSeleccionados, quitarArchivo, fileRef, inputRef, seleccionarArchivos, grande }) {
  return (
    <div style={{ background:'#fff', border:'1.5px solid #d4cfc8', borderRadius:'14px', padding:'12px 16px', boxShadow: grande ? '0 4px 24px rgba(0,0,0,0.06)' : '0 2px 12px rgba(0,0,0,0.04)' }}>
      {archivosSeleccionados.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'10px' }}>
          {archivosSeleccionados.map((f, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'5px', background:'#f0ede8', border:'1px solid #d4cfc8', borderRadius:'6px', padding:'4px 8px', fontSize:'12px', color:'#5a5248' }}>
              <span>í³„</span>
              <span style={{ maxWidth:'120px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.name}</span>
              <button onClick={() => quitarArchivo(i)} style={{ background:'none', border:'none', cursor:'pointer', color:'#9a9080', fontSize:'14px', padding:'0 2px', lineHeight:1 }}>Ã—</button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display:'flex', alignItems:'flex-end', gap:'8px' }}>
        <button onClick={() => fileRef.current?.click()} style={{ padding:'6px', background:'none', border:'none', cursor:'pointer', color:'#9a9080', fontSize:'20px', lineHeight:1, flexShrink:0, borderRadius:'6px' }} title="Adjuntar documento" onMouseEnter={e => e.currentTarget.style.color='#1E4C45'} onMouseLeave={e => e.currentTarget.style.color='#9a9080'}>+</button>
        <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() } }} placeholder={archivosSeleccionados.length > 0 ? 'Agrega un comentario o envÃ­a directo...' : 'Escribe tu mensaje...'} rows={1} style={{ flex:1, border:'none', outline:'none', fontSize:'15px', fontFamily:'Georgia,serif', resize:'none', color:'#2c2820', background:'transparent', lineHeight:'1.6' }} />
        <button onClick={enviar} disabled={cargando} style={{ padding:'8px 18px', background: cargando ? '#8aada9' : '#1E4C45', color:'#D9D9D9', border:'none', borderRadius:'8px', cursor: cargando ? 'not-allowed' : 'pointer', fontSize:'13px', fontFamily:'Georgia,serif', flexShrink:0, letterSpacing:'0.04em' }}>Enviar</button>
      </div>
      <input ref={fileRef} type="file" multiple accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.webp" onChange={seleccionarArchivos} style={{ display:'none' }} />
    </div>
  )
}
`;

// Insertar InputArea antes del export default
c = c.replace("export default function Chat()", inputAreaComponent + "\nexport default function Chat()");

// Reemplazar las llamadas a InputArea para pasar props
c = c.replace(
  /<InputArea grande={true} \/>/g,
  '<InputArea grande={true} input={input} setInput={setInput} enviar={enviar} cargando={cargando} archivosSeleccionados={archivosSeleccionados} quitarArchivo={quitarArchivo} fileRef={fileRef} inputRef={inputRef} seleccionarArchivos={seleccionarArchivos} />'
);
c = c.replace(
  /<InputArea grande={false} \/>/g,
  '<InputArea grande={false} input={input} setInput={setInput} enviar={enviar} cargando={cargando} archivosSeleccionados={archivosSeleccionados} quitarArchivo={quitarArchivo} fileRef={fileRef} inputRef={inputRef} seleccionarArchivos={seleccionarArchivos} />'
);

// Eliminar la definicion interna de InputArea
c = c.replace(/\s*function InputArea\(\{ grande \}\)[\s\S]*?^\s*\}/m, '');

fs.writeFileSync('pages/chat.tsx', c);
console.log('Fix aplicado');
