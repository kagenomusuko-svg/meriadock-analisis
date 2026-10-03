# Auditoría de aceptación Work04 — Taxonomía computable

**Conclusión: ACEPTADA CON RESERVAS EXPLÍCITAS.** Los 82 capítulos numéricos y U·1–U·4 tienen protocolos declarativos versionados, trazabilidad al blob fuente, revisión doctrinal y entrada en el registro. No queda ningún capítulo `SIN_REVISAR`. La única reserva doctrinal abierta es `cap02.alpha.1`, aislada y sin efecto computacional.

## Cobertura y contrato

Fuente Paradigma: `e7c7b06eebd56e412a8b27f3c58747af2d1e531c`. El inventario conserva los 82 blobs exactos. El schema `taxonomia/1` exige `sourceRef` con repositorio, commit, ruta, blobSHA, capítulo, sección, regla y estado. El loader fusiona los cuatro protocolos universales con los 78 overlays de capítulo y rechaza versiones o dominios incompatibles.

Los overlays contienen 1.094 reglas: CANONICO 82, DERIVADO 666, PROPUESTA_PENDIENTE_CALIBRACION 203, ILUSTRATIVO 50, HISTORICO 47, NO_COMPUTABLE 43 y RESERVADO 3. La clasificación conserva la diferencia entre orientación, documentación, validación, sugerencia y reserva; ninguna propuesta pendiente se ejecuta sin confirmación.

Cada capítulo fue revisado para extraer escalas/rangos disponibles, preguntas, observables, reglas de S, α e IIC, operadores, condiciones especiales y valores ilustrativos o pendientes. La matriz registra el resultado por capítulo y el catálogo expone el registro efectivo a la UI dinámica.

## Fraude annona

La fórmula activa es `R*(1-α)*(1-IIC)`, con `R*`, α e IIC del diseñador explícito, rol/ID activos y variante IIC compatible. Los casos canónicos `.6/.1/.2=.432`, `.6/.6/.2=.192` y `.6/.1/.8=.108` están cubiertos por regresión y por la verificación HTTP/UI. Datos ausentes, no finitos, fuera de rango o sin variante efectiva no producen una cifra espuria.

## Reserva doctrinal

`DECISION_PENDIENTE_TAX_ALPHA_NOMINAL_WORK04.md` conserva únicamente la tensión de capítulo 2 entre la prohibición de inferir α nominal desde comunicados sin acciones y su tabla ilustrativa `.06–.20`. `cap02.alpha.1` permanece `RESERVADO`; no bloquea ningún otro capítulo ni activa una regla computacional. U·4 mantiene separada la extensión continua reservada de la robustez de tres escenarios.

## Verificación

- `node scripts/verificar-taxonomia.cjs`: 82 capítulos trazables, sin `SIN_REVISAR`.
- `npm test`: 90/90 pruebas.
- `npm run build`: correcto.
- `scripts/verificar-ui.cjs`: cubre selector de catálogo, orientación dinámica, confirmación de S, casos Fraude annona, snapshot y expediente.
- CI 37094194998 terminó SUCCESS en `verificar` para `7375dedc`. El primer commit usó un prefijo distinto al trigger histórico y su job `produccion` fue omitido; se dispara una segunda corrida con prefijo `acceptance:` para cotejar el SHA exacto, Vercel, UI/API/snapshot/HTML y artifact persistente.

## Dictamen

Work04 queda cerrado con la reserva `cap02.alpha.1` y la extensión continua U·4 documentadas. Las invariantes del núcleo permanecen intactas: los overlays sólo aportan orientación declarativa, no sustituyen fórmulas ni convierten ejemplos históricos en cálculo.
