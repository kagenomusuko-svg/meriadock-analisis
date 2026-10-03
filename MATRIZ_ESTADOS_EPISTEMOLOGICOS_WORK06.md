# Matriz de estados epistemológicos — Work06

Work06 sustituye el binario «calibrado/no calibrado» por estados predicativos separados.

| Estado | Significado operativo |
|---|---|
| FORMALMENTE_DEFINIDO | Objeto, inputs y relación computable suficientes. |
| PARAMETRIZABLE | Relación computable definida; los parámetros deben declararse. |
| PARAMETRIZADO_PROVISIONALMENTE | Parámetros explícitos, fuente y confirmación humana conservados. |
| CALIBRADO | Parámetros ajustados mediante procedimiento empírico documentado. |
| VALIDADO_EXTERNAMENTE | Contraste fuera del conjunto/procedimiento de ajuste. |
| NO_OPERACIONALIZADO | El concepto no tiene todavía objeto/fórmula suficiente. |

La implementación Work06 no asigna silenciosamente CALIBRADO ni VALIDADO_EXTERNAMENTE. `cap02.alpha.1` permanece reservado por doctrina y no se mezcla con calibración.

Reclasificación de las cinco reservas Work05:

| Operador | Estado Work06 | Razón |
|---|---|---|
| OP13 Recurrencia | NO_OPERACIONALIZADO | Falta función temporal, horizonte y estimando. |
| OP14 Exposición | NO_OPERACIONALIZADO | Falta función de exposición, oportunidades y ventana comparable. |
| OP24 Opacidad | PARAMETRIZABLE | Puede recibir escala explícita; no hay escala universal automática. |
| OP25 Probabilidad sectorial | PARAMETRIZABLE | Coeficientes declarables con fuente; no calibración automática. |
| OP32 Shapley deportivo / S_B | NO_OPERACIONALIZADO | Falta protocolo de ausencia/suplencia y contrafactual. |

Fuente ejecutable: `dist-motor/calibracion.js` (`PARAMETROS.operadores`).
