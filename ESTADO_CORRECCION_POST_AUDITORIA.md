# Estado de corrección post-auditoría

Regla: una tarea sólo se marca [x] después de commit + pruebas.

## Último punto seguro

- Estado: EN EJECUCIÓN
- Base doctrinal: RESOLUCION_AUDITORIA_I_INV.md
- Base de hallazgos: REGISTRO_DISCREPANCIAS_AUDITORIA.md
- Bloque activo: Fase 2
- Próxima tarea: snapshot y estados efectivos

## Fase 1 — P1 estructurales y numéricos

- [x] AU-01 validar clausura. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] AU-02 validar schema de relaciones. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] AU-04 impedir resultados no finitos etiquetados como calculados. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] AU-14 hacer robustez invariante a orden/permutación. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] AU-03 hacer errores de UI recuperables. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] Tests de regresión Fase 1. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] CI/build/UI verde Fase 1. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`


## Fase 2 — trazabilidad y coherencia entre capas

- [ ] AU-05 mostrar contrato completo B*.
- [ ] AU-06 conservar snapshot reproducible.
- [ ] AU-09 diferenciar estados visibles.
- [ ] AU-11 alinear linter con insumos efectivos.
- [ ] AU-12 distinguir estimación de rho de eigenvalor validado.
- [ ] AU-15 registrar completitud de sensibilidad.
- [ ] AU-10 delimitar validación global y fallos locales.
- [ ] Tests de regresión Fase 2.
- [ ] CI/build/UI verde Fase 2.

## Fase 3 — Taxonomía efectiva y UI

- [ ] AU-07 resolver/aplicar protocolos versionados.
- [ ] AU-08 etiquetar pilotos y alcances.
- [ ] AU-18 mejorar accesibilidad verificable.
- [ ] Tests de regresión Fase 3.
- [ ] CI/build/UI verde Fase 3.

## Fase 4 — repertorio e I_inv

- [ ] AU-13 mantener Fraude annona reservado de forma explícita.
- [ ] AU-17 clasificar repertorio MAT/TAX/CON/HIST/FUERA.
- [ ] Implementar sólo operadores MAT con contrato completo y autorizado.
- [ ] Implementar I_inv conforme a RESOLUCION_AUDITORIA_I_INV.md.
- [ ] Añadir casos canónicos y casos límite de I_inv.
- [ ] Tests de regresión Fase 4.
- [ ] CI/build/UI verde Fase 4.

## Fase 5 — legacy

- [ ] AU-16 retirar/reubicar/marcar legacy inactivo.
- [ ] Verificar imports y rutas.
- [ ] CI/build/UI verde Fase 5.

## Reaceptación

- [ ] Verificar AU-01–AU-18.
- [ ] Verificar invariantes centrales.
- [ ] Verificar trazabilidad UI/API/motor/expediente/JSON.
- [ ] Verificar producción.
- [ ] Crear AUDITORIA_REACEPTACION_POST_CORRECCION.md.
- [ ] Registrar conclusión.
- [ ] Cerrar tablero.

## Decisiones pendientes

Ninguna al inicio. I_inv ya está resuelto.

## Historial de commits

- `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1` — Fase 1, 56 pruebas y build local; CI37079739386 SUCCESS con Chromium/Playwright. UI local bloqueado por navegador no instalado; CI prueba el flujo completo y adverso.

