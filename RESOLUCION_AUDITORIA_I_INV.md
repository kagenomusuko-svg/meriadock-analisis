# Resolución doctrinal — Índice de inversión I_inv

## Estado

RESUELTO por decisión expresa del autor.

## Objeto medido

I_inv mide la **brecha del diseñador por unidad de exceso del ejecutor**.

Semánticamente:

> cuantifica cuánto le falta al diseñador asumir como propio, por cada unidad de exceso que aparece asumida por el ejecutor; esto es, la porción que el diseñador deslindó hacia el ejecutor.

## Fórmula canónica

Se conserva la fórmula de la Definición 8.6:

[
I_{inv}
=
rac{|Delta_{mathrm{diseñador}}|}
     {|Delta_{mathrm{ejecutor}}|}
]

En la notación histórica de la fuente:

[
I_{inv}
=
rac{|Delta(D)|}{|Delta(E)|}.
]

La fórmula NO se invierte.

## Interpretación

Si:

[
I_{inv}=q,
]

entonces existen (q) unidades de brecha del diseñador por cada unidad de exceso del ejecutor.

Por tanto:

- (I_{inv}>1): la brecha del diseñador es mayor que el exceso del ejecutor;
- (I_{inv}=1): ambas magnitudes son iguales;
- (0<I_{inv}<1): el exceso del ejecutor es mayor que la brecha del diseñador.

La frase histórica según la cual (I_{inv}>1) significaba que “el ejecutor absorbe más que la brecha del diseñador” queda descartada porque corresponde al cociente inverso.

## Monotonicidad

Manteniendo fija la otra magnitud:

[
rac{partial I_{inv}}
{partial |Delta_{mathrm{diseñador}}|}
=
rac{1}{|Delta_{mathrm{ejecutor}}|}
>0
]

cuando (|Delta_{mathrm{ejecutor}}|>0).

Y:

[
rac{partial I_{inv}}
{partial |Delta_{mathrm{ejecutor}}|}
=
-
rac{|Delta_{mathrm{diseñador}}|}
{|Delta_{mathrm{ejecutor}}|^2}
<0
]

cuando ambas magnitudes son positivas.

Por ello, la afirmación histórica de monotonicidad positiva respecto del exceso del ejecutor no pertenece al índice definido por este cociente y debe corregirse en la fuente si se revisa editorialmente.

## Ejemplo bancario

El ejemplo:

[
I_{inv}
=
rac{0.10}{0.56}
approx 0.18
]

es compatible con la definición conservada.

Se interpreta:

- aproximadamente (0.18) unidades de brecha del diseñador por cada unidad de exceso del ejecutor;
- equivalentemente, el exceso del ejecutor es (5.6) veces la brecha del diseñador.

La segunda formulación es el recíproco descriptivo, no una redefinición de (I_{inv}).

## Casos límite

- Si (|Delta_{mathrm{ejecutor}}|=0) y (|Delta_{mathrm{diseñador}}|>0), el cociente no es finito y el operador debe devolver estado no calculable/indeterminado con motivo explícito; no debe inventarse un valor.
- Si ambas magnitudes son 0, el cociente (0/0) es indeterminado.
- No debe usarse un epsilon oculto para evitar división por cero. Cualquier regularización futura tendría que ser explícita y no cambiar el significado del índice.
- Los valores absolutos pertenecen a la definición del índice; el signo de cada (Delta) debe conservarse por separado en la auditoría para no perder la distinción entre brecha y exceso.

## Consecuencia para la auditoría

La contradicción doctrinal queda resuelta a favor de la alternativa 1 documentada en DECISION_PENDIENTE_AUDITORIA_I_INV.md:

- se conserva el cociente;
- se conserva el ejemplo bancario;
- se corrige la interpretación del umbral;
- se corrige la monotonicidad.

La resolución no modifica el runtime por sí misma. La implementación futura de I_inv debe ejecutarse sólo bajo una orden posterior de corrección/expansión.
