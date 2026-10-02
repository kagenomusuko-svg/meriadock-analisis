# Auditoría 6 — Inventario de operadores y cobertura

La lista REGISTRY tiene 12 entradas. «Disponible para tres familias» no significa repertorio completo del corpus. Índice reproducible de 286 encabezados pertinentes: auditoria/evidencia/indice-operadores.json; fuentes y huellas en fuentes.json. Se recorrieron definiciones y código ilustrativo, distinguiendo aliases, estimadores, magnitudes compuestas y postulados sin contrato ejecutable.

Clases de faltante: MAT = matemáticamente definido con inputs explícitos; CON = constructo sin contrato/calibración suficiente; TAX = operacionalización dependiente de Taxonomía; HIST = histórico/sustituido; FUERA = ajeno al calculador general. «MAT» no adjudica verdad de teoremas ni autoriza implementación durante auditoría.

| ID / operador o familia / fuente exacta | Contrato o inputs mínimos | REGISTRY / estado | Clase / severidad / decisión |
|---|---|---|---|
| OP01 R* / orden02 §4, Metrología I II·5, VolII Paso1 | W activo, PF derecho L1 | rStar / CONFORME_CON_RESERVA | actual; AU-01/02 |
| OP02 S / §12, Axiom§3, Prometeo2.3 | componentes/pesos discriminados; no topología automática | s / CONFORME_CON_RESERVA piloto | TAX/CON para constructo universal; AU-08 |
| OP03 R*_neta / §13 | R*(1−S) | rStarNeta / CONFORME | actual |
| OP04 α / §14, RES-ALPHA | valor/proporción comparables; estrategia por dominio | alpha / PARCIAL | TAX, AU-07 |
| OP05 Δ / §15, RES-DELTA | R*−α, signo | delta / CONFORME | actual |
| OP06 IIC / §17, VolII Paso3 | conteo actual; correlación histórica distinta | iic / CONFORME_CON_RESERVA | HIST/TAX variante signed, AU-08 |
| OP07 B* directo / §19, Prometeo2.3.2 | montos netos y unidad | bStar / PARCIAL validación | actual, AU-04/05 |
| OP08 D_total / §20 | tres montos comparables, estimaciones declaradas | dTotal / PARCIAL validación | actual, AU-04 |
| OP09 AD / §21 | R* bruto×D_total | ajusteDebitor / CONFORME_CON_RESERVA | actual |
| OP10 Robustez A–D / §11 | rankings tres escenarios estrictos | robustez / PARCIAL | AU-14 |
| OP11 Sensibilidad / §11 | método/presupuesto explícitos, ε opcional | sensibilidadExtendida / CONFORME_CON_RESERVA | AU-15 |
| OP12 Fraude annona / §18, MC I IV·4/C·7, II CorIII | diseño/capacidad/intervención/prevenir; protocolo | fraudeAnnona / NO_IMPLEMENTADO canónico | CON/TAX; legacy HIST, AU-13 P2; no decisión actual |
| OP13 Recurrencia / Calculo11§5.4 y Taxonomía compliance | período, eventos, modelo de probabilidad/calibración | NO_IMPLEMENTADO | CON/TAX, P2 AU-17; R* no frecuencia ni pronóstico validado |
| OP14 Exposición / VolII α protocolo, Taxonomía grupos riesgo | oportunidades, carga/ventana y base comparable | NO_IMPLEMENTADO como operador separado | CON/TAX, P2 AU-17 |
| OP15 Intervención/prevención / Prometeo, SDO-PROM§9 | función de respuesta o contrafactual tipado, oportunidad/costo/ΔP | NO_IMPLEMENTADO | CON/TAX; no reducir a ranking R*, AU-17 |
| OP16 Shapley / Calculo14§3.5/§6.3, ApC A4; Prometeo6.5; MC I V·4; II CorIV | juego cooperativo v(S), universo, unidad; suma factorial marginal | NO_IMPLEMENTADO | MAT con v(S) completo; TAX para estimar v; P2 AU-17; selección PF/Shapley no adjudicada por conjetura |
| OP17 Instrumentalidad/reasignación R*_efectivo / Calculo8§4B/9; Prometeo3.1 | diseñador(es), reparto/condición detección, pesos sin doble conteo | NO_IMPLEMENTADO; tipo sólo inhibe S piloto | TAX/CON; fuentes varían incluso dentro Prometeo, AU-17 |
| OP18 R*_B / MC I II·6 y apéndice dualidad; RES-DELTAB§13 | grafo causal de beneficio; no simple cuota de montos | PARCIAL reutilizando rStar con D positivo, sin contrato/tipo separado | MAT/TAX, P2 AU-17 |
| OP19 Δ_B / RES-DELTAB§7–8, Calculo10§3.6 | absoluto B_i−β_i o cuota−β_i/B_total, unidades | NO_IMPLEMENTADO | MAT; objeto reconocimiento en Transformación es otro estimando; AU-17 |
| OP20 Conversión vital τ / Calculo1, daño cap6–7 | dinero/salario social explícito comparable | NO_IMPLEMENTADO | MAT/TAX; no imponer w_ref=8 universal, AU-17 |
| OP21 Justicia estructural J / Calculo4§2.1 | 1−Σ|R*−α| | NO_IMPLEMENTADO | MAT fórmula; rango afirmado erróneo (puede <0), no imponer clamp; AU-17 |
| OP22 Impunidad diseñador I_d / Calculo4§2.2 | (R_d−α_d)/max(1−mediaα_ejec,ε) | NO_IMPLEMENTADO | MAT/TAX clasificación/pesos/ε explícitos; AU-17 |
| OP23 Herencia H / Calculo3§6.1; Δ_diferido/intergeneracional | R_hist CI HB(1−RI), sucesores, asunción diferida | NO_IMPLEMENTADO | MAT/TAX; agregación sin doble conteo requiere contrato; AU-17 |
| OP24 Opacidad / Calculo2§6.2 | firmas/Hijos ponderados | NO_IMPLEMENTADO | TAX; escalas predictivas no universales |
| OP25 Probabilidad impago/quiebra/colapso / Calculo8§5.5,9§5.5,11§5.4 | logística, parámetros y horizonte calibrados | NO_IMPLEMENTADO | TAX/CON; cifras ilustrativas no modelos validados |
| OP26 ICRS / Calculo9§1.2; INCF /12; ICA/índices sectoriales | aliases de R* sobre objeto/graph sectorial | PARCIAL rStar con dominio explícito | TAX nomenclatura, no nueva fórmula universal |
| OP27 ROI prevención / CalculoApA§3.1,9§5.5 | (D_totalΔP−costo)/costo, costo>0, ΔP externo | NO_IMPLEMENTADO | MAT/TAX; no calcular ΔP sólo con neta |
| OP28 Presupuesto preventivo / ApA§3.3 | costos, restricciones, beneficios/respuesta | NO_IMPLEMENTADO | FUERA optimización específica; conjetura de óptimo requiere hipótesis |
| OP29 IAS / Calculo12§6.3,15§6.3,16§6.3 | J_post−J_pre, dos análisis comparables | NO_IMPLEMENTADO | MAT/TAX, AU-17 |
| OP30 Equidad crédito, prioridad FTA / Calculo8§6.3,12§6.4 | riesgo/base, causalidad y factores explícitos | NO_IMPLEMENTADO | TAX/FUERA score sectorial, no R* nuevo |
| OP31 Valor agregado docente / Calculo15§6.1 | contribución/contexto y base de rendimiento | NO_IMPLEMENTADO | TAX/FUERA educación |
| OP32 Shapley deportivo, S_B / Calculo17§3.3/6.2 | coaliciones de beneficio y suplencia | NO_IMPLEMENTADO especialización | MAT/TAX; no confundir cuotaB directa con causalidadB |
| OP33 Resonancia narrativa / Calculo18§6.3 | Δ de personajes/peso narrativo | NO_IMPLEMENTADO | TAX/FUERA análisis narrativo |
| OP34 Contrafactual/ablación/bifurcación / AxiomApD §§D.3–D.5 | fila alternativa tipada, recálculo, nuevoresultado | NO_IMPLEMENTADO especializado; sensibilidad no sustituye nodo | MAT/TAX, AU-17 |
| OP35 S_prob/S_op/S_est / Axiom§3, AUD-S,2E-S | probabilidad contrafactual, normas o KL | NO_IMPLEMENTADO | CON/TAX/HIST; KL no acotado, no prueba equivalencia |
| OP36 α_H/α_T/Δ_H, R*α / HISTOS/SDO resoluciones | observación longitudinal/proxy y respuesta | NO_APLICABLE al contrato aplicado | CON/FUERA; no transferir numéricamente |
| OP37 φ1/φ2/I(t), φ_col, Hijos, Aego / Transformación, Axiom, MC I/II | aparato ontológico/dinámico y experiencia interna | NO_APLICABLE como inferencia del calculador | FUERA/CON; modo observable no operación interior certificada |
| OP38 Conjetura O(G) PF/Shapley unificador / VolII Conjetura I | selector que coincide en límites, caso mixto | NO_IMPLEMENTADO | CON: conjetura no algoritmo autoritativo; no decisión para auditar |
| OP39 Δ_neto=R_D−R_B, Δ_idiosincrático, rangos derivados / MC I II·6, TransformaciónIV | dos grafos o intervalos S/α tipados | NO_IMPLEMENTADO separado | MAT/TAX, P2 AU-17 |
| OP40 β/reconocimiento y tributo T=f(R*φproductiva) / TransformaciónII–III | retorno/reconocimiento o función aún no fijada | NO_APLICABLE/NO_IMPLEMENTADO según objeto | CON/TAX/FUERA; distinto de Δ_B patrimonial |

## Límite metrológico

No se marca una fórmula como verdad empírica por estar escrita o en código Python. El corpus contiene relaciones de predicción y heurísticas de prioridad con coeficientes ilustrativos; no son funciones autorizadas para inferir valores desde perfiles. La conjetura unificadora y la reconstrucción de S siguen abiertas en segunda edición. La auditoría puede documentar esa deuda sin elegir una solución ni bloquear los doce bloques.

Todos los faltantes relevantes al repertorio ampliado se agrupan en AU-17 P2; no representan defectos de fórmula activa por sí solos. La implementación anterior cerrada no equivale a «todos los operadores de las obras implementados».

## Ampliación tras las resoluciones y apéndices

| ID / operador / fuente | Contrato o inputs mínimos | REGISTRY / estado | Clase / severidad / decisión |
|---|---|---|---|
| OP41 Índice de inversión I_inv / Axiom Def8.6, Teo8.3 | |Δ_diseñador|/|Δ_ejecutor|, denominador no cero, clasificación de roles | NO_IMPLEMENTADO; DECISION_REQUERIDA para interpretar monotonicidad | MAT/CON; contradicción D/E pendiente; sin defecto runtime activo |
| OP42 V(G,G′) / Axiom ApD6 | distancia L1 entre vectores comparables después de cambio, IDs alineados | NO_IMPLEMENTADO | MAT, AU-17 P2; distinto de visibilidad V del TIC |
| OP43 REC / Axiom VII, RES-REC-001 | estimación Bernoulli/Fisher/CRLB, n, τ; ΔIΔh≥τ/n bajo hipótesis | NO_APLICABLE al núcleo aplicado | FUERA; REC no significa recurrencia; constante publicada 4τ₀² corregida a τ₀; no modelo general validado |
| OP44 RSC / RES-RSC-IT-001, Axiom II | registro histórico de eventos marcados; I(t) es otra magnitud | NO_APLICABLE al núcleo aplicado | FUERA/CON; secuencia o multiconjunto no adjudicados para implementación futura |
| OP45 Contribución contrafactual R−R_ablación / Axiom ApD | dos análisis comparables, regla de ablación explicitada | NO_IMPLEMENTADO | MAT/TAX; estimando distinto de R*(1−S), AU-17 P2 |

REC y RSC se clasifican fuera del calculador aplicado, sin elegir representación futura. La resolución específica de IIC fija [0,1]; mantiene incertidumbre de operacionalización por dominio. Se rectifica cualquier lectura del inventario inicial que equiparase REC a recurrencia.
