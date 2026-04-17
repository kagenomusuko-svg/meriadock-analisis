const fs = require('fs');
let c = fs.readFileSync('pages/chat.tsx', 'utf8');

const inputJSX = [
  '<div style={{ background:"#fff", border:"1.5px solid #d4cfc8", borderRadius:"14px", padding:"12px 16px" }}>',
  '  {archivosSeleccionados.length > 0 && (',
  '    <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"10px" }}>',
  '      {archivosSeleccionados.map((f, i) => (',
  '        <div key={i} style={{ display:"flex", alignItems:"center", gap:"5px", background:"#f0ede8", borderRadius:"6px", padding:"4px 8px", fontSize:"12px", color:"#5a5248" }}>',
  '          <span style={{ maxWidth:"120px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</span>',
  '          <button onClick={() => quitarArchivo(i)} style={{ background:"none", border:"none", cursor:"pointer", color:"#9a9080", fontSize:"14px", padding:"0 2px" }}>x</button>',
  '        </div>',
  '      ))}',
  '    </div>',
  '  )}',
  '  <div style={{ display:"flex", alignItems:"flex-end", gap:"8px" }}>',
  '    <button onClick={() => fileRef.current && fileRef.current.click()} style={{ padding:"6px", background:"none", border:"none", cursor:"pointer", color:"#9a9080", fontSize:"20px", lineHeight:1, flexShrink:0 }}>+</button>',
  '    <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar() } }} placeholder="Escribe tu mensaje..." rows={1} style={{ flex:1, border:"none", outline:"none", fontSize:"15px", fontFamily:"Georgia,serif", resize:"none", color:"#2c2820", background:"transparent", lineHeight:"1.6" }} />',
  '    <button onClick={enviar} disabled={cargando} style={{ padding:"8px 18px", background: cargando ? "#8aada9" : "#1E4C45", color:"#D9D9D9", border:"none", borderRadius:"8px", cursor: cargando ? "not-allowed" : "pointer", fontSize:"13px", fontFamily:"Georgia,serif", flexShrink:0 }}>Enviar</button>',
  '  </div>',
  '  <input ref={fileRef} type="file" multiple accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.webp" onChange={seleccionarArchivos} style={{ display:"none" }} />',
  '</div>'
].join('\n');

let count = 0;
c = c.replace(/<InputArea[^/]*\/>/g, () => { count++; return inputJSX; });
console.log('Reemplazos:', count);
fs.writeFileSync('pages/chat.tsx', c);
console.log('Listo');