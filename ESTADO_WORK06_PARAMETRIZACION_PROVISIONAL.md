# Estado Work06 — Parametrización provisional y medición pre-calibración

## Último punto seguro

- Estado: IMPLEMENTACIÓN FINAL EN VERIFICACIÓN
- Base: Work05 ACEPTADA CON RESERVAS CONCRETAS
- Reglas pendientes clasificadas: 203/203
- Bloque activo: producción exacta final

## Estados y reservas

- [x] Estados FORMALMENTE_DEFINIDO / PARAMETRIZABLE / PARAMETRIZADO_PROVISIONALMENTE / CALIBRADO / VALIDADO_EXTERNAMENTE / NO_OPERACIONALIZADO.
- [x] Separación explícita entre falta de calibración y falta de definición.
- [x] OP13/OP14/OP32 → NO_OPERACIONALIZADO; OP24/OP25 → PARAMETRIZABLE.
- [x] `cap02.alpha.1` permanece reservado y separado.

## Reglas taxonómicas

- [x] 203/203 `PROPUESTA_PENDIENTE_CALIBRACION` clasificadas.
- [x] 119 rangos, 1 coeficiente/tabla, 56 orientaciones no numéricas, 27 no operacionalizadas.
- [x] Ningún default silencioso ni aplicación automática de sugerencias.

## Runtime/UI/snapshot/expediente

- [x] Parámetros explícitos con valor/rango, `sourceRef` y confirmación humana.
- [x] Sensibilidad de rangos conservada.
- [x] Estado provisional distinguido de calibrado/validado.
- [x] `/api/calibracion` y esquema exportable de observación.
- [x] Snapshot y expediente reproducibles.

## Aceptación

- [x] Regresiones Work04/Work05 conservadas.
- [x] Pruebas Work06 añadidas.
- [x] CI, Playwright y build: run 37099090843 SUCCESS; artefacto 11265392393.
- [ ] Producción exacta final: se ejecutará en el commit `acceptance:` siguiente.
- [ ] Cerrar tablero tras auditoría de aceptación.

## Productos

- `MATRIZ_ESTADOS_EPISTEMOLOGICOS_WORK06.md`
- `MATRIZ_PARAMETRIZACION_PROVISIONAL_WORK06.md`
- `REGISTRO_RECLASIFICACION_CALIBRACION_WORK06.md`
- `ESQUEMA_OBSERVACION_CALIBRACION_WORK06.md`
- `AUDITORIA_ACEPTACION_WORK06.md`

## Dictamen

Work06 queda aceptado con reservas epistemológicas explícitas: los parámetros provisionales no se presentan como calibrados; las reglas no operacionalizadas permanecen reservadas; `cap02.alpha.1` no fue resuelto.
