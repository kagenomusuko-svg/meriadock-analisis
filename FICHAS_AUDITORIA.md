# Fichas individuales de auditoría

Cada ficha explicita los campos exigidos por orden02§5. Complementa, no reemplaza, informes con reproducción numérica y fuentes fijadas. Para objetos no programables no se inventan precondiciones universales ni outputs de un operador inexistente. «No observado» significa ausencia comprobada en REGISTRY, no revisión pendiente.

## OP01 — OP01 R* / orden02 §4, Metrología I II·5, VolII Paso1

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP01 R* / orden02 §4, Metrología I II·5, VolII Paso1 |
| Definición doctrinal | W activo, PF derecho L1; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | orden02 §4, Metrología I II·5, VolII Paso1; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | WR=ρR; ΣR=1, potencia/residuo; W_ij=i→j; D externo |
| Dominio | actual; AU-01/02; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | W activo, PF derecho L1; magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | W activo, PF derecho L1 |
| Outputs | WR=ρR; ΣR=1, potencia/residuo; W_ij=i→j; D externo; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/r_estrella.js/grafo.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | CONFORME_CON_RESERVA |
| Severidad | P1 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP02 — OP02 S / §12, Axiom§3, Prometeo2.3

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP02 S / §12, Axiom§3, Prometeo2.3 |
| Definición doctrinal | componentes/pesos discriminados; no topología automática; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | §12, Axiom§3, Prometeo2.3; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | piloto Σp_k s_k/Σp_k, tres componentes declarados; p_k≥0; no fórmula universal adjudicada |
| Dominio | TAX/CON para constructo universal; AU-08; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | componentes/pesos discriminados; no topología automática; magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | componentes/pesos discriminados; no topología automática |
| Outputs | piloto Σp_k s_k/Σp_k, tres componentes declarados; p_k≥0; no fórmula universal adjudicada; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/sustituibilidad.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | CONFORME_CON_RESERVA |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP03 — OP03 R*_neta / §13

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP03 R*_neta / §13 |
| Definición doctrinal | R*(1−S); objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | §13; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | R*(1−S) |
| Dominio | actual; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | R*(1−S); magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | R*(1−S) |
| Outputs | R*(1−S); estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/derivados.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | CONFORME |
| Severidad | — (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP04 — OP04 α / §14, RES-ALPHA

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP04 α / §14, RES-ALPHA |
| Definición doctrinal | valor/proporción comparables; estrategia por dominio; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | §14, RES-ALPHA; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | valor discriminado [0,1], o min(1,montoAsumido/baseComparable); estrategia taxonómica reservada |
| Dominio | TAX, AU-07; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | valor/proporción comparables; estrategia por dominio; magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | valor/proporción comparables; estrategia por dominio |
| Outputs | valor discriminado [0,1], o min(1,montoAsumido/baseComparable); estrategia taxonómica reservada; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/alpha.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | PARCIAL |
| Severidad | P1 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP05 — OP05 Δ / §15, RES-DELTA

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP05 Δ / §15, RES-DELTA |
| Definición doctrinal | R*−α, signo; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | §15, RES-DELTA; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | R*−α sin clamp |
| Dominio | actual; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | R*−α, signo; magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | R*−α, signo |
| Outputs | R*−α sin clamp; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/delta.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | CONFORME |
| Severidad | — (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP06 — OP06 IIC / §17, VolII Paso3

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP06 IIC / §17, VolII Paso3 |
| Definición doctrinal | conteo actual; correlación histórica distinta; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | §17, VolII Paso3; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | coincidencias/observaciones comparables; IIC_cong∈[0,1]; no corr_stat signed |
| Dominio | HIST/TAX variante signed, AU-08; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | conteo actual; correlación histórica distinta; magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | conteo actual; correlación histórica distinta |
| Outputs | coincidencias/observaciones comparables; IIC_cong∈[0,1]; no corr_stat signed; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/iic.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | CONFORME_CON_RESERVA |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP07 — OP07 B* directo / §19, Prometeo2.3.2

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP07 B* directo / §19, Prometeo2.3.2 |
| Definición doctrinal | montos netos y unidad; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | §19, Prometeo2.3.2; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | B_i/ΣB, total distinto de cero; unidad común; signed si montos netos así declarados |
| Dominio | actual, AU-04/05; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | montos netos y unidad; magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | montos netos y unidad |
| Outputs | B_i/ΣB, total distinto de cero; unidad común; signed si montos netos así declarados; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/b_estrella.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | PARCIAL |
| Severidad | P1 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP08 — OP08 D_total / §20

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP08 D_total / §20 |
| Definición doctrinal | tres montos comparables, estimaciones declaradas; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | §20; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | T_invertido+T_impedido+ΔT_trayectoria; misma unidad |
| Dominio | actual, AU-04; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | tres montos comparables, estimaciones declaradas; magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | tres montos comparables, estimaciones declaradas |
| Outputs | T_invertido+T_impedido+ΔT_trayectoria; misma unidad; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/danio.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | PARCIAL |
| Severidad | P1 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP09 — OP09 AD / §21

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP09 AD / §21 |
| Definición doctrinal | R* bruto×D_total; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | §21; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | AD_i=R*_i D_total bruto |
| Dominio | actual; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | R* bruto×D_total; magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | R* bruto×D_total |
| Outputs | AD_i=R*_i D_total bruto; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/derivados.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | CONFORME_CON_RESERVA |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP10 — OP10 Robustez A–D / §11

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP10 Robustez A–D / §11 |
| Definición doctrinal | rankings tres escenarios estrictos; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | §11; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | A/B/C/D según rankings min/medio/max, empate principal indetermina, C brecha>.10 |
| Dominio | AU-14; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | rankings tres escenarios estrictos; magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | rankings tres escenarios estrictos |
| Outputs | A/B/C/D según rankings min/medio/max, empate principal indetermina, C brecha>.10; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/hipercubo.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | PARCIAL |
| Severidad | P1 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP11 — OP11 Sensibilidad / §11

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP11 Sensibilidad / §11 |
| Definición doctrinal | método/presupuesto explícitos, ε opcional; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | §11; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | hipercubo2^E o unaarista por vez, presupuesto explícito; no otra letra canónica |
| Dominio | AU-15; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | método/presupuesto explícitos, ε opcional; magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | método/presupuesto explícitos, ε opcional |
| Outputs | hipercubo2^E o unaarista por vez, presupuesto explícito; no otra letra canónica; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/hipercubo.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | CONFORME_CON_RESERVA |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP12 — OP12 Fraude annona / §18, MC I IV·4/C·7, II CorIII

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP12 Fraude annona / §18, MC I IV·4/C·7, II CorIII |
| Definición doctrinal | diseño/capacidad/intervención/prevenir; protocolo; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | §18, MC I IV·4/C·7, II CorIII; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | sin fórmula aplicada autorizada en runtime; legacy no canon |
| Dominio | CON/TAX; legacy HIST, AU-13 P2; no decisión actual; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | diseño/capacidad/intervención/prevenir; protocolo; magnitudes/IDs/unidades compatibles, ausencia no suplida; presupuesto/tolerancia y validación de modelo explícitos |
| Inputs | diseño/capacidad/intervención/prevenir; protocolo |
| Outputs | sin fórmula aplicada autorizada en runtime; legacy no canon; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | dist-motor/fraude_annona.js; orquestación series.js |
| Tests existentes | MATRIZ_COBERTURA_PRUEBAS y casos-fuente; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | MATRIZ_CASOS_CANONICOS.md y fixtures fuente/diferencial; detalle por operador en informe |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | Resultado y defectos reproducidos en informe especializado/MATRIZ_COBERTURA_PRUEBAS; 44 pruebas generales no certifican esta medida empíricamente |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP13 — OP13 Recurrencia / Calculo11§5.4 y Taxonomía compliance

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP13 Recurrencia / Calculo11§5.4 y Taxonomía compliance |
| Definición doctrinal | período, eventos, modelo de probabilidad/calibración; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo11§5.4 y Taxonomía compliance; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | período, eventos, modelo de probabilidad/calibración; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | CON/TAX, P2 AU-17; R* no frecuencia ni pronóstico validado; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | período, eventos, modelo de probabilidad/calibración; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | período, eventos, modelo de probabilidad/calibración |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP14 — OP14 Exposición / VolII α protocolo, Taxonomía grupos riesgo

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP14 Exposición / VolII α protocolo, Taxonomía grupos riesgo |
| Definición doctrinal | oportunidades, carga/ventana y base comparable; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | VolII α protocolo, Taxonomía grupos riesgo; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | oportunidades, carga/ventana y base comparable; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | CON/TAX, P2 AU-17; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | oportunidades, carga/ventana y base comparable; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | oportunidades, carga/ventana y base comparable |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO como operador separado |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP15 — OP15 Intervención/prevención / Prometeo, SDO-PROM§9

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP15 Intervención/prevención / Prometeo, SDO-PROM§9 |
| Definición doctrinal | función de respuesta o contrafactual tipado, oportunidad/costo/ΔP; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Prometeo, SDO-PROM§9; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | función de respuesta o contrafactual tipado, oportunidad/costo/ΔP; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | CON/TAX; no reducir a ranking R*, AU-17; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | función de respuesta o contrafactual tipado, oportunidad/costo/ΔP; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | función de respuesta o contrafactual tipado, oportunidad/costo/ΔP |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP16 — OP16 Shapley / Calculo14§3.5/§6.3, ApC A4; Prometeo6.5; MC I V·4; II CorIV

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP16 Shapley / Calculo14§3.5/§6.3, ApC A4; Prometeo6.5; MC I V·4; II CorIV |
| Definición doctrinal | juego cooperativo v(S), universo, unidad; suma factorial marginal; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo14§3.5/§6.3, ApC A4; Prometeo6.5; MC I V·4; II CorIV; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | φ_i=Σ_S factorial(|S|)factorial(n−|S|−1)/factorial(n)·(v(S∪i)−v(S)) |
| Dominio | MAT con v(S) completo; TAX para estimar v; P2 AU-17; selección PF/Shapley no adjudicada por conjetura; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | juego cooperativo v(S), universo, unidad; suma factorial marginal; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | juego cooperativo v(S), universo, unidad; suma factorial marginal |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | canonicos CF12; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Chevron/PLD y aritmetica-fuente.json |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP17 — OP17 Instrumentalidad/reasignación R*_efectivo / Calculo8§4B/9; Prometeo3.1

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP17 Instrumentalidad/reasignación R*_efectivo / Calculo8§4B/9; Prometeo3.1 |
| Definición doctrinal | diseñador(es), reparto/condición detección, pesos sin doble conteo; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo8§4B/9; Prometeo3.1; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | diseñador(es), reparto/condición detección, pesos sin doble conteo; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | TAX/CON; fuentes varían incluso dentro Prometeo, AU-17; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | diseñador(es), reparto/condición detección, pesos sin doble conteo; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | diseñador(es), reparto/condición detección, pesos sin doble conteo |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO; tipo sólo inhibe S piloto |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP18 — OP18 R*_B / MC I II·6 y apéndice dualidad; RES-DELTAB§13

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP18 R*_B / MC I II·6 y apéndice dualidad; RES-DELTAB§13 |
| Definición doctrinal | grafo causal de beneficio; no simple cuota de montos; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | MC I II·6 y apéndice dualidad; RES-DELTAB§13; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | grafo causal de beneficio; no simple cuota de montos; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | MAT/TAX, P2 AU-17; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | grafo causal de beneficio; no simple cuota de montos; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | grafo causal de beneficio; no simple cuota de montos |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación PARCIAL reutilizando rStar con D positivo, sin contrato/tipo separado |
| Estado de conformidad | PARCIAL |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP19 — OP19 Δ_B / RES-DELTAB§7–8, Calculo10§3.6

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP19 Δ_B / RES-DELTAB§7–8, Calculo10§3.6 |
| Definición doctrinal | absoluto B_i−β_i o cuota−β_i/B_total, unidades; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | RES-DELTAB§7–8, Calculo10§3.6; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | B_i−β_i absoluto, o cuotaB_i−β_i/B_total relativo; no mezclar unidad |
| Dominio | MAT; objeto reconocimiento en Transformación es otro estimando; AU-17; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | absoluto B_i−β_i o cuota−β_i/B_total, unidades; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | absoluto B_i−β_i o cuota−β_i/B_total, unidades |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP20 — OP20 Conversión vital τ / Calculo1, daño cap6–7

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP20 Conversión vital τ / Calculo1, daño cap6–7 |
| Definición doctrinal | dinero/salario social explícito comparable; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo1, daño cap6–7; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | T=dinero/w_ref con base salarial explícita |
| Dominio | MAT/TAX; no imponer w_ref=8 universal, AU-17; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | dinero/salario social explícito comparable; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | dinero/salario social explícito comparable |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP21 — OP21 Justicia estructural J / Calculo4§2.1

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP21 Justicia estructural J / Calculo4§2.1 |
| Definición doctrinal | 1−Σ; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo4§2.1; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | J=1−Σabs(R−α); no rango no-negativo demostrado |
| Dominio | ; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | 1−Σ; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | 1−Σ |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación R*−α |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP22 — OP22 Impunidad diseñador I_d / Calculo4§2.2

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP22 Impunidad diseñador I_d / Calculo4§2.2 |
| Definición doctrinal | (R_d−α_d)/max(1−mediaα_ejec,ε); objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo4§2.2; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | I_d=(R_d−α_d)/max(1−mediaPonderadaα_ejec,ε) |
| Dominio | MAT/TAX clasificación/pesos/ε explícitos; AU-17; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | (R_d−α_d)/max(1−mediaα_ejec,ε); magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | (R_d−α_d)/max(1−mediaα_ejec,ε) |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP23 — OP23 Herencia H / Calculo3§6.1; Δ_diferido/intergeneracional

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP23 Herencia H / Calculo3§6.1; Δ_diferido/intergeneracional |
| Definición doctrinal | R_hist CI HB(1−RI), sucesores, asunción diferida; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo3§6.1; Δ_diferido/intergeneracional; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | H=R_hist·CI·HB·(1−RI); Δdiferido tipado por periodo/sucesor |
| Dominio | MAT/TAX; agregación sin doble conteo requiere contrato; AU-17; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | R_hist CI HB(1−RI), sucesores, asunción diferida; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | R_hist CI HB(1−RI), sucesores, asunción diferida |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP24 — OP24 Opacidad / Calculo2§6.2

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP24 Opacidad / Calculo2§6.2 |
| Definición doctrinal | firmas/Hijos ponderados; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo2§6.2; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | firmas/Hijos ponderados; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | TAX; escalas predictivas no universales; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | firmas/Hijos ponderados; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | firmas/Hijos ponderados |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP25 — OP25 Probabilidad impago/quiebra/colapso / Calculo8§5.5,9§5.5,11§5.4

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP25 Probabilidad impago/quiebra/colapso / Calculo8§5.5,9§5.5,11§5.4 |
| Definición doctrinal | logística, parámetros y horizonte calibrados; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo8§5.5,9§5.5,11§5.4; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | logística calibrada por dominio/horizonte; coeficientes publicados ilustrativos |
| Dominio | TAX/CON; cifras ilustrativas no modelos validados; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | logística, parámetros y horizonte calibrados; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | logística, parámetros y horizonte calibrados |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP26 — OP26 ICRS / Calculo9§1.2; INCF /12; ICA/índices sectoriales

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP26 ICRS / Calculo9§1.2; INCF /12; ICA/índices sectoriales |
| Definición doctrinal | aliases de R* sobre objeto/graph sectorial; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo9§1.2; INCF /12; ICA/índices sectoriales; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | aliases de R* sobre objeto/graph sectorial; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | TAX nomenclatura, no nueva fórmula universal; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | aliases de R* sobre objeto/graph sectorial; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | aliases de R* sobre objeto/graph sectorial |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación PARCIAL rStar con dominio explícito |
| Estado de conformidad | PARCIAL |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP27 — OP27 ROI prevención / CalculoApA§3.1,9§5.5

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP27 ROI prevención / CalculoApA§3.1,9§5.5 |
| Definición doctrinal | (D_totalΔP−costo)/costo, costo>0, ΔP externo; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | CalculoApA§3.1,9§5.5; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | ROI=(D_total·ΔP−costo)/costo; costo>0 |
| Dominio | MAT/TAX; no calcular ΔP sólo con neta; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | (D_totalΔP−costo)/costo, costo>0, ΔP externo; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | (D_totalΔP−costo)/costo, costo>0, ΔP externo |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP28 — OP28 Presupuesto preventivo / ApA§3.3

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP28 Presupuesto preventivo / ApA§3.3 |
| Definición doctrinal | costos, restricciones, beneficios/respuesta; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | ApA§3.3; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | costos, restricciones, beneficios/respuesta; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | FUERA optimización específica; conjetura de óptimo requiere hipótesis; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | costos, restricciones, beneficios/respuesta; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | costos, restricciones, beneficios/respuesta |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP29 — OP29 IAS / Calculo12§6.3,15§6.3,16§6.3

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP29 IAS / Calculo12§6.3,15§6.3,16§6.3 |
| Definición doctrinal | J_post−J_pre, dos análisis comparables; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo12§6.3,15§6.3,16§6.3; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | IAS=J_post−J_pre con bases compatibles |
| Dominio | MAT/TAX, AU-17; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | J_post−J_pre, dos análisis comparables; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | J_post−J_pre, dos análisis comparables |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP30 — OP30 Equidad crédito, prioridad FTA / Calculo8§6.3,12§6.4

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP30 Equidad crédito, prioridad FTA / Calculo8§6.3,12§6.4 |
| Definición doctrinal | riesgo/base, causalidad y factores explícitos; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo8§6.3,12§6.4; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | riesgo/base, causalidad y factores explícitos; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | TAX/FUERA score sectorial, no R* nuevo; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | riesgo/base, causalidad y factores explícitos; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | riesgo/base, causalidad y factores explícitos |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP31 — OP31 Valor agregado docente / Calculo15§6.1

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP31 Valor agregado docente / Calculo15§6.1 |
| Definición doctrinal | contribución/contexto y base de rendimiento; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo15§6.1; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | contribución/contexto y base de rendimiento; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | TAX/FUERA educación; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | contribución/contexto y base de rendimiento; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | contribución/contexto y base de rendimiento |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP32 — OP32 Shapley deportivo, S_B / Calculo17§3.3/6.2

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP32 Shapley deportivo, S_B / Calculo17§3.3/6.2 |
| Definición doctrinal | coaliciones de beneficio y suplencia; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo17§3.3/6.2; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | coaliciones de beneficio y suplencia; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | MAT/TAX; no confundir cuotaB directa con causalidadB; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | coaliciones de beneficio y suplencia; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | coaliciones de beneficio y suplencia |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO especialización |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP33 — OP33 Resonancia narrativa / Calculo18§6.3

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP33 Resonancia narrativa / Calculo18§6.3 |
| Definición doctrinal | Δ de personajes/peso narrativo; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Calculo18§6.3; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | Δ de personajes/peso narrativo; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | TAX/FUERA análisis narrativo; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | Δ de personajes/peso narrativo; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | Δ de personajes/peso narrativo |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP34 — OP34 Contrafactual/ablación/bifurcación / AxiomApD §§D.3–D.5

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP34 Contrafactual/ablación/bifurcación / AxiomApD §§D.3–D.5 |
| Definición doctrinal | fila alternativa tipada, recálculo, nuevoresultado; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | AxiomApD §§D.3–D.5; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | G′=ablación/sustitución explícita; recalcular medida sin inventar escenario |
| Dominio | MAT/TAX, AU-17; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | fila alternativa tipada, recálculo, nuevoresultado; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | fila alternativa tipada, recálculo, nuevoresultado |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO especializado; sensibilidad no sustituye nodo |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP35 — OP35 S_prob/S_op/S_est / Axiom§3, AUD-S,2E-S

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP35 S_prob/S_op/S_est / Axiom§3, AUD-S,2E-S |
| Definición doctrinal | probabilidad contrafactual, normas o KL; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Axiom§3, AUD-S,2E-S; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | S_prob probabilidad contrafactual; S_op normativo; S_est KL, sin equivalencia universal |
| Dominio | CON/TAX/HIST; KL no acotado, no prueba equivalencia; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | probabilidad contrafactual, normas o KL; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | probabilidad contrafactual, normas o KL |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP36 — OP36 α_H/α_T/Δ_H, R*α / HISTOS/SDO resoluciones

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP36 α_H/α_T/Δ_H, R*α / HISTOS/SDO resoluciones |
| Definición doctrinal | observación longitudinal/proxy y respuesta; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | HISTOS/SDO resoluciones; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | observación longitudinal/proxy y respuesta; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | CON/FUERA; no transferir numéricamente; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | observación longitudinal/proxy y respuesta; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | observación longitudinal/proxy y respuesta |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_APLICABLE al contrato aplicado |
| Estado de conformidad | NO_APLICABLE |
| Severidad | — (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP37 — OP37 φ1/φ2/I(t), φ_col, Hijos, Aego / Transformación, Axiom, MC I/II

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP37 φ1/φ2/I(t), φ_col, Hijos, Aego / Transformación, Axiom, MC I/II |
| Definición doctrinal | aparato ontológico/dinámico y experiencia interna; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Transformación, Axiom, MC I/II; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | aparato ontológico/dinámico y experiencia interna; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | FUERA/CON; modo observable no operación interior certificada; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | aparato ontológico/dinámico y experiencia interna; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | aparato ontológico/dinámico y experiencia interna |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_APLICABLE como inferencia del calculador |
| Estado de conformidad | NO_APLICABLE |
| Severidad | — (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP38 — OP38 Conjetura O(G) PF/Shapley unificador / VolII Conjetura I

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP38 Conjetura O(G) PF/Shapley unificador / VolII Conjetura I |
| Definición doctrinal | selector que coincide en límites, caso mixto; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | VolII Conjetura I; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | selector que coincide en límites, caso mixto; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | CON: conjetura no algoritmo autoritativo; no decisión para auditar; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | selector que coincide en límites, caso mixto; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | selector que coincide en límites, caso mixto |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP39 — OP39 Δ_neto=R_D−R_B, Δ_idiosincrático, rangos derivados / MC I II·6, TransformaciónIV

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP39 Δ_neto=R_D−R_B, Δ_idiosincrático, rangos derivados / MC I II·6, TransformaciónIV |
| Definición doctrinal | dos grafos o intervalos S/α tipados; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | MC I II·6, TransformaciónIV; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | R_D−R_B en bases comparables, variante idiosincrática contextual |
| Dominio | MAT/TAX, P2 AU-17; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | dos grafos o intervalos S/α tipados; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | dos grafos o intervalos S/α tipados |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO separado |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP40 — OP40 β/reconocimiento y tributo T=f(R*φproductiva) / TransformaciónII–III

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP40 β/reconocimiento y tributo T=f(R*φproductiva) / TransformaciónII–III |
| Definición doctrinal | retorno/reconocimiento o función aún no fijada; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | TransformaciónII–III; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | retorno/reconocimiento o función aún no fijada; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | CON/TAX/FUERA; distinto de Δ_B patrimonial; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | retorno/reconocimiento o función aún no fijada; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | retorno/reconocimiento o función aún no fijada |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_APLICABLE/NO_IMPLEMENTADO según objeto |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP41 — OP41 Índice de inversión I_inv / Axiom Def8.6, Teo8.3

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP41 Índice de inversión I_inv / Axiom Def8.6, Teo8.3 |
| Definición doctrinal | abs(Δ_diseñador)/abs(Δ_ejecutor), denominador no cero, clasificación de roles; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Axiom Def8.6, Teo8.3; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | abs(Δ_diseñador)/abs(Δ_ejecutor), denominador>0; monotonicidad/significado conflictivos |
| Dominio | MAT/CON; contradicción D/E pendiente; sin defecto runtime activo; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | abs(Δ_diseñador)/abs(Δ_ejecutor), denominador no cero, clasificación de roles; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | abs(Δ_diseñador)/abs(Δ_ejecutor), denominador no cero, clasificación de roles |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | canonicos CF16; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Axiom VIII y aritmetica-fuente.json |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO; DECISION_REQUERIDA para interpretar monotonicidad |
| Estado de conformidad | DECISION_REQUERIDA |
| Severidad | — (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | Sí, I_INV; I_inv sólo para definición futura |

## OP42 — OP42 V(G,G′) / Axiom ApD6

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP42 V(G,G′) / Axiom ApD6 |
| Definición doctrinal | distancia L1 entre vectores comparables después de cambio, IDs alineados; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Axiom ApD6; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | V(G,G′)=Σabs(R_i−R′_i) alineado por ID |
| Dominio | MAT, AU-17 P2; distinto de visibilidad V del TIC; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | distancia L1 entre vectores comparables después de cambio, IDs alineados; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | distancia L1 entre vectores comparables después de cambio, IDs alineados |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP43 — OP43 REC / Axiom VII, RES-REC-001

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP43 REC / Axiom VII, RES-REC-001 |
| Definición doctrinal | estimación Bernoulli/Fisher/CRLB, n, τ; ΔIΔh≥τ/n bajo hipótesis; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Axiom VII, RES-REC-001; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | modelo Bernoulli/CRLB: n·ΔI·Δh≥τ₀, bajo hipótesis RES-REC-001 |
| Dominio | FUERA; REC no significa recurrencia; constante publicada 4τ₀² corregida a τ₀; no modelo general validado; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | estimación Bernoulli/Fisher/CRLB, n, τ; ΔIΔh≥τ/n bajo hipótesis; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | estimación Bernoulli/Fisher/CRLB, n, τ; ΔIΔh≥τ/n bajo hipótesis |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_APLICABLE al núcleo aplicado |
| Estado de conformidad | NO_APLICABLE |
| Severidad | — (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP44 — OP44 RSC / RES-RSC-IT-001, Axiom II

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP44 RSC / RES-RSC-IT-001, Axiom II |
| Definición doctrinal | registro histórico de eventos marcados; I(t) es otra magnitud; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | RES-RSC-IT-001, Axiom II; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | registro histórico de eventos marcados; I(t) es otra magnitud; operacionalización según fuente, no algoritmo universal autorizado |
| Dominio | FUERA/CON; secuencia o multiconjunto no adjudicados para implementación futura; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | registro histórico de eventos marcados; I(t) es otra magnitud; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | registro histórico de eventos marcados; I(t) es otra magnitud |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_APLICABLE al núcleo aplicado |
| Estado de conformidad | NO_APLICABLE |
| Severidad | — (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## OP45 — OP45 Contribución contrafactual R−R_ablación / Axiom ApD

| Campo | Contenido |
|---|---|
| Nombre canónico / símbolo | OP45 Contribución contrafactual R−R_ablación / Axiom ApD |
| Definición doctrinal | dos análisis comparables, regla de ablación explicitada; objeto tipado según fuente, sin equiparar aliases de distintos estimandos |
| Fuentes exactas | Axiom ApD; rutas/SHA en fuentes.json y referencias del inventario |
| Fórmula o regla | R_i(G)−R_i(G_ablación), distinto de R_i(1−S_i) |
| Dominio | MAT/TAX; estimando distinto de R*(1−S), AU-17 P2; tres familias del contrato aplicado no restringen operadores, pero operacionalización sectorial no es universal |
| Precondiciones | dos análisis comparables, regla de ablación explicitada; magnitudes/IDs/unidades compatibles, ausencia no suplida; contrato por dominio pendiente donde CON/TAX; no se adjudica automáticamente |
| Inputs | dos análisis comparables, regla de ablación explicitada |
| Outputs | Magnitud descrita por fórmula/constructo; no output runtime específico; estado/motivo/auditoría si aplicado |
| Ausencia | Aplicado: null/indeterminado o no aplicable por contrato; no convertir faltante en0. Faltante: no inferir output ni proponer default sin protocolo |
| Incertidumbre | Rangos/escenarios/presupuesto numérico declarados; no equivalen a intervalo estadístico de hechos. Faltante: requerir hipótesis de estimación específicas |
| Interpretación permitida | Medida condicional a inputs discriminados y versión; estimando descrito en fórmula |
| Interpretación prohibida | Certificar hechos, culpabilidad, intención, causalidad empírica o universalidad del piloto por resultado calculado; equiparar objetos homónimos |
| Implementación | REGISTRY no contiene entrada específica; ver inventario para aliases/objetos reutilizables |
| Tests existentes | No test de operador activo; clasificación del corpus; matriz de cobertura identifica requisito y hueco |
| Fixtures canónicos | Corpus exacto inventariado; ejemplos parciales/simbólicos clasificados, sin fixture runtime específico |
| Resultado esperado | Regla canónica actual, o ausencia de implementación declarada; no igualdad automática a aritmética histórica; CF16 sin elección |
| Resultado observado | No salida de operador específico; clasificación NO_IMPLEMENTADO |
| Estado de conformidad | NO_IMPLEMENTADO |
| Severidad | P2 (runtime/cobertura); errores de fuente separados CF |
| Decisión requerida | No actual; I_inv sólo para definición futura |

## C01 — Análisis

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Análisis |
| Definición / fuente / regla | Pregunta + fenómeno + finalidad + dominio + selección de operadores; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Pregunta + fenómeno + finalidad + dominio + selección de operadores; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | No prueba el expediente fuente; no requiere carga de archivos. Campos comunes incompletos producen advertencia, no certificado |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | modelo.crearAnalisis; Constructor; entrada; expediente.seccionAnalisis |
| Tests / fixtures | modelo.test, recorrido 8 pantallas; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | modelo.crearAnalisis; Constructor; entrada; expediente.seccionAnalisis; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | CONFORME_CON_RESERVA / P2, AU-09 / no |

## C02 — Fenómeno

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Fenómeno |
| Definición / fuente / regla | Objeto descrito y pregunta causal, distinto de D; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Objeto descrito y pregunta causal, distinto de D; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | Descripción vacía sigue siendo vacía; no inferencia textual |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | fenómeno.descripcion preservado |
| Tests / fixtures | linter.test dentro interfaz-expediente; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | fenómeno.descripcion preservado; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | CONFORME_CON_RESERVA / P2 / no |

## C03 — Evento determinado / D

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Evento determinado / D |
| Definición / fuente / regla | Cierre descriptivo externo a W y R*; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Cierre descriptivo externo a W y R*; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | Cierre requerido para R*, pero basta una conexión E0 y no se valida su rango: requisito metrológico sólo parcial |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | modelo separa final legacy; grafo excluye; HTML cierre fuera de W |
| Tests / fixtures | pf.test, AUD-01; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | modelo separa final legacy; grafo excluye; HTML cierre fuera de W; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | PARCIAL / P1, AU-01 / no |

## C04 — Nodo / N_i

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Nodo / N_i |
| Definición / fuente / regla | Unidad relevante, no necesariamente persona; tipo discriminado; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Unidad relevante, no necesariamente persona; tipo discriminado; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | Tipo y modo ausentes → indeterminado, sin asignación psicológica |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | modelo valida IDs; UI tipos explícitos |
| Tests / fixtures | modelo.test, AUD-06; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | modelo valida IDs; UI tipos explícitos; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | CONFORME / — / no |

## C05 — Relación / w_ij

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Relación / w_ij |
| Definición / fuente / regla | Transición local origen→destino con rango y evidencia discriminados; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Transición local origen→destino con rango y evidencia discriminados; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | E0→peso epistémico cero; ausencia de rango no se convierte en cero; pares duplicados se rechazan |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | modelo + grafo + formulario |
| Tests / fixtures | pf.test; duplicado dispara render sin captura; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | modelo + grafo + formulario; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | PARCIAL / P1 AU-02 y P2 AU-03 / no |

## C06 — Discriminación

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Discriminación |
| Definición / fuente / regla | Juicio humano registrado, no inferencia desde soportes; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Juicio humano registrado, no inferencia desde soportes; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | No cuenta documentos para fijar pesos; niveles E1–E8 sin mapa taxonómico autoritativo |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | S/alpha/IIC explícitos; no LLM |
| Tests / fixtures | derivados.test, búsqueda runtime; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | S/alpha/IIC explícitos; no LLM; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | CONFORME_CON_RESERVA / P2 AU-08 / no |

## C07 — Soporte

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Soporte |
| Definición / fuente / regla | Descripción humana que sustenta una discriminación; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Descripción humana que sustenta una discriminación; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | No verificación documental automática; ni certificado de verdad |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | arrays/string declarados preservados en nodos y relaciones |
| Tests / fixtures | HTML frase explícita; escapar script; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | arrays/string declarados preservados en nodos y relaciones; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | CONFORME / — / no |

## C08 — Referencia

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Referencia |
| Definición / fuente / regla | Procedencia documental opcional, distinta del soporte y expediente; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Procedencia documental opcional, distinta del soporte y expediente; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | Puede calcularse sin adjuntos; WARN no altera valores |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | campo referencia, linter WARN ausencia |
| Tests / fixtures | interfaz-expediente.test; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | campo referencia, linter WARN ausencia; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | CONFORME / — / no |

## C09 — Operador

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Operador |
| Definición / fuente / regla | Contrato de medición con inputs, dependencias y salida; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Contrato de medición con inputs, dependencias y salida; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | Fallos locales preservan independientes; operador desconocido y modelo inválido abortan solicitud completa |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | series.REGISTRY 12 entradas; nomenclatura |
| Tests / fixtures | operadores.test; diagnóstico; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | series.REGISTRY 12 entradas; nomenclatura; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | CONFORME_CON_RESERVA / P2 AU-10 / no |

## C10 — Resultado

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Resultado |
| Definición / fuente / regla | Magnitud + estado + motivo + auditoría; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Magnitud + estado + motivo + auditoría; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | null preservado; no solicitado, no aplicable e indeterminado no se distinguen bien en tabla; overflow calculado no finito |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | series/JSON/tabla/details |
| Tests / fixtures | AUD-04, UI; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | series/JSON/tabla/details; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | PARCIAL / P1 AU-04, P2 AU-09 / no |

## C11 — Expediente metrológico

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Expediente metrológico |
| Definición / fuente / regla | Registro derivado del cálculo, distinto de fuente de hechos; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Registro derivado del cálculo, distinto de fuente de hechos; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | No recalcula; conservación incompleta de inputs externos/config/metadatos B* |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | generarHTML consume resultado, sin motor importado |
| Tests / fixtures | AUD-02; diferencial; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | generarHTML consume resultado, sin motor importado; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | PARCIAL / P2 AU-05/06 / no |

## C12 — Familia

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Familia |
| Definición / fuente / regla | Finalidad: imputación/compliance/contabilidad; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Finalidad: imputación/compliance/contabilidad; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | Tres familias comparten repertorio; no un sinónimo de dominio |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | radio familia; motor no filtra operadores |
| Tests / fixtures | interfaz-expediente.test, recorrido; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | radio familia; motor no filtra operadores; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | CONFORME / — / no |

## C13 — Dominio

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Dominio |
| Definición / fuente / regla | Ámbito de aplicación, texto declarado; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Ámbito de aplicación, texto declarado; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | No selecciona fórmula por nombre ni fallback a dominio general |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | estado.dominio→modelo→HTML |
| Tests / fixtures | búsqueda/adaptador; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | estado.dominio→modelo→HTML; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | CONFORME_CON_RESERVA / P2 AU-08 / no |

## C14 — Protocolo taxonómico

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Protocolo taxonómico |
| Definición / fuente / regla | Estrategia versionada de observación/calibración, no fórmula universal; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Estrategia versionada de observación/calibración, no fórmula universal; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | Protocolo externo no cambia circuito activo; taxonomiaVersion arbitraria API no se comprueba |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | registry/loader existen pero UI importa GENERICO y adaptador fija generico@1 |
| Tests / fixtures | AUD-07 y prueba existente sólo de Map; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | registry/loader existen pero UI importa GENERICO y adaptador fija generico@1; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | PARCIAL / P1 AU-07 / no |

## C15 — Asistente determinista

| Campo | Contenido |
|---|---|
| Nombre / símbolo | Asistente determinista |
| Definición / fuente / regla | Reglas para orientar y validar insumos, sin inventar hechos; instrucciones actuales §§1–11/16/22 y orden02§4/6; fichas y fuentes base |
| Dominio / precondiciones | Esquema común de las tres familias; inputs discriminados y relaciones/IDs coherentes, sin documentos obligatorios |
| Inputs / outputs | Reglas para orientar y validar insumos, sin inventar hechos; representación observable en modelo/resultado/expediente según objeto |
| Ausencia / incertidumbre | α externo calculado produce ERR falso; excepciones de modelo no capturadas; no certifica integridad universal |
| Interpretación permitida / prohibida | Registro/validación del objeto declarado; no inferir hechos ni convertir soporte en prueba verificada |
| Archivos | linter.mensajesAnalisis |
| Tests / fixtures | AUD-03; fuente UI; diferencial.json y casos-fuente.json cuando se usa un grafo |
| Esperado | Separación conceptual y preservación según regla, sin selección semántica por default |
| Observado | linter.mensajesAnalisis; detalle y reproducción en arquitectura/registro |
| Estado / severidad / decisión | PARCIAL / P2 AU-03/11 / no |

