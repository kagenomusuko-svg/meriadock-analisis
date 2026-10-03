# Matriz de suficiencia de operadores — Work05

Criterio aplicado: objeto, inputs, unidades, fórmula/regla, aplicabilidad, ausencia, cero, límites, interpretación, procedencia y caso verificable. La mención taxonómica por sí sola no activa un operador.

| ID | Operador | Clase | Protocolos que lo mencionan | Inputs mínimos | Fórmula/regla | Estado Work05 | Causa / límite |
|---|---|---|---|---|---|---|---|
| OP01 | R* — Índice de convergencia de eventos | MAT | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1 | W activo; cierre válido | W R*=ρR*, normalización L1 | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP02 | S — Índice de sustituibilidad | MAT | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1 | componentes S; pesos opcionales; confirmación | Σ(p_k s_k)/Σp_k | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP03 | R*_neta — Contribución atribuible | MAT | tax-cap01@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap08@1, tax-cap09@1, tax-cap10@1 | R*; S | R*(1−S) | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP04 | α — Condiciones adversas atribuibles | MAT | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1 | valor o proporción; estrategia | estrategia α explícita | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP05 | Δ — Asimetría repercusiva | MAT | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1 | R*; α | R*−α | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP06 | IIC — Índice de integridad causal | MAT | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1 | declarado; observado; coincidencias | coincidencias/elementos declarados | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP07 | B* — Distribución de beneficio | MAT | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1 | beneficios netos; unidad | beneficio_i/beneficio_total | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP08 | D_total — Daño total | MAT | tax-cap01@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1, tax-cap09@1 | tres montos; unidad | T_invertido+T_impedido+ΔT_trayectoria | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP09 | AD — Ajuste debitor | MAT | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1 | R*; D_total | R*_i×D_total | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP10 | Robustez A–D | MAT | — | escenarios PF | ranking de PF mínimo/central/máximo | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP11 | Sensibilidad extendida | MAT | tax-cap15@1, tax-cap31@1 | método; presupuesto | sensibilidad con método y presupuesto explícitos | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP12 | Fraude annona | MAT | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap05@1, tax-cap06@1, tax-cap08@1, tax-cap09@1, tax-cap10@1 | diseñador activo; α; IIC congruencia | R*(1−α)*(1−IIC) | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP13 | Recurrencia | TAX | tax-cap11@1, tax-cap14@1, tax-cap62@1, tax-cap72@1 | — | — | REQUIERE_CALIBRACION | sin horizonte, población y calibración temporal autorizada |
| OP14 | Exposición | TAX | tax-cap04@1, tax-cap05@1, tax-cap14@1, tax-cap17@1, tax-cap21@1, tax-cap22@1, tax-cap23@1, tax-cap25@1 | — | — | REQUIERE_CALIBRACION | sin oportunidades, ventana temporal, carga y base comparable |
| OP15 | Intervención/prevención | TAX/CON | tax-cap08@1, tax-cap21@1, tax-cap27@1, tax-cap31@1, tax-cap33@1, tax-cap35@1, tax-cap43@1, tax-cap46@1 | — | — | REQUIERE_DECISION | sin función de respuesta o contrafactual tipado |
| OP16 | Shapley | MAT | tax-cap01@1, tax-cap04@1, tax-cap06@1, tax-cap07@1, tax-cap15@1, tax-cap18@1, tax-cap22@1, tax-cap23@1 | v(S) completo; unidad | marginal factorial exacto de v(S) | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP17 | Instrumentalidad/reasignación R*_efectivo | TAX/CON | — | — | — | REQUIERE_DECISION | sin detección, distribución y conservación/reasignación sin doble conteo |
| OP18 | R*_B — convergencia causal de beneficio | TAX/CON | tax-cap02@1, tax-cap07@1, tax-cap13@1, tax-cap14@1, tax-cap29@1, tax-cap37@1, tax-cap40@1, tax-cap45@1 | — | — | REQUIERE_DECISION | R*_B no tiene contrato de grafo de beneficio separado de B* |
| OP19 | Δ_B — Brecha de beneficio | MAT | tax-cap15@1, tax-cap55@1, tax-cap68@1 | B_i; β_i; unidad | B_i−β_i | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP20 | Conversión vital τ | MAT | tax-cap01@1, tax-cap02@1, tax-cap24@1, tax-cap28@1 | monto; salario/hora; moneda | monto/salario de referencia | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP21 | Justicia estructural J | MAT | tax-cap01@1, tax-cap02@1, tax-cap30@1, tax-cap49@1, tax-cap63@1, tax-cap76@1 | Δ de universo | 1−Σ|R*−α| | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP22 | Impunidad del diseñador I_d | TAX/CON | tax-cap47@1 | — | — | REQUIERE_DECISION | clasificación de ejecutores, pesos y epsilon no adjudicados |
| OP23 | Herencia H | TAX/CON | tax-cap42@1, tax-cap45@1, tax-cap62@1 | — | — | REQUIERE_DECISION | agregación histórica/intergeneracional sin regla libre de doble conteo |
| OP24 | Opacidad | TAX | — | — | — | REQUIERE_CALIBRACION | firmas/Hijos no fijan una escala predictiva universal |
| OP25 | Probabilidad sectorial | TAX/CON | tax-cap15@1, tax-cap16@1, tax-cap22@1, tax-cap28@1, tax-cap50@1, tax-cap52@1, tax-cap62@1, tax-cap67@1 | — | — | REQUIERE_CALIBRACION | coeficientes ilustrativos sin calibración autorizada |
| OP26 | Aliases sectoriales ICRS/INCF/ICA | TAX | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1 | — | — | TAXONOMIA_SUFICIENTE | sólo aliases; no crea algoritmo adicional |
| OP27 | ROI neto de prevención | MAT | tax-cap12@1, tax-cap13@1, tax-cap16@1, tax-cap17@1, tax-cap19@1, tax-cap22@1, tax-cap23@1, tax-cap24@1 | D_total; ΔP externo; costo; unidad | (D_total×ΔP−costo)/costo | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP28 | Presupuesto preventivo | FUERA | tax-cap01@1, tax-cap33@1, tax-cap36@1, tax-cap50@1, tax-cap76@1 | — | — | FUERA | optimización sectorial fuera del calculador general |
| OP29 | IAS — aprendizaje sistémico | MAT | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1 | R*/α antes y después; base comparativa | J_post−J_pre | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP30 | Equidad de crédito / prioridad FTA | FUERA | tax-cap17@1, tax-cap27@1, tax-cap30@1, tax-cap73@1 | — | — | FUERA | score sectorial sin contrato general |
| OP31 | Valor agregado docente | FUERA | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1 | — | — | FUERA | valoración educativa requiere protocolo sectorial |
| OP32 | Shapley deportivo / S_B | TAX/CON | tax-cap01@1, tax-cap04@1, tax-cap06@1, tax-cap07@1, tax-cap15@1, tax-cap18@1, tax-cap22@1, tax-cap23@1 | — | — | REQUIERE_CALIBRACION | suplencia deportiva y v(S) sectorial sin calibración |
| OP33 | Resonancia narrativa | FUERA | tax-cap47@1 | — | — | FUERA | análisis narrativo fuera del calculador |
| OP34 | Contrafactual/ablación/bifurcación | TAX/CON | tax-cap01@1, tax-cap06@1 | — | — | REQUIERE_DECISION | no se define cómo construir W′ ni tratar D |
| OP35 | S_prob / S_op / S_est | TAX/CON | — | — | — | REQUIERE_DECISION | estimandos no equivalentes; falta decisión doctrinal |
| OP36 | α_H / α_T / Δ_H / R*α | FUERA | — | — | — | FUERA | objeto longitudinal fuera del contrato aplicado |
| OP37 | φ1 / φ2 / I(t) / Hijos / Aego | FUERA | — | — | — | RESERVADO_CONCEPTUAL | aparato ontológico no observable directamente |
| OP38 | Conjetura O(G) | CON | — | — | — | RESERVADO_CONCEPTUAL | conjetura unificadora no es algoritmo autoritativo |
| OP39 | Δ_neto / Δ_idiosincrático | TAX/CON | — | — | — | REQUIERE_DECISION | dos grafos/intervalos requieren tipado y regla de agregación |
| OP40 | β / reconocimiento / tributo | TAX/CON | tax-cap29@1, tax-cap35@1, tax-cap45@1 | — | — | REQUIERE_DECISION | función de tributo/reconocimiento no fijada |
| OP41 | I_inv — Índice de inversión | MAT | — | roles; Δ diseñador; Δ ejecutor | |Δ_diseñador|/|Δ_ejecutor| | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP42 | V(G,G′) — Impacto causal | MAT | — | vectores R* comparables; referencias; IDs | ||R*(G′)−R*(G)||₁ | ACTIVO | Contrato vigente; ausencia indeterminada y cero sólo declarado |
| OP43 | REC | FUERA | tax-cap01@1, tax-cap02@1, tax-cap03@1, tax-cap04@1, tax-cap05@1, tax-cap06@1, tax-cap07@1, tax-cap08@1 | — | — | FUERA | REC estadístico fuera del calculador aplicado |
| OP44 | RSC | FUERA | — | — | — | FUERA | RSC histórico sin representación futura adjudicada |
| OP45 | Contribución contrafactual R−R_ablación | TAX/CON | tax-cap01@1, tax-cap02@1, tax-cap04@1, tax-cap07@1, tax-cap11@1, tax-cap37@1, tax-cap40@1, tax-cap55@1 | — | — | REQUIERE_DECISION | ablación requiere transformación explícita y recálculo |
