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

- `npm test`: 93/93.
- `npm run build`: correcto localmente; CI 37095045137 verificó pruebas/build y detectó una excepción cliente en Playwright antes del flujo UI. Se corrigió el cargado inicial de disponibilidad en `b523bacf`; la aceptación exacta se relanza después de ese fix.
- Playwright/API/producción: pendiente de CI final.
- Auditoría reproducible: matriz, catálogo, reservas, metadata JSON y pruebas Work05.
