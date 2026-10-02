# Auditoría 5 — Robustez y sensibilidad

Ficha: robustez de tres escenarios y sensibilidad extendida, instrucciones §11, reserva de empates, orden02 §10; comparación Prometeo §2.3.3/3.6, Metrología I II·18/C·8, VolII protocolo Paso5 y Transformación formal ParteIV.

Inputs: intervalos empíricos por relación y opciones PF, no distribución aleatoria. Central=(min+max)/2; min/max usan simultáneamente extremos de todas las aristas internas. Output: tres vectores, rankings, líder, brecha, letra/motivo. Ausencia o no convergencia de un escenario→indeterminado. Es robustez a estos tres escenarios, no certeza estadística, ni mínimo/máximo global de cada coordenada del hipercubo.

| Regla | Código y prueba | Resultado y estado |
|---|---|---|
| A: mismo líder y orden | hipercubo.determinarDeclaracion; operadores.test | Conforme sin empates |
| B: mismo líder, orden secundario cambia | misma función | Conforme para órdenes estrictos |
| C: líder cambia, brecha central >.10 | usa top>segundo+.10 | Conforme; caso central .7/.3 C |
| D: líder cambia, brecha no mayor de .10 | .55/.45 exactamente frontera→D | Conforme; no >=.10 |
| Empate líder | lideres devuelve todas coordenadas máximas | Indeterminado explícito, CONFORME |
| Empate secundario | ranking desempata por índice `a.i−b.i` | A/B puede depender del orden de los nodos; P1 AU-14, CONTRADICE_FUENTE |
| No convergencia | vector null→no letra | Conforme; sin rescate uniforme |
| Una arista a la vez | 2E muestras, resto central, diferencia L1 | Conforme, determinista, marginal no global |
| Hipercubo exhaustivo | 2^E, presupuesto entero explícito maxVertices | Conforme; fuera de presupuesto indeterminado; E0 produce vértices duplicados pero no cambia peso |
| Muestra extendida no convergente | valor contiene estados individuales, exterior «calculado» | Reserva de lectura AU-15 P2: no garantiza colección completa calculable |

Contraejemplo empate secundario: extremos [.6,.2,.2], central [.6,.21,.19]. En orden original genera A; permutando los dos nodos secundarios en las tres matrices, mismos valores por nodo y mismo líder, genera B porque extremos se ordenan por posición. No es ruido ni desempate autorizado. Se añade caracterización permutacional.

Versiones: corpus llama las letras robustez de atribución e incluye escenarios favorables a un actor que no equivalen automáticamente a «todas aristas min». Código implementa exactamente la comparación vigente y etiqueta tres escenarios. Transformación formal añade incertidumbre ontológica de S/α y rangos Δ_min/max; no están propagados aquí: cobertura PARCIAL, no interpretar letras como robustez de todos los derivados.

La sensibilidad extendida no sustituye automáticamente las letras ni decide método desde finalidad. No existe Monte Carlo activo; semilla null porque no hay muestreo aleatorio. Singularidades, cambios de presupuesto y elección de ε/K requieren registro de input para reproducción, problema transversal AU-06.
