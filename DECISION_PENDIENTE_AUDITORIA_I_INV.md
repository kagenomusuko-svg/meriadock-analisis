> **RESUELTA.** Véase `RESOLUCION_AUDITORIA_I_INV.md`. Se conserva la fórmula \(I_{inv}=|\Delta(D)|/|\Delta(E)|\): brecha del diseñador por unidad de exceso del ejecutor. La interpretación y la monotonicidad históricas incompatibles deben corregirse.

# Decisión doctrinal resuelta — Índice de inversión

Fuente exacta: Paradigma/corpus/fuentes/Axiomatización del sistema de la doble mediación.md, Definición 8.6 y Teorema 8.3, líneas 1631–1647; ejemplo bancario línea 1713; SHA de fuente en fuentes.json. No existe I_inv en REGISTRY y la decisión no bloquea los doce bloques de auditoría.

La definición es I_inv=|Δ(D)|/|Δ(E)|. El texto afirma que >1 significa que el ejecutor absorbe más que la brecha del diseñador y que crece cuando aumenta S_est(E). La prueba supone numerador independiente y denominador creciente, pero concluye derivada positiva. Esas tres afirmaciones no pueden sostenerse juntas. El ejemplo bancario I_inv≈.18=.10/.56 sí respalda el cociente definido, y explica que el ejecutor absorbe 5.6 por unidad de brecha del banco: la interpretación del umbral escrita en la definición tiene el sentido inverso.

Reproducción algebraica independiente: brecha del diseñador .6, exceso del ejecutor .3 ⇒ cociente 2. Si el exceso pasa a .4 y numerador se conserva, el cociente baja a 1.5. Su inverso sube de .5 a 2/3. No se infiere una relación causal universal S→R por este cálculo; se verifica la propia hipótesis de la prueba.

Alternativas consideradas durante la auditoría:

1. Conservar el cociente de Def8.6 y el ejemplo bancario; corregir la interpretación de >1 y la monotonicidad bajo esas hipótesis (derivada negativa).
2. Definir el índice como exceso del ejecutor/brecha del diseñador; conservar la interpretación de aumento de absorción, pero corregir fórmula, ejemplo bancario y condiciones de denominador. La monotonicidad con visibilidad también debe volverse a demostrar.

Resolución posterior a la auditoría: se adopta la alternativa 1. La fórmula y el ejemplo bancario permanecen; la interpretación de >1 y la monotonicidad respecto del exceso del ejecutor se corrigen. No se modifica runtime en este acto.
