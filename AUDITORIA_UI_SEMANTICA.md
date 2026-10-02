# Auditoría 8 — UI y semántica visible

Código revisado integralmente: components/chat/Constructor.jsx, adaptador, linter/nomenclatura/phi1, páginas, APIs y estilos. Navegador: https://meriadock-analisis.vercel.app/constructor; evidencia `ui-produccion.json` y `ui-duplicado.json`. Caso exclusivamente sintético, sin documentos ni datos reales. Recorrido de ocho pantallas completo.

| Pantalla | Semántica y observación | Estado / severidad |
|---|---|---|
| Finalidad | Tres finalidades separadas de dominio libre; repertorio no filtrado | CONFORME |
| Fenómeno/pregunta | D descriptivo externo, no requiere subir documentos | CONFORME_CON_RESERVA: D/pregunta vacíos no bloquean calcular; ERROR visible, AU-09 P2 |
| Nodos | Un nodo permitido; tipos/modes indeterminados por defecto, no voluntariedad inventada; eliminación quita relaciones | CONFORME |
| Relaciones/soportes | E0 con frase epistémica correcta; soporte no cuenta peso; rango mínimo no negativo; conexión D externa | PARCIAL: duplicado interno permitido por formulario, linter lanza excepción durante render; página blanca AU-03 P2. Rangos/niveles API inválidos AU-02 P1 |
| Discriminaciones | S explícito, α acción/discriminado/monetario, IIC declarado/observado/coincidencias; observaciones no generan magnitudes | CONFORME_CON_RESERVA: S piloto no rotulado, taxonomía no cargable, AU-07/08 |
| Medidas adicionales | Beneficios/montos con unidad, cero explícito/ausencia distintos; ε/K y método/presupuesto opcionales explícitos | CONFORME_CON_RESERVA: pérdida de inputs/metadata después de calcular AU-05/06 |
| Calcular | Repertorio de 12 operadores; fallos locales registrados | CONFORME_CON_RESERVA: comunes ERROR no bloquean, desconocido API aborta todo AU-10 |
| Resultados/auditoría | Según insumos declarados; etiquetas actuales, sin culpa/demostración ni evidencia verificada | PARCIAL: no solicitado/N.A./indeterminado colapsados en tabla; garantías PF escondidas; details sólo valor, Btotal/unidad perdidos; AU-05/09 |

Producción muestra R*80/20, S16.67/56.67, neta66.67/8.67, α8/3, Δ.72/.17, B*.75/.25, AD119.99999999476131/30.00000000523869. Esta diferencia del ideal120/30 es aproximación PF dentro tolerancia, no un cálculo distinto. DeclaraciónA no equivale a verdad jurídica ni cobertura de todo hipercubo.

## Errores y accesibilidad

Duplicado: agregar A→A dos veces con E1/rango.9 genera `crearAnalisis → mensajesAnalisis → Constructor` excepción; queda documento vacío. Recuperación recarga y pierde borrador. Reproducido en alias productivo y guardado stack; no se corrigió. Un error de datos esperado debería permanecer como mensaje recuperable.

Labels asociadas a campos, radios/checkboxes, main/h1, botones con texto, details/summary y alert para error de solicitud existen. Checklist de pasos usa ✓ por posición, no por validación, lo que induce cierre semántico no acreditado. Color de etiquetas de pasos muy tenue y nav no declara aria-current/selección, no existe anuncio aria-live de progreso/resultados ni política de foco tras avanzar. Auditoría estática y recorrido teclado/roles básicos, no certificación WCAG ni prueba con lector de pantalla: AU-18 P2.

Panel «sin deudas ... reglas disponibles» tiene delimitación correcta, pero linter sólo examina subconjunto de insumos. En API α externo produce falso ERROR aunque Δ calculado (AU-11); UI normalmente duplica α en nodo y no revela ese caso.

Downloads: intento cloud no entregó evento de descarga en30s. No se declara fallo general de la app a partir de esa limitación; CI testUI y HTTP local prueban generación. JSON audit usa resultado entero; no conserva solicitud entera (AU-06).

Nomenclatura no presenta S/neta como sentencia, ni Δ como culpabilidad. Dominio de protocolos actuales es más estrecho que toda Metrología; indicarlo al usuario es necesario, AU-08.
