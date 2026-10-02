# Auditoría 2 — R* y Perron–Frobenius

## Ficha canónica

Nombre: índice de convergencia de eventos, R*. Autoridad inmediata: orden 02 §4.8–15 e instrucciones §§13–15; postulados de clausura y cero epistémico (ideas). Dominio: nodos activos de la pregunta cerrada por D. Inputs: nodos, relaciones internas, rangos discriminados, E0, cierre, opciones numéricas explícitas. Output: vector L1, estado, rondas, W_E/W_ε, diagnósticos y residuo. Archivo: modelo.js, grafo.js, r_estrella.js, series.js. Tests: pf.test.cjs, auditoria-canonicos y caracterizacion.

`W_ij=w(i→j)`, `Wr=ρr`, vector derecho. `multiplicar` acumula `salida[fila]+=peso*r[columna]`, sin transposición ni normalización por columnas. Arranque positivo uniforme es una condición numérica declarada, nunca fallback después del fallo. En cada ronda `r'=Wr/ΣWr`; error L1 entre rondas; convergencia exige error <1e−10 y residuo `||Wr−ρr||_1 < tol·max(1,ρ)`. `ρ=ΣWr` es estimación apropiada al converger; en fallo no es un eigenvalor demostrado (AU-12).

El fixture [[.9,.4],[.1,.6]] tiene r=(.8,.2), ρ=1, distinto del izquierdo (.5,.5). Resultado observado coincide dentro de 1e−9; residuo <1e−9. No se redondea antes de finalizar cálculo.

## Clausura y evidencia

D queda excluido del array de IDs, filas, columnas y vector. Se prueban siete grafos de fuente y el fixture formal; no aparece D en resultados. Las conexiones de cierre quedan descriptivas: su presencia habilita PF, su peso no cambia W. La orden actual exige W_D sin D y no dispone multiplicar por b_D; esa separación es conforme. No obstante el motor sólo cuenta conexiones, admite cierre E0/no acreditado o rango inválido, sin distinguir un cierre respaldado: AU-01, P1.

E0 conserva una entrada cero y soportes; no declara inexistencia ontológica. Ausencia de rango acreditado provoca error localizado. `crearAnalisis` no comprueba unicidad de IDs de relación y permite niveles desconocidos: AU-02, P1/P2 según efecto. No se impone silenciosamente la tabla de evidencia de Prometeo como universal.

## Condiciones, casos límite y sentido del estado

| Matriz | Observado | Interpretación / conformidad |
|---|---|---|
| [.4] | [1], ρ=.4 | CONFORME; un nodo no está prohibido |
| [0] o nula | indeterminado, vector null | CONFORME; no distribución uniforme de rescate |
| [[0,.5],[0,0]] | indeterminado por producto nulo | CONFORME bajo orden actual; no reemplazar por sumas de rutas |
| diag(1,.5) | converge cerca de [1,0], irreducible=false | CONFORME_CON_RESERVA; no afirmar positividad/irreducibilidad |
| identidad | [.5,.5], primitiva=false | CONFORME_CON_RESERVA; solución dependiente del arranque y no única |
| ciclo equilibrado | [.5,.5], período 2 | CONFORME_CON_RESERVA; convergencia especial no garantía general |
| ciclo desequilibrado [[0,2],[1,0]] | no converge a presupuesto 100, residuo .5 | CONFORME; ρ mostrado 1.5 no es √2, AU-12 |

Irreducibilidad se comprueba por alcance mutuo interno y periodicidad por gcd de diferencias de profundidad de aristas; no por llegada a D. Diagnóstico empírico y regularizado distintos. El estado calculado no acredita por sí solo unicidad ni condiciones suficientes, que se exportan como false en algunos casos; UI debe explicitar la reserva (AU-09).

## Regularización

`W_ε=W_E+εK`, ε>0 y K obligatorio. K constante se aplica por `εkΣr` a cada coordenada, sin construir N² entradas; K sparse explícito se acumula por sus entradas. W_E no se sobrescribe ni ε se anota como evidencia. La intervención no es automáticamente un protocolo ontológico.

Escalera ε=.1,.01,.001,.0001,.00001 sobre diag(1,0), K constante 1: segunda coordenada ~.0901,.00990,.000999,.00009999,.000010. Cambio reproducible; no prueba límite universal ni independencia de K. Valores extremos positivos con subdesbordamiento de εk pueden invalidar la primitividad que el helper presume; deuda numérica AU-04. Sensibilidad puede explorar cada ε explícitamente, no existe estudio automático universal.

## Escala observada

Resultados íntegros, memoria/tiempo/iteraciones/residuo/estado y E: `auditoria/evidencia/diagnostico.json`. Script `node --expose-gc auditoria/diagnostico.cjs`. Redes n=1,2,10,100,1000,10000; E=1,4,20,200,2000,20000. Presupuesto explícito 1000, ε=1e−4, K=1/n. Redes de 100 o más pueden agotar presupuesto: esto se registra como indeterminado, no se exige afirmar convergencia arbitraria. Una ejecución de 10000 nodos tarda aproximadamente medio segundo; memoria RSS del proceso aproximadamente 126 MB. Medición aislada con GC/JIT, no garantía de latencia.

Representación/recorridos O(N+E) por ronda, resumen grande sin rondas por defecto. JSON de W crece aproximadamente de 380 B (2) a 1.44 MB (10000), sin matriz densa. Diagnóstico incluye listas de adyacencia y stacks, no N². `matrizDensa` existe como helper histórico no invocado; habilitar todas las rondas añade O(iteraciones·(N+E)) y puede ser caro. El test original 1000 uniforme converge de inmediato: no sustituye esta prueba variable.

## Fuente y contradicción matemática

RES-RSTAR-001/2E-RSTAR-001 adjudican para el corpus un operador diferente: `r=(I−Q_D)^−1 b_D`, normalización única; PF sobre `M_R=Q+ηb1ᵀ`. RECALCULO-001 difiere recálculos, no revoca esa resolución. Sobre DAG este operador entrega positivos y el PF raw W actual es nilpotente/indeterminado. Conflicto D/E real, **resuelto para esta implementación por mandato explícito de orden 02 §4.12–15**. No se oculta como mero cambio de notación ni se instala la segunda edición durante auditoría. Ver CONTRADICCIONES_ENTRE_FUENTES y MATRIZ_CASOS_CANONICOS.

Siete casos transcritos de Prometeo/Vol II reproducen precisamente esa diferencia. Cifras pedagógicas impresas no son oracle numérico del PF actual. Los casos con instrumentalidad no definen una reasignación universal al diseñador; no se infiere una en el motor.

Conclusión: CONFORME_CON_RESERVA para algoritmo formal actual; PARCIAL en validación de cierre y comunicación de garantías. Sin decisión obligatoria adicional para seguir la auditoría.

## Ampliación de casos y conflicto E0

comparacion-corpus.json añade Altamirano (Metrología I), además de seis matrices numéricas literales de El cálculo: PLD, Congo, caso clínico, Snow, Lincoln y empresa. Se extraen sin ejecutar Python de las fuentes. La última fila/columna D se excluye conforme a su construcción histórica y la orden actual; el contrato actual devuelve indeterminado en los catorce casos (ocho transcripciones y seis matrices), sin sustituirlo por porcentajes de libro. Altamirano contiene un ciclo dentro de un grafo reducible; el diagnóstico global de período es null, no 2. El vector histórico no es un oracle del eigenvector derecho actual.

RES-EVID-001 (documentacion/resolucion-e0-e8.md) reserva E0 a evidencia positiva de ausencia y rechaza equiparar hipótesis no acreditada con w=0. Ello contradice explícitamente el postulado de cero epistémico y la invariante 11 de la orden actual. Clasificación D/E, resuelta para esta auditoría por autoridad inmediata explícita: se conserva E0 epistémico del mandato. No se adjudica que ambas definiciones sean equivalentes; ninguna tabla histórica E1–E8 autoriza convertir nivel en magnitud. Véase CONTRADICCIONES_ENTRE_FUENTES.md.
