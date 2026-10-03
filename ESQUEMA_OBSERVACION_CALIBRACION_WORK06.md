# Esquema de observación de calibración — Work06

Versión: `observacion-calibracion@1`.

```json
{
  "schema": "observacion-calibracion@1",
  "operador": "OP25",
  "dominio": "dominio declarado",
  "protocolo": "tax-capXX@1",
  "parametros": [{"reglaId":"...","valor":0.35,"sourceRef":{},"confirmado":true}],
  "inputs": {},
  "resultado": 0.42,
  "observadoPosterior": 0.40,
  "diferencia": -0.02,
  "referencia": "opcional"
}
```

`POST /api/calibracion` con `tipo:"observacion"` genera este registro sin persistencia ni sobrescritura histórica. `dist-motor/calibracion.js` valida fuente, confirmación, finitud y rango; permite que una futura calibración produzca una nueva versión de protocolo.
