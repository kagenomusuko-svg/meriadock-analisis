# Auditoría de aceptación Work05 — Operadores taxonómicos

**Dictamen: ACEPTADA CON RESERVAS CONCRETAS.** Los 45 registros OP01–OP45 fueron reevaluados contra los 78 overlays y U·1–U·4 de Work04. No queda `SIN_REVISAR`; se activaron sólo contratos que satisfacen el criterio de suficiencia.

## Resultado

- Operadores reevaluados: **45/45**.
- Activos y conectados al registro: **20**.
- Suficiencia taxonómica sin fórmula nueva: **1** (`OP26`).
- Pendientes de calibración: **5**.
- Decisiones doctrinales requeridas: **10**.
- Conceptuales: **2**.
- Fuera del calculador: **7**.

Los activos son OP01–OP12, OP16, OP19–OP21, OP27, OP29 y OP41–OP42. El runtime ya contenía sus contratos deterministas; Work05 los formaliza en el catálogo, los valida contra los 45 registros y los expone con estado y procedencia.

## Integración

- `dist-motor/operadores-taxonomicos.json` contiene la matriz de disponibilidad y procedencia.
- `pages/api/operadores.js` publica los 45 estados.
- La UI muestra cada operador, su estado y causa; sólo activos con registro pueden seleccionarse.
- El resultado, snapshot y expediente conservan `operadoresDisponibles` junto con protocolo y versión taxonómica.
- Los activos avanzados conservan ausencia como indeterminación, unidades explícitas, ceros declarados y casos límite.

## Reservas

OP13–OP15, OP17–OP18, OP22–OP25, OP32, OP34–OP35, OP39–OP40 y OP45 no se convirtieron en fórmulas por faltar calibración, función contrafactual, tipado de grafo, regla de reasignación o decisión doctrinal. OP28/30/31/33/36/43/44 quedan fuera del calculador general; OP37/38 conceptuales. Cada causa y requisito está en `REGISTRO_RESERVAS_POST_WORK05.md`.

`cap02.alpha.1` continúa reservado y no bloquea Work05. U·4 continuo sigue separado de robustez finita.

## Verificación

- `npm test`: **93/93**.
- `npm run build`: correcto localmente.
- CI verificadora **37096386751** sobre `2b92ce87edd023b0a303d7dca1e9857f0d16a1c5`: `verificar` **SUCCESS** (tests, build y Playwright).
- Artefacto Playwright: **11263938503** (`verificacion-interfaz`), SHA-256 `ae42d89bcd0ce07c3a2c30b7048963b5af0750a81e8b0dff7603d1770e87a083`.
- La corrección `26e6be4` eliminó referencias de estilo fuera de ámbito; `2b92ce8` conservó los nombres accesibles canónicos de OP.
- CI de aceptación **37096542768** sobre `304d03892edb0b7b848518f13599a893252aa83e`: `verificar` y `produccion` **SUCCESS**.
- Producción sirvió exactamente `revisionFuente=304d03892edb0b7b848518f13599a893252aa83e`; Playwright remoto pasó contra `https://meriadock-analisis.vercel.app`.
- Artefactos finales: `11264133252` (`verificacion-interfaz`, SHA-256 `64fda40f6420e281728301c820d535499099283794ad4a4f94e74fb6f03233e1`) y `11263938847` (`reaceptacion-produccion`, SHA-256 `654891112e0c5c1ef4ff9ed3cb85d8b16001fa0bc6d93c7f534f1fc556b46bb4`).
- Auditoría reproducible: matriz, catálogo, reservas, metadata JSON y pruebas Work05.
