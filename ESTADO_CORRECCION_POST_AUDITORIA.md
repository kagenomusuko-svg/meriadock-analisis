# Estado de corrección post-auditoría

Regla: una tarea sólo se marca [x] después de commit + pruebas.

## Último punto seguro

- Estado: EN EJECUCIÓN
- Base doctrinal: RESOLUCION_AUDITORIA_I_INV.md
- Base de hallazgos: REGISTRO_DISCREPANCIAS_AUDITORIA.md
- Bloque activo: Fase 5
- Próxima tarea: retirar legacy y reaceptación

## Fase 1 — P1 estructurales y numéricos

- [x] AU-01 validar clausura. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] AU-02 validar schema de relaciones. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] AU-04 impedir resultados no finitos etiquetados como calculados. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] AU-14 hacer robustez invariante a orden/permutación. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] AU-03 hacer errores de UI recuperables. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] Tests de regresión Fase 1. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`
- [x] CI/build/UI verde Fase 1. — `4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1`


## Fase 2 — trazabilidad y coherencia entre capas

- [x] AU-05 mostrar contrato completo B*. — `6688263bdf2a9f212f870fbeccd60e7460021d86`
- [x] AU-06 conservar snapshot reproducible. — `6688263bdf2a9f212f870fbeccd60e7460021d86`
- [x] AU-09 diferenciar estados visibles. — `6688263bdf2a9f212f870fbeccd60e7460021d86`
- [x] AU-11 alinear linter con insumos efectivos. — `6688263bdf2a9f212f870fbeccd60e7460021d86`
- [x] AU-12 distinguir estimación de rho de eigenvalor validado. — `6688263bdf2a9f212f870fbeccd60e7460021d86`
- [x] AU-15 registrar completitud de sensibilidad. — `6688263bdf2a9f212f870fbeccd60e7460021d86`
- [x] AU-10 delimitar validación global y fallos locales. — `6688263bdf2a9f212f870fbeccd60e7460021d86`
- [x] Tests de regresión Fase 2. — `6688263bdf2a9f212f870fbeccd60e7460021d86`
- [x] CI/build/UI verde Fase 2. — `6688263bdf2a9f212f870fbeccd60e7460021d86`

## Fase 3 — Taxonomía efectiva y UI

- [x] AU-07 resolver/aplicar protocolos versionados. — `7abc8ff76f20dd4701ed128f510f628fa4cdd260` + `9430acf2118e018568be6ac3cf6a888c39140cb3`
- [x] AU-08 etiquetar pilotos y alcances. — `7abc8ff76f20dd4701ed128f510f628fa4cdd260` + `9430acf2118e018568be6ac3cf6a888c39140cb3`
- [x] AU-18 mejorar accesibilidad verificable. — `7abc8ff76f20dd4701ed128f510f628fa4cdd260` + `9430acf2118e018568be6ac3cf6a888c39140cb3`
- [x] Tests de regresión Fase 3. — `7abc8ff76f20dd4701ed128f510f628fa4cdd260` + `9430acf2118e018568be6ac3cf6a888c39140cb3`
- [x] CI/build/UI verde Fase 3. — `7abc8ff76f20dd4701ed128f510f628fa4cdd260` + `9430acf2118e018568be6ac3cf6a888c39140cb3`

## Fase 4 — repertorio e I_inv

- [x] AU-13 mantener Fraude annona reservado de forma explícita. — `77e043741ca3278dad7eee976e81cde9e68f0c57`
- [x] AU-17 clasificar repertorio MAT/TAX/CON/HIST/FUERA. — `77e043741ca3278dad7eee976e81cde9e68f0c57`
- [x] Implementar sólo operadores MAT con contrato completo y autorizado. — `77e043741ca3278dad7eee976e81cde9e68f0c57`
- [x] Implementar I_inv conforme a RESOLUCION_AUDITORIA_I_INV.md. — `77e043741ca3278dad7eee976e81cde9e68f0c57`
- [x] Añadir casos canónicos y casos límite de I_inv. — `77e043741ca3278dad7eee976e81cde9e68f0c57`
- [x] Tests de regresión Fase 4. — `77e043741ca3278dad7eee976e81cde9e68f0c57`
- [x] CI/build/UI verde Fase 4. — `77e043741ca3278dad7eee976e81cde9e68f0c57`

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


- `6688263bdf2a9f212f870fbeccd60e7460021d86` — Fase 2: npm ci, 62 pruebas y build; CI37080135282 SUCCESS incluido flujo UI/API/expediente.

- `7abc8ff76f20dd4701ed128f510f628fa4cdd260` + `348de91c05cf09ed17dee861dca46de81fd8046e` + `9430acf2118e018568be6ac3cf6a888c39140cb3` — Fase 3: 65 pruebas y build; CI37081467948 SUCCESS. Los dos CI anteriores detectaron ambigüedades del test Playwright, corregidas sin omitir las aserciones. Contraste de navegación/header comprobado ≥4.5; no certificación WCAG.

- `77e043741ca3278dad7eee976e81cde9e68f0c57` — Fase 4: npm ci, 75 pruebas/build, CI37081724786 SUCCESS. Playwright prueba I_inv signed, Shapley y J integrados; expediente conserva signos y snapshot. Artifacts Fases1–3 descargados y revisados visualmente.
