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
- CI verificadora **37098702607** sobre `f0c2c11b7d8d5be64acad28d2f78b616ec08d581`: `verificar` SUCCESS (tests, build y Playwright).
- Artefacto CI: **11265381772**, SHA-256 `fe89279c1e66702dc9079242cd5b0fed11a1ad31911f8df5d1eecc3775e3620e`.
- CI de aceptación **37098820658** sobre `a05598c7d37cbbad5c5a24be5d7c998748605528`: `verificar` y `produccion` SUCCESS.
- Producción sirvió exactamente `revisionFuente=a05598c7d37cbbad5c5a24be5d7c998748605528`; Playwright remoto SUCCESS.
- Artefactos finales: `11264594119` (`verificacion-interfaz`, SHA-256 `9362423d734ca02e9c975b291f22cc197b747a26f78b4bbf5ef2c0f06c72bfab`) y `11264689196` (`reaceptacion-produccion`, SHA-256 `f7e1bfc3d6fc223cea2a81950b95ea720aa6c9dd91519241b66dd45546283bf2`).
