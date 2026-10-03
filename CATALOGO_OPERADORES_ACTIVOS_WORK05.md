# Catálogo de operadores activos — Work05

Work05 reevalúa **45/45** registros. Hay **20 activos**, 1 con suficiencia taxonómica de nomenclatura (`OP26`) y el resto conserva reserva concreta. Los activos siguen disponibles para las tres familias cuando se aportan sus insumos; la familia no mutila el repertorio.

| ID | Registro | Fórmula/regla | Insumos críticos | Estado |
|---|---|---|---|---|
| OP01 | rStar | W R*=ρR*, normalización L1 | W activo; cierre válido | ACTIVO |
| OP02 | s | Σ(p_k s_k)/Σp_k | componentes S; pesos opcionales; confirmación | ACTIVO |
| OP03 | rStarNeta | R*(1−S) | R*; S | ACTIVO |
| OP04 | alpha | estrategia α explícita | valor o proporción; estrategia | ACTIVO |
| OP05 | delta | R*−α | R*; α | ACTIVO |
| OP06 | iic | coincidencias/elementos declarados | declarado; observado; coincidencias | ACTIVO |
| OP07 | bStar | beneficio_i/beneficio_total | beneficios netos; unidad | ACTIVO |
| OP08 | dTotal | T_invertido+T_impedido+ΔT_trayectoria | tres montos; unidad | ACTIVO |
| OP09 | ajusteDebitor | R*_i×D_total | R*; D_total | ACTIVO |
| OP10 | robustez | ranking de PF mínimo/central/máximo | escenarios PF | ACTIVO |
| OP11 | sensibilidadExtendida | sensibilidad con método y presupuesto explícitos | método; presupuesto | ACTIVO |
| OP12 | fraudeAnnona | R*(1−α)*(1−IIC) | diseñador activo; α; IIC congruencia | ACTIVO |
| OP16 | shapley | marginal factorial exacto de v(S) | v(S) completo; unidad | ACTIVO |
| OP19 | brechaBeneficio | B_i−β_i | B_i; β_i; unidad | ACTIVO |
| OP20 | conversionVital | monto/salario de referencia | monto; salario/hora; moneda | ACTIVO |
| OP21 | justiciaEstructural | 1−Σ|R*−α| | Δ de universo | ACTIVO |
| OP27 | roiPrevencion | (D_total×ΔP−costo)/costo | D_total; ΔP externo; costo; unidad | ACTIVO |
| OP29 | aprendizajeSistemico | J_post−J_pre | R*/α antes y después; base comparativa | ACTIVO |
| OP41 | indiceInversion | |Δ_diseñador|/|Δ_ejecutor| | roles; Δ diseñador; Δ ejecutor | ACTIVO |
| OP42 | impactoCausal | ||R*(G′)−R*(G)||₁ | vectores R* comparables; referencias; IDs | ACTIVO |

## Disponibilidad no ejecutable

La UI/API también publican operadores pendientes de calibración, decisión, conceptuales y fuera del calculador. Aparecen con causa e inputs faltantes y no pueden seleccionarse como mediciones hasta que exista contrato suficiente. `OP26` sólo normaliza aliases taxonómicos; no introduce una fórmula nueva.

Fraude annona conserva `R*(1−α)*(1−IIC)` y `cap02.alpha.1` permanece reservado sin efecto computacional.
