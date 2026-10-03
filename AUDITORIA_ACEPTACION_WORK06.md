# Auditoría de aceptación Work06 — Parametrización provisional

**Estado inicial:** Work05 aceptado con reservas concretas. `cap02.alpha.1` permanece fuera del alcance.

## Dictamen técnico

Work06 implementa el ciclo pre-calibración sin confundir medición condicional con calibración empírica. Las 203 reglas pendientes de calibración quedaron clasificadas y trazables; ninguna recibe un default silencioso.

## Cobertura

- Reglas clasificadas: **203/203**.
- Rangos provisionales utilizables: **119**.
- Coeficientes/tablas provisionales: **1**.
- Orientaciones no numéricas: **56**.
- No operacionalizadas: **27**.
- Reservas OP13/14/24/25/32 reevaluadas con estados diferenciados.

## Integración

- `dist-motor/calibracion.js` contiene estados, catálogo, validación, sensibilidad y observaciones.
- `/api/calibracion` publica catálogo y circuito exportable.
- `entrada.js` conserva estado, parámetros, fuente, versión y sensibilidad en resultado, auditoría y snapshot.
- El expediente distingue `PARAMETRIZADO_PROVISIONALMENTE` de `CALIBRADO`/`VALIDADO_EXTERNAMENTE`.
- La UI informa el circuito sin aplicar sugerencias automáticamente.

## Criterio epistemológico

La medición provisional es condicional a los parámetros declarados. La ausencia de parámetro no se convierte en cero; la ausencia de fórmula no se convierte en un operador.

## Verificación

- Pruebas locales: **97/97**.
- CI verificadora **37099090843** sobre `a4a735c8254fba1807ed95a9e82e8baeccae9b90`: `verificar` SUCCESS (tests, build y Playwright), incluyendo confirmación visible de rangos provisionales.
- Artefacto CI: **11265392393**, SHA-256 `f7fa3c3f9a06ab5304023e2ab27cdd3ef5e3a1da237a70227b9e68361b3ea48f`.
- Producción exacta final: pendiente del commit `acceptance:` que sigue.
