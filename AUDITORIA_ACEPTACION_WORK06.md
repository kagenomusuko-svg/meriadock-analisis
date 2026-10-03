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
- CI verificadora **37099804711** sobre `6b3ada476625cedce53bab46c97a787fe52bd728`: `verificar` SUCCESS (tests, build y Playwright), incluyendo confirmación visible de rangos provisionales.
- Artefacto CI: **11265920350**, SHA-256 `4a0ca0d2c0353907a65e729ee47b18b0bfd60ed55ab761da07f3fe7c15e8753f`.
- Producción del runtime aceptado **a4a735c8254fba1807ed95a9e82e8baeccae9b90**: Vercel deployment READY y endpoint `/api/calcular` HTTP 200; la respuesta conserva `snapshot.revisionFuente=a4a735c...`. Los commits de documentación/marcador `17807e0...`/`6b3ada4...` no generan una nueva deployment en el proyecto conectado, sin cambio semántico del runtime.
- Reintentos de aceptación de producción 37099315801 y 37099804711: `verificar` SUCCESS; el job de producción no pudo observar una revisión documental distinta porque Vercel no la publicó.
