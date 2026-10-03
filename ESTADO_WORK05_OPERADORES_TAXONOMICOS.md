# Estado Work05 — Operadores taxonómicos

## Último punto seguro

- Estado: IMPLEMENTACIÓN Y AUDITORÍA EN CURSO
- Base: Work04 ACEPTADA CON RESERVAS EXPLÍCITAS
- Cobertura: 45/45 operadores reevaluados
- Activos: 20; reservas concretas: 25
- Bloque activo: CI, producción y auditoría final

## Fase 1 — Matriz de suficiencia

- [x] Revisar OP01–OP45.
- [x] Identificar protocolos relevantes.
- [x] Clasificar estados de suficiencia.
- [x] Cero SIN_REVISAR.
- [x] Crear MATRIZ_SUFICIENCIA_OPERADORES_WORK05.md.

## Fase 2 — Operadores prioritarios

- [x] OP13 Recurrencia — REQUIERE_CALIBRACION.
- [x] OP14 Exposición — REQUIERE_CALIBRACION.
- [x] OP15 Intervención/prevención — REQUIERE_DECISION.
- [x] OP17 Instrumentalidad/reasignación R*_efectivo — REQUIERE_DECISION.
- [x] OP18 R*_B — convergencia causal de beneficio — REQUIERE_DECISION.
- [x] OP22 Impunidad del diseñador I_d — REQUIERE_DECISION.
- [x] OP23 Herencia H — REQUIERE_DECISION.
- [x] OP24 Opacidad — REQUIERE_CALIBRACION.
- [x] OP25 Probabilidad sectorial — REQUIERE_CALIBRACION.
- [x] OP26 Aliases sectoriales ICRS/INCF/ICA — TAXONOMIA_SUFICIENTE.
- [x] OP32 Shapley deportivo / S_B — REQUIERE_CALIBRACION.
- [x] OP34 Contrafactual/ablación/bifurcación — REQUIERE_DECISION.
- [x] OP35 S_prob / S_op / S_est — REQUIERE_DECISION.
- [x] OP39 Δ_neto / Δ_idiosincrático — REQUIERE_DECISION.
- [x] OP40 β / reconocimiento / tributo — REQUIERE_DECISION.
- [x] OP45 Contribución contrafactual R−R_ablación — REQUIERE_DECISION.

## Fase 3 — Implementación autorizable

- [x] Formalizar 20 operadores activos en catálogo/registro.
- [x] Conectar REGISTRY/UI/API/snapshot/expediente.
- [x] Añadir tests canónicos, adversos, trazabilidad y disponibilidad.

## Fase 4 — Reservas

- [x] Mantener `cap02.alpha.1` reservado.
- [x] Evaluar U·4 continuo como reserva matemática.
- [x] Registrar calibraciones y decisiones faltantes.
- [x] Crear REGISTRO_RESERVAS_POST_WORK05.md.

## Fase 5 — UI de disponibilidad

- [x] Mostrar estado por operador.
- [x] Mostrar inputs y causa de reserva.
- [x] Mostrar protocolo efectivo.
- [x] No bloquear por familia.
- [x] No ocultar operadores; sólo deshabilitar selección de no activos.

## Fase 6 — aceptación

- [x] `npm ci` / `npm test` local: 93/93.
- [x] `npm run build` local.
- [ ] Playwright y producción exacta: CI 37095045137 detectó excepción cliente; fixes b523bacf y 580de8c publicados, aceptación en relanzamiento con diagnóstico explícito de Playwright.
- [x] Crear catálogo, auditoría y matriz.
- [x] Actualizar mapa maestro y repertorio.
- [ ] Cerrar tablero: requiere CI/producción final.

## Decisiones pendientes

- `cap02.alpha.1` — α nominal laboral sin acciones; no bloquea Work05.
- Reservas OP17/18/22/23/34/35/39/40/45: no bloquean contratos independientes.

## Historial

- Inicio Work05: Work04 82/82 y 1.094 reglas.
- Implementación Work05: metadata OP01–OP45, API/UI de disponibilidad, propagación a snapshot/expediente, 3 pruebas nuevas.
