'use strict';
const LOGO_B64=require('./logo_b64');
const {OPERADORES}=require('./nomenclatura');
var CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Inter",sans-serif;font-size:10pt;color:#1a1a1a;background:#fff;line-height:1.6}
h2{font-size:12pt;font-weight:600;color:#1E4C45;border-bottom:2px solid #1E4C45;padding-bottom:6px;margin:16px 0 10px}
h3{font-size:10pt;font-weight:600;margin:16px 0 8px;color:#2d2d2d}
p{margin-bottom:8px}
.seccion{margin:0 0 16px;padding:0 0 12px;border-bottom:1px solid #e0e0e0}
table{width:100%;border-collapse:collapse;margin:8px 0;font-size:9pt;page-break-inside:auto}
th{background:#1E4C45;color:#fff;padding:6px 10px;text-align:left;font-weight:600;font-size:8.5pt}
td{padding:5px 10px;border-bottom:1px solid #e8e8e8;vertical-align:top}
tr:nth-child(even) td{background:#f8f9fa}
.matriz{font-family:monospace;font-size:8pt;background:#f4f6f4;padding:12px;border-radius:4px;margin:10px 0;white-space:pre;overflow-x:auto}
.declaracion-box{border:2px solid #1E4C45;border-radius:6px;padding:16px 20px;margin:16px 0;background:#f0f5f4}
.declaracion-nivel{font-size:20pt;font-weight:700;color:#1E4C45;display:inline-block;margin-right:12px}
.declaracion-texto{font-size:9.5pt;line-height:1.7}
.badge{display:inline-block;padding:2px 8px;border-radius:3px;font-size:8pt;font-weight:600}
.badge-brecha{background:#fde8e8;color:#c0392b}
.badge-equilibrio{background:#e8f5e9;color:#27ae60}
.badge-sobreasuncion{background:#fff3cd;color:#856404}
.badge-grave{background:#fde8e8;color:#c0392b}
.badge-moderado{background:#fff3cd;color:#856404}
.badge-bajo{background:#e8f5e9;color:#27ae60}
.badge-critica{background:#fde8e8;color:#c0392b}
.badge-estable{background:#e8f5e9;color:#27ae60}
.nota{background:#f0f5f4;padding:8px 12px;border-left:3px solid #1E4C45;margin:8px 0;font-size:9pt}
.highlight{font-weight:600;color:#1E4C45}
.deslinde{font-size:8pt;color:#666;margin:24px 0 8px;padding-top:12px;border-top:1px solid #e0e0e0}
.pie-pagina{font-size:8pt;color:#999;text-align:center;margin-top:16px}
.salto-pagina{page-break-before:auto}
.advertencia-box{border:1px solid #e65100;border-radius:4px;padding:10px 14px;margin:12px 0;background:#fff8f0;font-size:9pt;color:#e65100}
`;


function seccionHeader(grafo, metadatos) {
  var folio  = metadatos.folio  || 'Sin folio declarado';
  var fecha  = metadatos.fecha  || 'Sin fecha declarada';
  var titulo = grafo.titulo     || 'Análisis causal';

  return `
<div style="margin:0 0 24px">
  <table style="font-family:'Times New Roman',serif;color:#2f2f2f;width:100%;border-collapse:collapse;margin-bottom:14px" cellspacing="0" cellpadding="0">
    <tr>
      <td style="vertical-align:middle;padding-right:20px;width:110px">
        <img src="${LOGO_B64}" alt="Sello institucional" width="90"
          style="display:block;filter:drop-shadow(2px 3px 3px rgba(120,120,120,0.45))">
      </td>
      <td style="text-align:center">
        <div style="font-family:'Times New Roman',serif;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#1f7a4f;white-space:nowrap;margin-bottom:3px">
          CENTRO MULTIDISCIPLINARIO MERIADOCK
        </div>
        <table width="100%" cellspacing="0" cellpadding="0" style="margin:2px 0 3px 0;border-collapse:collapse">
          <tr>
            <td style="border-top:1px solid #1f7a4f;font-size:0;line-height:0"></td>
            <td style="width:20px;font-size:0;line-height:0"></td>
            <td style="border-top:1px solid #1f7a4f;font-size:0;line-height:0"></td>
          </tr>
        </table>
        <div style="font-size:9px;color:#444;margin-top:1px;line-height:1.2">Formación y Asesoría A.C.</div>
        <div style="font-size:9px;color:#555;line-height:1.2">CLUNI CMM25080811X9X</div>
        <div style="margin-top:5px;font-size:7.5px;font-style:italic;color:#1f7a4f;line-height:1.3">
          &ldquo;La fuerza interior nos impulsa, un pequeño apoyo de los demás nos bendice&rdquo;
        </div>
      </td>
    </tr>
  </table>
  <div style="border-top:2px solid #1E4C45;border-bottom:1px solid #1E4C45;padding:8px 0;margin-bottom:10px;text-align:center">
    <div style="font-size:15pt;font-weight:700;color:#1E4C45;font-family:Georgia,serif">${escH(titulo)}</div>
    <div style="font-size:9pt;color:#555;margin-top:4px;font-family:Georgia,serif">
      Folio: <strong>${escH(folio)}</strong> &nbsp;·&nbsp; ${escH(fecha)} &nbsp;·&nbsp; Metrología causal · Operadores deterministas
    </div>
  </div>
</div>`;
}

function escH(str){return str===null||str===undefined?'':String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function json(valor){return '<pre class="matriz">'+escH(JSON.stringify(valor,null,2))+'</pre>';}
function tabla(encabezados,filas){return '<table><thead><tr>'+encabezados.map(x=>'<th>'+escH(x)+'</th>').join('')+'</tr></thead><tbody>'+filas.map(f=>'<tr>'+f.map(x=>'<td>'+escH(x===null||x===undefined?'Indeterminado':typeof x==='object'?JSON.stringify(x):x)+'</td>').join('')+'</tr>').join('')+'</tbody></table>';}
function bloque(titulo,contenido){return '<section class="seccion"><h2>'+escH(titulo)+'</h2>'+contenido+'</section>';}
function seccionAnalisis(m){return bloque('Finalidad y fenómeno',tabla(['Campo','Insumo declarado'],[['Familia',m.familia],['Dominio',m.dominio],['Pregunta',m.pregunta],['Fenómeno',m.fenomeno?.descripcion],['Evento determinado D',m.eventoDeterminado?.descripcion||m.eventoDeterminado?.nombre],['Taxonomía',m.taxonomiaVersion]]));}
function seccionEstructura(m){return bloque('Nodos y discriminaciones',tabla(['Identificador','Nombre','Tipo','Descripción','Modo','Observación modal','Marco','Intervención / prevención','Soportes'],m.nodosActivos.map(n=>[n.id,n.nombre,n.tipo,n.descripcion,n.modo,n.observacionModo,n.marco,n.intervencion,n.soportes])))+bloque('Relaciones y soportes declarados',tabla(['ID','Origen','Destino','Relación','Nivel','Rango','Soportes','Referencia'],[...m.relacionesInternas.map(e=>[e.id,e.origen,e.destino,'Interna',e.evidenciaNivel,e.rango||{min:e.pesoMin,max:e.pesoMax},e.soportes,e.referencia]),...m.conexionesCierre.map(e=>[e.id,e.origen,e.destino,'Cierre — fuera de W',e.evidenciaNivel,e.rango||{min:e.pesoMin,max:e.pesoMax},e.soportes,e.referencia])]))+'<p>E0: transición no materialmente acreditada. No afirma inexistencia ontológica. El programa registra soportes declarados; no verifica documentos fuente.</p>';}
function seccionOperadores(r){return Object.entries(r.resultados).map(([id,o])=>bloque(OPERADORES[id]||id,'<p>Estado: <strong>'+escH(o.estado)+'</strong>. '+escH(o.motivo)+'</p>'+json(o.valor))).join('');}
function seccionAuditoria(r){
 const escenarios=r.auditoria?.escenarios||{};
 return bloque('Auditoría única del motor','<p>'+escH(r.auditoria?.convencion)+'</p><p>La matriz empírica conserva los pesos declarados. La matriz regularizada, cuando existe, se mantiene separada. ε no es evidencia.</p>'+Object.entries(escenarios).map(([id,pf])=>{
  const W=pf.W_E,small=W&&W.n<=12;
  const resumen={estado:pf.estado,nodos:W?.n,aristas:W?.entradas.length,representacion:W?.representacion,metodo:pf.metodo,iteraciones:pf.iteraciones,tolerancia:pf.tolerancia,errorFinal:pf.errorFinal,residuo:pf.residuo,eigenvalorDominante:pf.eigenvalorDominante,vector:pf.vector,sumaVector:pf.sumaVector,top:pf.top,diagnostico:pf.diagnostico,diagnosticoEmpirico:pf.diagnosticoEmpirico,regularizacionAplicada:pf.regularizacionAplicada,epsilon:pf.epsilon};
  return '<h3>Escenario '+escH(id)+'</h3>'+json(resumen)+(small?'<h3>W_E: entradas empíricas, sin D</h3>'+tabla(['Fila (origen)','Columna (destino)','Peso','Relación','Nivel'],W.entradas.map(e=>[W.ids[e.fila],W.ids[e.columna],e.valor,e.relacion,e.evidenciaNivel])):'<p>Representación sparse; el detalle por aristas está en la auditoría exportable.</p>')+(pf.W_epsilon?'<h3>W_ε = W_E + εK</h3>'+json(pf.W_epsilon.regularizacion):'')+(pf.rondas?.length?'<details><summary>Rondas de potencia: productos, sumas, normalización y error</summary>'+json(pf.rondas)+'</details>':'<p>Rondas resumidas por tamaño del grafo. El constructor permite solicitar el registro completo.</p>');
 }).join(''));
}
function generarHTML(resultado,grafo,metadatos={}){
 if(!resultado?.modelo||!resultado?.resultados||!resultado?.auditoria)throw new Error('Resultado auditable del motor requerido');
 const m=resultado.modelo;
 const glosario=tabla(['Operador','Definición'],[['R*','Eigenvector derecho no negativo, normalizado L1: W R* = ρ R*.'],['S','Promedio simple o ponderado de componentes discriminados.'],['R*_neta','R* × (1 − S).'],['α','Condiciones adversas atribuibles; estrategia explícita.'],['Δ','R* − α; signo matemático sin umbrales universales.'],['IIC','Coincidencias identificadas / elementos declarados.'],['B*','Beneficio neto / beneficio total, con unidad declarada.'],['D_total','T_invertido + T_impedido + ΔT_trayectoria, unidades comparables.'],['AD','R*_i × D_total.'],['Robustez','Comparación de PF mínimo, central y máximo.']]);
 const resumen='<p>Según los insumos declarados por el analista. Motor '+escH(resultado.versionMotor)+'. Las mediciones ausentes permanecen indeterminadas.</p>';
 return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escH(metadatos.titulo||m.titulo||'Expediente metrológico')+'</title><style>'+CSS+'pre{white-space:pre-wrap;overflow-wrap:anywhere}body{max-width:1100px;margin:auto;padding:24px}</style></head><body>'+seccionHeader(m,metadatos)+resumen+seccionAnalisis(m)+seccionEstructura(m)+seccionOperadores(resultado)+bloque('Deudas y advertencias',json(resultado.mensajes||[]))+seccionAuditoria(resultado)+bloque('Glosario de operadores',glosario)+'</body></html>';
}
function generarNarrativa(resultado,metadatos={}){
 if(!resultado?.modelo||!resultado?.resultados)throw new Error('Resultado del motor requerido');
 const m=resultado.modelo;
 const parrafos=Object.entries(resultado.resultados).map(([id,o])=>'<p><strong>'+escH(OPERADORES[id]||id)+':</strong> '+escH(o.estado)+'. '+escH(o.motivo)+(o.valor===null?'':json(o.valor))+'</p>').join('');
 return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>'+escH(m.titulo)+'</title><style>'+CSS+'</style></head><body>'+seccionHeader(m,metadatos)+'<p>Resumen determinista según los insumos declarados por el analista. Pregunta: '+escH(m.pregunta)+'.</p>'+parrafos+bloque('Advertencias',json(resultado.mensajes||[]))+'</body></html>';
}
module.exports={generarHTML,generarNarrativa};
