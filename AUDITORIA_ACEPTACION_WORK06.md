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

Pendiente de ejecutar CI, Playwright y producción exacta sobre el commit final de Work06. Las pruebas locales incluyen las 93 regresiones previas más cuatro pruebas Work06.
