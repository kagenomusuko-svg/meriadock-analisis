import { orientarHijo, intervaloRutaA, combinarRangos } from '../../taxonomia/universal';
// Campos y escalas proceden del protocolo efectivo; ningún resultado modifica S.
export default function OrientacionTaxonomica({protocolo,nodo,actualizar}){
 const universales=protocolo.universales;if(!universales)return null;
 const reglas=universales.flatMap(p=>p.reglas),arbol=reglas.find(r=>r.id==='u1.arbol'),sa=reglas.filter(r=>r.id.startsWith('u3.sa.')),ds=reglas.filter(r=>/^u3.ds\d/.test(r.id));
 const datos=nodo.orientacionTaxonomica||{},editar=patch=>actualizar({orientacionTaxonomica:{...datos,...patch},confirmadoS:false});
 const orientacion=orientarHijo(datos.respuestas||{}),contrato={confirmado:datos.confirmadoP===true,presencia:datos.presencia===true,noDisponible:datos.noDisponible===true,justificaciones:datos.justificaciones||{}};
 const pa=intervaloRutaA(datos.pHijos,contrato),rb=ds.find(r=>r.id===datos.dsId),coherencia=pa.rango&&rb?combinarRangos([pa.rango,rb.valor]):null;
 return <details><summary>Orientación taxonómica — Hijos, rutas A/B y límites</summary>
 <p>La orientación y los intervalos sugeridos no asignan S. Confirma por separado el valor efectivo y su justificación.</p>
 {Object.entries(arbol.valor).map(([id,c])=><label key={id} style={{display:'block',margin:'12px 0'}}>{c.texto}<select aria-label={nodo.nombre+': '+c.texto} value={datos.respuestas?.[id]||''} onChange={e=>editar({respuestas:{...datos.respuestas,[id]:e.target.value}})}><option value="">Sin discriminar</option>{c.opciones.map(o=><option key={o.id} value={o.id}>{o.texto}</option>)}</select></label>)}
 <p role="status">Orientación: {orientacion.estado} {orientacion.hijo||''}. {orientacion.motivo}</p>
 <p><label><input type="checkbox" checked={datos.presencia===true} onChange={e=>editar({presencia:e.target.checked})}/>Presencia y observación ECO declaradas — {nodo.nombre}</label></p>
 <p><label><input type="checkbox" checked={datos.noDisponible===true} onChange={e=>editar({noDisponible:e.target.checked})}/>Actor no disponible — {nodo.nombre}</label></p>
 {sa.map(r=>{const h=r.id.split('.').at(-1);return <div key={h}><label>P({h}) — {nodo.nombre}<input aria-label={'P('+h+') — '+nodo.nombre} type="number" min="0" max="1" step="any" value={datos.pHijos?.[h]??''} onChange={e=>editar({pHijos:{...datos.pHijos,[h]:e.target.value===''?null:Number(e.target.value)}})}/></label><label>Justificación {h} — {nodo.nombre}<input aria-label={'Justificación '+h+' — '+nodo.nombre} value={datos.justificaciones?.[h]||''} onChange={e=>editar({justificaciones:{...datos.justificaciones,[h]:e.target.value}})}/></label></div>})}
 <label><input type="checkbox" checked={datos.confirmadoP===true} onChange={e=>editar({confirmadoP:e.target.checked})}/>Confirmo P(Hijos), soportes y límites — {nodo.nombre}</label>
 <p>Ruta A: {pa.rango?'['+pa.rango.join(', ')+']':pa.motivo||pa.estado}. {pa.distribucion?.concluyente===false?'Distribución no concluyente.':''}</p>
 <label>Nivel DS sugerido — {nodo.nombre}<select aria-label={'Nivel DS sugerido — '+nodo.nombre} value={datos.dsId||''} onChange={e=>editar({dsId:e.target.value})}><option value="">Sin selección</option>{ds.map(r=><option key={r.id} value={r.id}>{r.id}: [{r.valor.join(', ')}] — {r.estado}</option>)}</select></label>
 {rb&&<p>{rb.texto} {rb.sourceRef.capitulo} {rb.sourceRef.seccion}. No efectivo hasta discriminación y confirmación del S.</p>}
 {coherencia&&<p role="status">Coherencia: {coherencia.estado} {coherencia.rango?'['+coherencia.rango.join(', ')+']':coherencia.motivo}</p>}
 </details>;
}
