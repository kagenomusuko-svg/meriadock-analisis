# Auditoría 9 — Expediente y trazabilidad

Ficha: expediente metrológico, instrucciones §23, orden02 §14; especificación conceptual de ideas y resoluciones de independencia de fuentes HISTOS/SDO. Inputs: snapshot de resultado del motor + metadata opcional. Output: HTML escapado/glosario/estructura/resultados/advertencias/PF; narrativa determinista. Ausencia permanece indeterminada. No prueba hechos, documentos ni cadena de custodia fuente.

`expediente.js` no importa el calculador; generarHTML usa resultado.modelo y no grafo alternativo. API expediente acepta snapshot y sólo calcula cuando éste falta. Constructor envía exactamente su resultado recibido al exportar. Prueba HTTP cambia analisis/insumos junto al snapshot y conserva HTML byte a byte: no hay recálculo encubierto.

## Diferencial

`node auditoria/diferencial.cjs` levanta Next construido y prueba /api/calcular y /api/expediente en un mismo proceso/red local. Fixtures y evidencia: diferencial.json bajo fixtures y evidencia. Respuesta HTTP = JSON serializado del motor local por igualdad profunda; HTML HTTP = función generarHTML por igualdad byte a byte; JSON roundtrip preserva todos los campos calculados; tests AUD-10 extraen y comparan cada valor de operador del HTML exactamente (sin aproximación de presentación). Estado y datos no mutan por exportar. Producción recorrido visual coincide con formatos y AD completo observado. No se capturó respuesta de red/descarga productiva byte a byte; esa parte de cadena se respalda por código compartido + recorrido, y queda reserva instrumental explícita, no falso PASS de descarga cloud.

| Conservación | Observado | Estado |
|---|---|---|
| Valores comunes | Coinciden exactamente antes de formato; .8 aproximado→80.00% visible | CONFORME |
| Estructura, fenómeno, D, familia/dominio, soportes/ref | Modelo preservado; HTML separa cierres | CONFORME |
| Advertencias/indeterminaciones | Mensajes y motivos exportados | CONFORME_CON_RESERVA: origen linter parcialmente incoherente AU-11 |
| W_E / W_ε / ε/K / rondas | JSON conserva objeto PF; HTML muestra resumen grande y detalle pequeño/regularización | CONFORME_CON_RESERVA: detalle completo explícito puede costar memoria |
| B* total/unidad | Respuesta JSON contiene; UI y HTML emiten únicamente valor | PARCIAL P2 AU-05, AUD-02 |
| Inputs originales fuera del modelo | α/IIC completos calculados suelen aparecer en contratos; beneficios ausentes/daño parcial/insumos no solicitados no se conservan | PARCIAL P2 AU-06, AUD-11 |
| Configuración de solicitud | No hay copia general, sensibilidad presupuesto puede desaparecer; PF parte registrada | PARCIAL P2 AU-06 |
| Versión efectiva | versionMotor literal /1, taxonomía etiqueta sin comprobación; no commit de motor ni hash del protocolo resuelto | PARCIAL P2 AU-06/P1 AU-07 |
| Reconstrucción desde HTML | Completa para caso feliz pequeño pero no universal para daño incompleto/protocolo/config | PARCIAL AU-06 |
| Seguridad de texto | escapado &<>comillas, script no ejecutable; nada afirma documento verificado | CONFORME |

Se certifica identidad de magnitudes comunes, **no conservación íntegra universal de solicitud/procedencia**. El snapshot no es un documento firmado ni certificado de origen: no existe vínculo criptográfico a inputs/runtime. Eso es trazabilidad incompleta, no razón para inventar un mecanismo de verificación documental durante auditoría.
