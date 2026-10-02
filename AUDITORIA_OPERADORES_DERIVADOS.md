# Auditoría 3 — S, contribución atribuible, α y Δ

Autoridad inmediata: instrucciones §§12–15, órdenes 01/02. Fuentes comparadas: Prometeo §§2.3–2.4 y casos; El cálculo capítulos 1–18; Axiomatización §§3–4; Metrología I Parte II; Vol II protocolo/Corolarios; resolucion-alpha, resolucion-delta, auditoria-s-sustituibilidad, 2E-S-001 y resoluciones HISTOS/SDO. Ver contradicciones para las versiones.

| Ficha | Fórmula, alcance, precondiciones e inputs | Ausencia / incertidumbre / interpretación | Implementación, pruebas y resultados | Estado / severidad / decisión |
|---|---|---|---|---|
| Índice de sustituibilidad, S | Media de componentes explícitos, o Σp_i c_i/Σp_i; c∈[0,1], pesos no negativos con suma positiva. Piloto generico@1 tiene formalización, sustituibilidad del actor y sistema/incentivos | Sin componentes o alguno null→null. No deducir S de tipo, topología, Hijos ni documentos contados. Valores discriminados puntuales, sin intervalo S propagado | sustituibilidad.js; series; derivados.test; AUD-06: S=0→neta=R*, S=1→neta=0. Componente [0,.4,.1] da 1/6, no .17 redondeado antes | CONFORME_CON_RESERVA: piloto autorizado, no estimador universal calibrado; P2 AU-08 / no |
| Contribución atribuible, R*_neta | R*(1−S), sin renormalizar ni sumar automáticamente a 1 | R* o S ausente→null. No igual a culpa ni R* bruto. Instrumental S no aplicable en piloto, motor presenta null como indeterminado | derivados.js; series; derivados.test/operadores.test. R*=.8,S=1/6→.666666… | CONFORME_CON_RESERVA / P2 AU-09 / no |
| Condiciones adversas atribuibles / asunción efectiva, α | Valor discriminado [0,1]; ruta monetaria min(1,monto/base), base positiva unidad declarada; ruta taxonómica necesita estrategia externa | Ausencia→null, no conteo de soportes. Acciones, reparaciones, sanciones, despido o pérdida pueden ser voluntarios o impuestos; no infiere intención ni integración clínica. No agrega cargas heterogéneas automáticamente | alpha.js; series; UI. Tests soportes/discriminado/proporción. Función taxonómica no se pasa en orquestador y no se resuelve por JSON→indeterminado | PARCIAL en ruta taxonómica P1 AU-07; rutas explícitas CONFORME / no |
| Asimetría repercusiva, Δ | R*−α, signo exacto, sin clamp ni banda universal de gravedad; rango derivado [-1,1] cuando inputs válidos | Ausencia→null. Sobrecarga negativa permitida. No traducir automáticamente a sentencia justa ni juicio moral | delta.js/series; derivados.test; valores .08−.10=−.02, .1−.1=0. En producción .8−.08=.72 y .2−.03=.17 | CONFORME; linter externo incoherente P2 AU-11 / no |

## Variantes de S y sus límites

Prometeo usa formalización, reemplazo y sistema; El cálculo usa instrumentos documentales (formalización/costo de desobedecer/conducta de pares, según dominio). Axiomatización añade S_prob contrafactual, S_op=||c||/(||c||+||a||), y S_est=1−KL/log(m). No se demuestra su equivalencia. 2E-S-001 mantiene constructo pero declara defectuosa la normalización KL y difiere reconstrucción del estimador. Intervalos por Hijos son hipótesis/rangos históricos, no derivación numérica automática autorizada. El programa evita esos atajos, pero la UI no dice claramente «estimador piloto»: AU-08.

## α aplicado y α interno

RES-ALPHA-001 tipa integración interna frente a cargas externas. RES-HISTOS-PROM-001 prohíbe transferencia directa α_H→α_P; RES-SDO-PROM-001 separa α_T local y potencial R*×α de asunción aplicada. UI conserva observaciones modales sin convertirlas en valores. No existe función para traducir todas las escalas de Taxonomía; esto es deuda, no autorización a psicologizar.

El clamp monetario a 1 es la regla expresamente autorizada, no clamp Δ. La comparación monetaria requiere juicio de comparabilidad humano; una sola etiqueta de unidad no demuestra equivalencia de todas las consecuencias.

## Conflictos entre fórmulas

Vol II usa también R*(1−α), siempre no negativa, como déficit; no es equivalente a Δ=R*−α. RES-DELTA-001 adjudica la resta y registra la multiplicación como error formal, no cambio cronológico suficiente. Orden actual confirma resta. El recálculo editorial diferido de S/neta no modifica la instrucción del proyecto. No hay decisión doctrinal obligatoria que impida esta auditoría.

Pruebas de límite y overflow ponderado deben ampliar validación (AU-04). No se repara runtime aquí.
