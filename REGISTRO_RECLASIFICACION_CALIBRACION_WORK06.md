# Registro de reclasificación de calibración — Work06

## Regla aplicada

`NO_CALIBRADO ≠ NO_OPERACIONALIZADO`. Una regla con relación formal y parámetros explícitos puede producir una medición condicional; una regla sin objeto o fórmula no puede recibir un número por el solo hecho de tener un nombre.

## Cobertura

El catálogo ejecutable recorre los 203 registros fuente y conserva cada ID, texto, tipo, valor, efecto y `sourceRef`. La clasificación es determinista:

- `rango` con intervalo finito → `RANGO_PROVISIONAL_UTILIZABLE`;
- `tabla` con valores → `COEFICIENTE_PROVISIONAL_UTILIZABLE`;
- `S`, `alpha` u `orientacion` → `ORIENTACION_NO_NUMERICA`;
- `calibracion` → `NO_OPERACIONALIZADO`;
- cualquier forma no reconocida → `REQUIERE_DECISION`.

No se convierten automáticamente las 203 reglas en inputs. La UI sólo informa el catálogo y el circuito de confirmación; el endpoint de cálculo exige valor/rango, fuente y `confirmado:true`.

## Reservas doctrinales

OP13, OP14 y OP32 siguen `NO_OPERACIONALIZADO`; OP24 y OP25 son `PARAMETRIZABLE`. No se reabre `cap02.alpha.1`.
