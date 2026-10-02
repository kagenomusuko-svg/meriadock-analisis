# Auditoría 1 — Arquitectura conceptual

Base y autoridad: auditoria/BASE_Y_FUENTES.md; instrucciones actuales §§1–11 y orden 02 §§4–6. Estados y severidad se usan según §5/19 de la orden. Los IDs remiten al registro de discrepancias.

| Objeto / símbolo | Definición, inputs y regla | Motor / UI / expediente | Ausencia, incertidumbre e interpretación | Prueba / observado | Estado / severidad / decisión |
|---|---|---|---|---|---|
| Análisis | Pregunta + fenómeno + finalidad + dominio + selección de operadores | modelo.crearAnalisis; Constructor; entrada; expediente.seccionAnalisis | No prueba el expediente fuente; no requiere carga de archivos. Campos comunes incompletos producen advertencia, no certificado | modelo.test, recorrido 8 pantallas | CONFORME_CON_RESERVA / P2, AU-09 / no |
| Fenómeno | Objeto descrito y pregunta causal, distinto de D | fenómeno.descripcion preservado | Descripción vacía sigue siendo vacía; no inferencia textual | linter.test dentro interfaz-expediente | CONFORME_CON_RESERVA / P2 / no |
| Evento determinado / D | Cierre descriptivo externo a W y R* | modelo separa final legacy; grafo excluye; HTML cierre fuera de W | Cierre requerido para R*, pero basta una conexión E0 y no se valida su rango: requisito metrológico sólo parcial | pf.test, AUD-01 | PARCIAL / P1, AU-01 / no |
| Nodo / N_i | Unidad relevante, no necesariamente persona; tipo discriminado | modelo valida IDs; UI tipos explícitos | Tipo y modo ausentes → indeterminado, sin asignación psicológica | modelo.test, AUD-06 | CONFORME / — / no |
| Relación / w_ij | Transición local origen→destino con rango y evidencia discriminados | modelo + grafo + formulario | E0→peso epistémico cero; ausencia de rango no se convierte en cero; pares duplicados se rechazan | pf.test; duplicado dispara render sin captura | PARCIAL / P1 AU-02 y P2 AU-03 / no |
| Discriminación | Juicio humano registrado, no inferencia desde soportes | S/alpha/IIC explícitos; no LLM | No cuenta documentos para fijar pesos; niveles E1–E8 sin mapa taxonómico autoritativo | derivados.test, búsqueda runtime | CONFORME_CON_RESERVA / P2 AU-08 / no |
| Soporte | Descripción humana que sustenta una discriminación | arrays/string declarados preservados en nodos y relaciones | No verificación documental automática; ni certificado de verdad | HTML frase explícita; escapar script | CONFORME / — / no |
| Referencia | Procedencia documental opcional, distinta del soporte y expediente | campo referencia, linter WARN ausencia | Puede calcularse sin adjuntos; WARN no altera valores | interfaz-expediente.test | CONFORME / — / no |
| Operador | Contrato de medición con inputs, dependencias y salida | series.REGISTRY 12 entradas; nomenclatura | Fallos locales preservan independientes; operador desconocido y modelo inválido abortan solicitud completa | operadores.test; diagnóstico | CONFORME_CON_RESERVA / P2 AU-10 / no |
| Resultado | Magnitud + estado + motivo + auditoría | series/JSON/tabla/details | null preservado; no solicitado, no aplicable e indeterminado no se distinguen bien en tabla; overflow calculado no finito | AUD-04, UI | PARCIAL / P1 AU-04, P2 AU-09 / no |
| Expediente metrológico | Registro derivado del cálculo, distinto de fuente de hechos | generarHTML consume resultado, sin motor importado | No recalcula; conservación incompleta de inputs externos/config/metadatos B* | AUD-02; diferencial | PARCIAL / P2 AU-05/06 / no |
| Familia | Finalidad: imputación/compliance/contabilidad | radio familia; motor no filtra operadores | Tres familias comparten repertorio; no un sinónimo de dominio | interfaz-expediente.test, recorrido | CONFORME / — / no |
| Dominio | Ámbito de aplicación, texto declarado | estado.dominio→modelo→HTML | No selecciona fórmula por nombre ni fallback a dominio general | búsqueda/adaptador | CONFORME_CON_RESERVA / P2 AU-08 / no |
| Protocolo taxonómico | Estrategia versionada de observación/calibración, no fórmula universal | registry/loader existen pero UI importa GENERICO y adaptador fija generico@1 | Protocolo externo no cambia circuito activo; taxonomiaVersion arbitraria API no se comprueba | AUD-07 y prueba existente sólo de Map | PARCIAL / P1 AU-07 / no |
| Asistente determinista | Reglas para orientar y validar insumos, sin inventar hechos | linter.mensajesAnalisis | α externo calculado produce ERR falso; excepciones de modelo no capturadas; no certifica integridad universal | AUD-03; fuente UI | PARCIAL / P2 AU-03/11 / no |

## Conclusión

La separación básica existe y los conceptos no se colapsan en las antiguas tres series. La frontera taxonómica es todavía un registro aislado, y la conservación del expediente es incompleta. Ninguna diferencia aquí obliga a elegir una nueva doctrina: las instrucciones actuales permiten auditar y documentar el incumplimiento. Correcciones reservadas a la orden posterior.
