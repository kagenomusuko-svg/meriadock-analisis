# Meriadock — Calculador de Metrología causal

Humano discrimina → programa orienta y valida → motor calcula → expediente explicita.

Aplicación Next.js con acceso directo a `/constructor`. No necesita login, Supabase, API keys ni modelos generativos. El texto libre permanece descriptivo; no se interpreta automáticamente.

## Verificación

```sh
npm ci
npm test
npm run build
npx playwright install --with-deps chromium
npm run test:ui
```

GitHub Actions ejecuta instalación limpia, pruebas canónicas, build con lint y tipos y el recorrido en navegador hasta descargar el expediente. `npm run dev` inicia desarrollo.

## Contrato

`POST /api/calcular` recibe `analisis`, `medicionesSolicitadas`, `insumos` y `configuracion`. Los operadores solicitados resuelven sus dependencias; los demás no son obligatorios. Los faltantes no se sustituyen por cero.

D se almacena en `eventoDeterminado`; `nodosActivos` y `relacionesInternas` construyen W, y `conexionesCierre` conservan aportes descriptivos hacia D. Convención: W_ij = w(N_i → N_j), eigenvector derecho W R* = ρR*, norma L1.

R* calcula escenarios mínimo, central y máximo por iteración de potencia sparse. El resultado incluye diagnósticos, error, residuo, eigenvalor, matrices separadas y rondas adaptativas. La regularización requiere ε y K explícitos. No hay normalización por origen/destino ni fallback uniforme.

S agrega componentes discriminados. α requiere estrategia explícita. IIC, B*, daño y AD conservan insumos y unidades. Robustez usa el árbol de tres escenarios. La sensibilidad extendida requiere método explícito.

`/api/expediente` y `/api/narrativa` reciben el mismo objeto `resultado` calculado. El expediente muestra la auditoría del motor sin reconstruir W; la narrativa usa plantillas deterministas. El constructor invalida resultados al editar entradas.

`taxonomia/protocolos.js` ofrece contrato, registry, versiones y cargador JSON. El protocolo genérico sólo contiene los componentes S autorizados. Las escalas históricas permanecen en `dist-motor/escalas.js`, marcadas legacy y sin imports en el núcleo.

## Gobierno

- `ESTADO_IMPLEMENTACION.md`: tablero y último punto seguro.
- `ORDEN_WORK_01_EJECUCION_AUTONOMA.md`: mandato.
- `INSTRUCCIONES_WORK_IMPLEMENTACION_METROLOGIA_CAUSAL.md` y `AUDITORIA_DEUDAS_IMPLEMENTACION.md`: fuentes de implementación.
- `LIMITES_TECNICOS.md`: presupuestos y evidencia de verificación.
- `DECISION_PENDIENTE_EMPATES_ROBUSTEZ.md`: decisión del autor que queda abierta.
