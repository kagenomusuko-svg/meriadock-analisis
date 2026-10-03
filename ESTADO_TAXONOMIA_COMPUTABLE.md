# Estado Work04 — Taxonomía computable y Fraude annona

## Último punto seguro

- Estado: EN EJECUCIÓN
- Base runtime: Work03 ACEPTADO_CON_RESERVAS
- Bloque activo: preparación
- Próxima tarea: revisar/compilar capítulos 2–78; completar instrumentos UI y cobertura de aceptación
- Decisiones pendientes: ninguna al inicio

## Preparación

- [x] Fijar SHA de meriadock-analisis. — 168144596333a49c25a200d38d3ed6e06fd63c2c; 82 blobs verificados mediante hash Git.
- [x] Fijar SHA de Paradigma. — 168144596333a49c25a200d38d3ed6e06fd63c2c; 82 blobs verificados mediante hash Git.
- [x] Inventariar U·1–U·4 y capítulos 1–78. — 168144596333a49c25a200d38d3ed6e06fd63c2c; 82 blobs verificados mediante hash Git.
- [x] Crear manifiesto inicial de cobertura. — 168144596333a49c25a200d38d3ed6e06fd63c2c; 82 blobs verificados mediante hash Git.

## Fase 1 — Schema y loader

- [x] Definir schema versionado. — taxonomia/1, 80 pruebas locales; commit funcional documentado abajo.
- [x] Añadir estados epistemológicos. — siete estados, efectos separados y confirmación.
- [x] Añadir sourceRef/proveniencia. — SHA/path/capítulo/sección/regla/estado obligatorios.
- [x] Refactorizar registry/loader. — ae545f6393872e6659925e66cd191aa58e4cfbc2
- [x] Preservar generico@1. — compatibilidad probada.
- [x] Tests de schema/loader. — 84 pruebas locales y build.

## Fase 2 — Protocolo Universal U·1–U·4

- [x] U·1 Hijos/legibilidad. — datos y orientación pura, 05ddcae7 / ae545f6393872e6659925e66cd191aa58e4cfbc2
- [x] U·2 evidencia contradictoria. — intersección y contradicción, prioridad documentada; 05ddcae7 / ae545f6393872e6659925e66cd191aa58e4cfbc2
- [x] U·3 rutas S/alpha/IIC. — rangos y estados; intervalo A confirmado; 05ddcae7 / ae545f6393872e6659925e66cd191aa58e4cfbc2
- [x] U·4 declaraciones/robustez con separación de protocolos. — extensión continua RESERVADA, sin equiparar muestras a cobertura global.
- [x] Tests universales. — work04-universal, 05ddcae7 / ae545f6393872e6659925e66cd191aa58e4cfbc2

## Fase 3 — Capítulos 1–78

- [ ] Revisar/compilar capítulos 1–78.
- [ ] Extraer escalas de evidencia.
- [ ] Extraer preguntas/observables.
- [ ] Extraer reglas S/alpha/IIC.
- [ ] Extraer operadores/condiciones especiales.
- [ ] Clasificar valores candidatos/ilustrativos/históricos.
- [ ] Cero capítulos SIN_REVISAR.
- [ ] Tests de cobertura total.

## Fase 4 — Fraude annona

- [x] Retirar reserva del operador. — 8d9c4cb9d8984e985f7fe1962e3ffab2e4c6938f, pruebas locales y build.
- [x] Implementar R*(1-alpha)*(1-IIC). — 8d9c4cb9d8984e985f7fe1962e3ffab2e4c6938f, pruebas locales y build.
- [x] Exigir rol de diseño explícito. — 8d9c4cb9d8984e985f7fe1962e3ffab2e4c6938f, pruebas locales y build.
- [x] Exigir variante IIC identificada. — 8d9c4cb9d8984e985f7fe1962e3ffab2e4c6938f, pruebas locales y build.
- [x] No usar Delta*(1-IIC) como equivalencia. — 8d9c4cb9d8984e985f7fe1962e3ffab2e4c6938f, pruebas locales y build.
- [x] No universalizar umbral 0.20. — 8d9c4cb9d8984e985f7fe1962e3ffab2e4c6938f, pruebas locales y build.
- [x] Añadir casos canónicos y límites. — 8d9c4cb9d8984e985f7fe1962e3ffab2e4c6938f, pruebas locales y build.
- [ ] Actualizar repertorio.

## Fase 5 — UI taxonómica dinámica

- [ ] Selector dominio/protocolo.
- [ ] Campos desde protocolo.
- [ ] Estados epistemológicos visibles.
- [ ] Sugerencias requieren confirmación.
- [ ] Linter consume protocolo efectivo.
- [ ] Snapshot/expediente conserva source/version.
- [ ] Cambiar protocolo sin editar JSX.

## Fase 6 — Integración y producción

- [ ] npm ci.
- [ ] npm test.
- [ ] npm run build.
- [ ] Playwright flujo completo.
- [ ] Pruebas adversas.
- [ ] Deployment producción exacta.
- [ ] Recorrido real.

## Productos finales

- [ ] MATRIZ_COBERTURA_TAXONOMIA.md.
- [ ] CATALOGO_TAXONOMIA_COMPUTABLE.md.
- [ ] AUDITORIA_ACEPTACION_TAXONOMIA_COMPUTABLE.md.
- [ ] Actualizar MAPA_MAESTRO_METROLOGIA_CAUSAL.md.
- [ ] Actualizar REPERTORIO_POST_CORRECCION.md.
- [ ] Cerrar tablero.

## Decisiones pendientes

Ninguna al inicio.

## Historial de commits

- `168144596333a49c25a200d38d3ed6e06fd63c2c` — preparación; base aplicación 280ef549, fuente Paradigma e7c7b06e, 82 blobs exactos. No equivale a revisión/compilación.


- `05ddcae7b6328cf7087e01957d3a3b5cf1571323` — schema y extracción Universal; 80/80 pruebas locales. Loader/UI y cobertura de dominio todavía pendientes. U·4: el continuo exige extensión; no se equiparan muestras con cobertura global.

- `8d9c4cb9d8984e985f7fe1962e3ffab2e4c6938f` — Fraude annona, motor/UI/adaptador/Playwright; 82/82 pruebas locales y build correcto. CI y producción pendientes de lectura, sin aceptación final.

- `ae545f6393872e6659925e66cd191aa58e4cfbc2` — primer overlay penal/civil, herencia Universal, loader, fuentes visibles, confirmación S, linter y prueba real de catálogo UI. 84/84 pruebas locales y build. Cobertura estricta debe fallar mientras falten capítulos: 77 dominios siguen SIN_REVISAR.
