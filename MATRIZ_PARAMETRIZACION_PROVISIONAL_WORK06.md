# Matriz de parametrización provisional — Work06

La matriz se deriva directamente de las reglas `PROPUESTA_PENDIENTE_CALIBRACION` de los seis archivos JSON fuente de Work04. No se inventan defaults.

| Clasificación | Total | Tratamiento |
|---|---:|---|
| RANGO_PROVISIONAL_UTILIZABLE | 119 | Se puede confirmar un valor/rango con `sourceRef`; nunca se aplica automáticamente. |
| COEFICIENTE_PROVISIONAL_UTILIZABLE | 1 | Tabla U·3 identificada; sólo entra con selección y confirmación. |
| ORIENTACION_NO_NUMERICA | 56 | Se muestra como orientación; no genera número. |
| NO_OPERACIONALIZADO | 27 | Registro de reserva; no se presenta como medición. |

Total clasificado: **203/203**.

Cada parámetro efectivo conserva `reglaId`, valor o rango, `sourceRef`, versión de protocolo, confirmación humana, fecha opcional y estado `PARAMETRIZADO_PROVISIONALMENTE`. Para rangos se conserva sensibilidad mínima/máxima/centro exploratorio; el centro no reemplaza el rango.
