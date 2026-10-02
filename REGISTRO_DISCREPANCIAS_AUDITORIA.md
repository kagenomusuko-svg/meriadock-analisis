# Registro de discrepancias de auditoría

Severidad según orden02§19. 18 hallazgos runtime/cobertura: **0 P0, 5 P1, 12 P2, 1 P3**. «Sin P0 identificado» se refiere al contrato actual revisado, no a equivalencia con todos los estimandos históricos. El overflow se clasifica P1 por condiciones extremas que alteran resultados. Las erratas/conflictos del corpus se registran aparte en CONTRADICCIONES_ENTRE_FUENTES y no inflan defectos activos.

## AU-01 — Clausura sólo contada

- Severidad: P1.
- Fuente: orden02§4.8 y postulado de clausura.
- Código: dist-motor/modelo.js,series.js.
- Reproducción/evidencia: AUD-01/AUD-13: quitar cierres indetermina; cierreE0 o rango−9/−1 permite cálculo.
- Efecto: La presencia de relación no acredita cierre positivo ni validez de su rango.
- Corrección propuesta (no ejecutada): Validar contrato de cierre y distinguir declarativo, no acreditado e inválido; mantener D externo.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-02 — Validación incompleta de relaciones

- Severidad: P1.
- Fuente: instrucciones discriminación/evidencia, orden02§6.
- Código: dist-motor/modelo.js,grafo.js.
- Reproducción/evidencia: diagnostico y lectura: IDsrelación repetidos/nivel fueraE0–8 no se rechazan; rangos internos no finitos sí se rechazan.
- Efecto: Se pueden registrar evidencias/identidades incoherentes.
- Corrección propuesta (no ejecutada): Validar IDs únicos y nivel entero válido, referencias y schema común; no inventar E→w.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-03 — Constructor vacío ante duplicado

- Severidad: P2.
- Fuente: asistente orienta/valida, orden02§13.
- Código: components/chat/Constructor.jsx,dist-motor/linter.js.
- Reproducción/evidencia: AUD-12 y ui-duplicado.json: A→A dos veces; excepción en render.
- Efecto: Error de datos esperado rompe interfaz y pierde borrador tras recargar.
- Corrección propuesta (no ejecutada): Capturar validación estructurada antes de render; error local recuperable; conservar borrador.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-04 — Overflow con inputs finitos

- Severidad: P1.
- Fuente: B*suma1, magnitudes auditables; instr§19–21.
- Código: dist-motor/b_estrella.js,danio.js,series.js.
- Reproducción/evidencia: AUD-04: 1e308+1e308=Infinity, cuotas[0,0], estado calculado; JSONtotalnull.
- Efecto: Resultado calculado inválido pese a entradas finitas; suma de cuotas no1.
- Corrección propuesta (no ejecutada): Guardas de finitud de operaciones/outputs y sumas robustas; indeterminar con motivo, no cero.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-05 — Btotal/unidad perdidos al presentar

- Severidad: P2.
- Fuente: orden02§9/14 unidades/trazabilidad.
- Código: components/chat/Constructor.jsx,dist-motor/expediente.js.
- Reproducción/evidencia: AUD-02 y ui-produccion.json: resultadoBtotal40unidadMXN, details/HTML sólo valor.
- Efecto: Cuota sin base/unidad no permite interpretar beneficio.
- Corrección propuesta (no ejecutada): Renderizar contrato completo de cada operador y conservar metadata fueravalor.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-06 — Solicitud incompleta en expediente

- Severidad: P2.
- Fuente: orden02§14 reconstruir input/versiones.
- Código: dist-motor/entrada.js,series.js,expediente.js.
- Reproducción/evidencia: AUD-11/diferencial: insumos externos y configuración no conservados, daño parcial desaparece como totalnull.
- Efecto: No reconstrucción universal; versiónmotorliteralnoSHA/protocoloefectivo.
- Corrección propuesta (no ejecutada): Incluir snapshot solicitado/efectivo, insumos incluso faltantes, versión runtime y protocolo resuelto.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-07 — Taxonomía aislada del circuito

- Severidad: P1.
- Fuente: instrucciones§16/22 separaciónversionada.
- Código: components/constructor/entrada.js,components/chat/Constructor.jsx,taxonomia,dist-motor/series.js.
- Reproducción/evidencia: AUD-07: otro@2→generico@1; API acepta versión desconocida; αtaxonomico no recibe estrategia.
- Efecto: Version declarada puede no ser aplicada; protocolo no intercambiable sin cambiar UI.
- Corrección propuesta (no ejecutada): Resolver loader/registry por versión; validar dominio/operador; construir UI por esquema; estrategias autorizadas.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-08 — Pilotos y estimandos sin alcance visible

- Severidad: P2.
- Fuente: instr§12/17, RES-IIC-001, RES-S.
- Código: components/chat/Constructor.jsx,dist-motor/nomenclatura.js.
- Reproducción/evidencia: S3componentes mostrado como S; IICconteo sin alcance por nodo/dominio; Bnegativo posible.
- Efecto: Puede interpretarse como estimator universal o distribución positiva cuando no lo es.
- Corrección propuesta (no ejecutada): Etiquetar piloto/versión/dominio y definir interpretación de beneficio neto firmado sin prohibirlo arbitrariamente.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-09 — Estados/garantías poco diferenciados

- Severidad: P2.
- Fuente: dato ausente≠0, orden02§13.
- Código: components/chat/Constructor.jsx,dist-motor/series.js.
- Reproducción/evidencia: UI tabla vacía para no solicitado/N.A./indeterminado; pasos✓porposición; PF condicionesfalse escondidas; []calculado.
- Efecto: Apariencia de cierre/garantía mayor que información disponible.
- Corrección propuesta (no ejecutada): Estados visibles poroperador, garantías PF y motivo junto magnitud; validación separada de navegación.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-10 — Independencia limitada por validación global

- Severidad: P2.
- Fuente: instr operadores independientes.
- Código: dist-motor/series.js,entrada.js.
- Reproducción/evidencia: operador desconocido/modeloinválido aborta solicitud; B/daño normales sí independientes.
- Efecto: Un fallo común impide salidas que no usan grafo.
- Corrección propuesta (no ejecutada): Documentar/validar solicitud y diferenciar errores comunes de dependencias locales; no calcular sobre esquema corrupto.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-11 — Linter no ve α externo

- Severidad: P2.
- Fuente: Δ=R−α e insumos completos.
- Código: dist-motor/linter.js,series.js.
- Reproducción/evidencia: AUD-03: Δ calculado desde insumosAlpha pero2ERR_DELTA_SIN_ALPHA.
- Efecto: Mensajes contradicen cálculo y confunden suficiencia.
- Corrección propuesta (no ejecutada): Linter sobre insumos efectivos normalizados compartidos con operadores.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-12 — Nombreρdominante en no convergencia

- Severidad: P2.
- Fuente: orden02§7.1 estimación/residuo.
- Código: dist-motor/r_estrella.js,expediente.js.
- Reproducción/evidencia: ciclo desigual: estimación1.5, ρreal√2, residuo.5, estado indeterminado; campo eigenvalorDominante.
- Efecto: Etiqueta puede leerse como valor propio verificado aunque es estimación.
- Corrección propuesta (no ejecutada): Separar estimaciónρdeρvalidada junto residuo/convergencia; no cambiar tolerancias sin evidencia.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-13 — Fraude annona reservado

- Severidad: P2.
- Fuente: instr§18, MC I IV4, RES-SDO.
- Código: dist-motor/fraude_annona.js,series.js.
- Reproducción/evidencia: Sin protocolo autorizado→indeterminado; función no transportable por JSON.
- Efecto: Entrada registry no equivale a operador canónico operativo.
- Corrección propuesta (no ejecutada): Mantener reserva visible; contrato declarativo versionado autorizado antes de implementarlo; jamás activarlegacy.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-14 — Empate secundario depende de posición

- Severidad: P1.
- Fuente: RESERVA_PROTOCOLO_EMPATES, instr§11.
- Código: dist-motor/hipercubo.js.
- Reproducción/evidencia: AUD-08: [.6,.2,.2] / [.6,.21,.19] / [.6,.2,.2] A; permutar dos nodos secundarios→B.
- Efecto: Letra cambia sin cambio causal; criterio de orden se inventa en empate.
- Corrección propuesta (no ejecutada): Comparar rankings como preórdenes/grupos empate o indeterminar según reserva; invarianza a permutación.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-15 — Sensibilidad completa con muestras faltantes

- Severidad: P2.
- Fuente: orden02§10 métodos/indeterminación.
- Código: dist-motor/hipercubo.js.
- Reproducción/evidencia: diagnostico/lectura: valoración de muestreo calculada puede contener vectornull.
- Efecto: No diferencia completitud de evaluación de validez de escenarios.
- Corrección propuesta (no ejecutada): Contar convergentes/fallidos y etiquetar completitud separada de calculabilidad; preservar causa.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-16 — Helpers históricos inactivos

- Severidad: P3.
- Fuente: legacy no autoridad, orden02§3.5.
- Código: dist-motor/escalas.js,espacio.js,pages/api/hello.js.
- Reproducción/evidencia: búsqueda imports: helpers no circuitoactual; hello respuesta demo.
- Efecto: Deuda mantenimiento sin efecto doctrinal actual; riesgo si reactivado.
- Corrección propuesta (no ejecutada): Reubicar/retirar o marcar legado en orden posterior; comprobar imports y rutas.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-17 — Repertorio incompleto del corpus

- Severidad: P2.
- Fuente: orden02§11, invariantesfamilias/operadores.
- Código: dist-motor/series.js REGISTRY.
- Reproducción/evidencia: inventarioOP01–45; 12 entradas, Shapley/recurrencia/intervención/etc faltan.
- Efecto: Cierre anterior no prueba cobertura completa; varios objetos fuera de calculador.
- Corrección propuesta (no ejecutada): Separar backlogMAT/TAX/CON/FUERA/HIST; contratos antes de código; no implementar conjeturas.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## AU-18 — Orientación y accesibilidad parcial

- Severidad: P2.
- Fuente: orden02§13 accesibilidad/ayudas.
- Código: components/chat/Constructor.jsx,estilos.
- Reproducción/evidencia: lectura y recorrido: navsinaria-current, foco/aria-live no coordinados; tono tenue sin contraste certificado.
- Efecto: Orientación incompleta para teclado/lectores; riesgo, no certificaciónWCAG.
- Corrección propuesta (no ejecutada): Pruebas teclado/foco/lectores y contraste; etiquetas/announcements; criterio accesible verificable.
- Decisión doctrinal obligatoria: no para documentar/cerrar esta auditoría. AU-13/17 requieren contrato futuro y AU-17 excluye I_inv hasta resolver su fichero.

## Decisión separada de fuente

CF16/OP41 es DECISION_REQUERIDA para I_inv; fórmula frente a significado/monotonicidad. Véase DECISION_PENDIENTE_AUDITORIA_I_INV.md. No hay implementación activa que corregir. No se asigna una severidad P0 a un operador inexistente. El resto de correcciones de invariantes actuales puede prepararse sin adjudicar ese índice y no se ha ejecutado.
