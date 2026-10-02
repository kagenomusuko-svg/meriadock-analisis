# Auditoría 10 — Determinismo y ausencia de inferencia

Fuente: orden02 §4.19–22/15; instrucciones de ausencia, discriminación y cálculo. Búsqueda en motor, components, páginas, taxonomía y scripts: evidencia/busqueda-determinismo.txt. Se distinguen cálculo, identidad, formato y diagnosticar rendimiento.

| Hallazgo | Efecto y clasificación | Estado |
|---|---|---|
| No Math.random en núcleo | Mismo input estructurado→mismos outputs/rondas/errores | CONFORME: repetición profunda AUD-06, sensibilidad/mismo método |
| crypto.randomUUID en nodos/relaciones UI | Identidad de registros; no modifica fórmula en arrays mismos valores/orden | CONFORME_CON_RESERVA: payloads no byte idénticos si creados de nuevo, no aleatoriedad matemática |
| Sin Date.now/new Date en cálculo activo | Timestamp diagnóstico auditoría no entra en magnitudes | CONFORME |
| Arranque uniforme positivo PF | Default autorizado explícito, no fallback de fallo | CONFORME; identidad no única se registra condición insuficiente |
| tol1e−10 / maxIter10000 | Parámetros numéricos explícitos en resultado, no evidencia ni pesos inferidos | CONFORME_CON_RESERVA; presupuesto general de solicitud no siempre conservado AU-06 |
| Entradas vacías→null adaptador | No Number('')=0 en interfaz; nullish paths preservan ausencia | CONFORME; `.monto ?? .montoEstimado` conserva cero |
| E0→rango0 | Exigencia epistémica actual; soporte/nodo permanecen | CONFORME |
| tipo/modo vacío→indeterminado | No voluntario/E1/diseño por ausencia | CONFORME |
| taxonomiaVersion generico@1 fijo | Selección automática única piloto; impide protocolo real alterno | PARCIAL P1 AU-07 |
| sort ranking empates por índice | Determinista computacional pero cambia semántica A/B al permutar nodos | CONTRADICE_FUENTE P1 AU-14 |
| top PF orden estable en empate | Lista de auditoría sin adjudicación de ganador; no se usa para resolver empate líder | CONFORME_CON_RESERVA: explicitar pluralidad |
| toFixed pct2/Δ6 únicamente salida | No redondeo intermedio ni clamp de Δ | CONFORME |
| alpha proporción min1 | Saturación actual autorizada de α; no umbral moral | CONFORME |
| escalas legacy invalid→0/general | Helpers no importados; deuda potencial si se reactivan | NO_APLICABLE runtime/P3 AU-16 |
| Overflow de suma | Inputs finitos→Infinity; JSON null sin cambio de estado; B cuotas0 | PARCIAL P1 AU-04; determinismo no asegura validez |
| Dato faltante en array vacío | Algunas salidas [] estado calculado por vacuidad | CONFORME_CON_RESERVA P2 AU-09; no hay nodos medidos |

No se detecta localización automática por texto, topología, expediente o Hijos. Reglas linter no predican hechos; pueden estar incompletas/incoherentes. El JSON/HTML/narrativa son reproducibles para mismo snapshot y metadata. Determinismo probado no equivale a equivalencia doctrinal ni a auditabilidad plena de inputs perdidos.
