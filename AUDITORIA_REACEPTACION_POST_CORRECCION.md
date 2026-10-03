# Reauditoría de aceptación posterior a Work03

**Conclusión: ACEPTADO_CON_RESERVAS.** Se cierran las correcciones autorizadas AU-01–AU-18. No queda P0/P1 de la auditoría abierto ni decisión doctrinal nueva obligatoria. La reserva de Fraude annona, los protocolos de dominio no definidos y el repertorio conceptual permanecen explícitos, conforme a la orden; no se certifican como algoritmos terminados.

Fecha de verificación: 2026-10-03 UTC. Base correctiva: c19186e7fb3d5d1498946eede9328d17fc0b3fef. Último cambio de runtime: f49f69921de96a4a9be5771e92c9068fea077fba. Revisión exacta ejecutada en producción y CI: 7aa0937827ad90fc894bb6c39fc42b28e380b435 (amplía pruebas, mismo runtime).

## Alcance y criterio

Se repitieron los casos que provocaban los hallazgos, las regresiones correspondientes y el circuito UI → API → motor → resultados → expediente/JSON. La revisión histórica Work02 se conserva; este documento no intenta repetir todo el corpus ni dar por validadas sus calibraciones. La matriz vigente hallazgo → cambio → test → SHA → estado es MATRIZ_CORRECCION_POST_AUDITORIA.md. REPERTORIO_POST_CORRECCION.md clasifica los 45 registros y explicita contratos y reservas.

## Verificación por bloque

| Fase | Commit funcional y correcciones de prueba | Suite local | CI navegador/build |
|---|---|---|---|
| 1 | 4de8688a1a6ec5e9b100a316a8a0ae7b22292fe1 | npm ci, 56 pruebas, build | [37079739386 SUCCESS](https://github.com/kagenomusuko-svg/meriadock-analisis/actions/runs/37079739386) |
| 2 | 6688263bdf2a9f212f870fbeccd60e7460021d86 | npm ci, 62 pruebas, build | [37080135282 SUCCESS](https://github.com/kagenomusuko-svg/meriadock-analisis/actions/runs/37080135282) |
| 3 | 7abc8ff76f20dd4701ed128f510f628fa4cdd260; selectores corregidos en 348de91c/9430acf2 | npm ci, 65 pruebas, build | [37081467948 SUCCESS](https://github.com/kagenomusuko-svg/meriadock-analisis/actions/runs/37081467948) |
| 4 | 77e043741ca3278dad7eee976e81cde9e68f0c57 | npm ci, 75 pruebas, build | [37081724786 SUCCESS](https://github.com/kagenomusuko-svg/meriadock-analisis/actions/runs/37081724786) |
| 5 y aceptación | f49f6992 + 7aa09378 | npm ci, 75 pruebas, build | [37082233427 SUCCESS](https://github.com/kagenomusuko-svg/meriadock-analisis/actions/runs/37082233427): jobs verificar y produccion, todos los pasos SUCCESS |

Los CI de 7abc8ff7 y 348de91c fallaron por selectores de test ambiguos (alerta del anunciador Next y botón de cálculo/navegación), corregidos sin quitar aserciones. La ejecución local del navegador no se considera verde: Chromium no estaba instalado en este entorno; CI instaló Chromium y ejecutó Playwright real por fase. Artifacts de las cinco fases y producción fueron descargados y revisados; no se equipara build/READY a aceptación.

## Hallazgos e invariantes

AU-01/02/03: niveles −1/9/fraccionarios, rangos negativos/no ordenados/no finitos, referencias/IDs/pares duplicados se rechazan o registran error. Cierre E0/faltante no acredita; un cierre válido sigue siendo declaración humana, no verificación documental. D nunca ocupa coordenada W/R*. La UI conserva borrador ante duplicado/rango/ID inválido, permite corregir sin recargar y enfoca incluso el mismo error repetido.

AU-04/05/06/09/10/11/12/15: B* preserva total, unidad, beneficios netos y cuotas; signed autorizados se mantienen. Sumas extremas, cancelaciones y subnormales se prueban; resultados no representables se indeterminan o producen error explícito, nunca calculado con Infinity/NaN. El snapshot conserva solicitud original relevante, estructura efectiva, insumos externos, configuración/epsilon/K, faltantes, versiones y SHA. Se reconstruyen exactamente todos los resultados y escenarios desde el snapshot serializado, también por HTTP en producción. El linter ve los mismos alpha externos/estrategias efectivas. Grafo inválido/operador desconocido no bloquean daño y beneficio independientes. Los cinco estados son explícitos. rho no convergente se etiqueta estimación, con eigenvalor validado null y residuo; sensibilidad incompleta conserva fallos y motivos y no se presenta calculada.

AU-07/08/18: protocolo versionado realmente resuelto, dominio compatible, versiones desconocidas rechazadas, estrategias autorizadas aplicadas, versión efectiva en auditoría/HTML. Un protocolo alternativo de regresión modifica preguntas/componentes desde datos, sin cambiar JSX ni PF. El fixture de interfaz sólo simula el catálogo; el test de motor registra/aplica el protocolo. No se publica una calibración sectorial ficticia. Genérico/piloto, IIC de congruencia y reservas se muestran explícitos. aria-current, aria-live, foco y recorrido por Enter están verificados; labels usados por Playwright. Contraste calculado en nueve elementos de navegación/header: mínimo 6.479641864498782:1. No certificación WCAG, lector de pantalla completo ni contraste integral de todas las variantes de UI/HTML.

AU-13/14/16/17: Fraude annona sólo devuelve reserva CON/TAX, incluso ante una función externa; el producto histórico está en legacy sin imports activos. Robustez usa grupos/preórdenes de empate y queda indeterminada si el protocolo no adjudica el empate: seis permutaciones verificadas por HTTP en producción, sin desempate por ID/posición. Frontera de 10 puntos conserva >.10. escalas/espacio y fraude histórico están archivados, la ruta hello retirada y HTTP404; búsqueda de imports y build no señalan referencias activas. Repertorio: 20 entradas de REGISTRY, 19 contratos ejecutables condicionalmente a sus insumos y una reserva. Los 45 grupos quedan clasificados; no se implementan conjeturas ni protocolos no definidos.

Invariantes centrales intactas: PF derecho W_ij=w(origen→destino), WR*=rhoR*, L1 y sparse; pesos empíricos sin normalización por filas; W_E separado de W_epsilon; epsilon no evidencia; ausencia distinta de cero; S discriminado, sin inferencia topológica; R*_neta=R*(1−S); alpha asunción efectiva, no conteo documental; Delta=R*−alpha signed; AD usa R* bruto; familias no restringen operadores; expediente consume el resultado sin recalcular; núcleo sin LLM/Supabase/secretos.

## I_inv y MAT

I_inv está implementado conforme a RESOLUCION_AUDITORIA_I_INV.md: abs(Delta diseñador)/abs(Delta ejecutor), roles/IDs explícitos, signos originales auditables, cero/0–0 indeterminados sin epsilon. .10/.56≈.178571, .6/.3=2 y .6/.4=1.5; inversión de roles auditable. La UI muestra “Índice de inversión” y “Brecha del diseñador por unidad de exceso del ejecutor”. Producción reproduce .178571 con signos .10/−.56 y el expediente los conserva.

También se incorporan Shapley exacto con juego completo y unidad, conversión vital con referencia explícita, J sin clamp (puede ser negativo), IAS y V con universo/IDs/referencias comparables, Delta_B absoluta conforme a RES-DELTAB, y ROI neto con DeltaP externo/base declarada. Tests canónicos y límites de cada contrato están en correccion-fase4.test.cjs. Shapley Chevron conserva la aritmética exacta y la errata histórica diferenciadas. ROI neto del plan/inventario/Calculo9 se distingue del retorno bruto de ApA; no hay modelo predictivo ni descuento automático. No se modifica Paradigma/ideas ni se elige PF/Shapley por conjetura.

## Producción y evidencia

- [Aplicación](https://meriadock-analisis.vercel.app/constructor).
- Deployment dpl_JEAzkGf5cwBXS7Vop66ZCRD9JeYS: target production, READY, commit 7aa0937827ad90fc894bb6c39fc42b28e380b435. [Inspección Vercel](https://vercel.com/hilario-olveras-projects/meriadock-analisis/JEAzkGf5cwBXS7Vop66ZCRD9JeYS).
- El job de producción espera y compara snapshot.revisionFuente con GITHUB_SHA exacto. No usa sólo el alias ni READY como prueba de equivalencia.
- Recorrido de ocho pantallas, discriminaciones y medidas; API: R*=(.8,.2), IIC=.5, Btotal40 MXN, cuotas .75/.25, Dtotal150, AD120/30, I_inv≈.178571, Shapley juego de dos nodos y J. Descarga HTML inspeccionada con monto, signos y snapshot.
- Adversos de producción: duplicado/rango/ID en UI; E0 y niveles/rangos de cierre inválidos; overflow B*/daño; grafo inválido y daño independiente; versión desconocida400; I_inv denominador cero; reconstrucción exacta del snapshot; alpha externo/linter; rho1.5 estimado/residuo.5; hipercubo4/3fallidas; seis permutaciones de empate; cinco estados; hello404.
- Sin pageerror en el recorrido Playwright. Consulta Vercel get_runtime_errors posterior devuelve “No runtime errors found in the selected time range”; alcance limitado a esa consulta, no ausencia universal de errores.
- [Artifact producción](https://github.com/kagenomusuko-svg/meriadock-analisis/actions/runs/37082233427/artifacts/11258603107) y [artifact CI](https://github.com/kagenomusuko-svg/meriadock-analisis/actions/runs/37082233427/artifacts/11259272903). Se descargaron/revisaron las capturas y JSON de evidencia. Resumen persistente, snapshot original, contratos resultantes y hash del JSON completo: correccion/evidencia/reaceptacion-produccion.json.

## Reservas aceptadas

1. Fraude annona y constructos TAX/CON/HIST/FUERA siguen reservados o fuera de alcance según la orden. La clasificación no promete todos los operadores del corpus ni toda la Taxonomía computabilizada.
2. S genérico y el IIC aplicado son pilotos/operacionalizaciones delimitadas. La aplicación no valida empíricamente grafo, evidencia, DeltaP, valores coalicionales o comparabilidad declarados.
3. Garantías PF dependen de la matriz y configuración; la convergencia particular no certifica primitividad universal. Presupuestos de cálculo/presentación son límites técnicos explícitos, no límites conceptuales.
4. Accesibilidad y mediciones de contraste son parciales; no se declaran certificaciones ni SLA/rendimiento de producción para redes arbitrarias.

Estas reservas no dejan una corrección autorizada pendiente ni requieren una decisión doctrinal para cerrar Work03. Tablero cerrado; una ampliación futura debe leer el mapa maestro y conservar las fronteras anteriores.
